import os
import re
from datetime import datetime, timedelta

# Pfad zum Content-Verzeichnis
CONTENT_DIR = 'src/pages/blog/content'

def get_blog_files():
    return [f for f in os.listdir(CONTENT_DIR) if f.endswith('.md')]

def parse_frontmatter(content):
    match = re.search(r'^---(.*?)---', content, re.DOTALL)
    if not match:
        return None, content
    
    frontmatter_raw = match.group(1)
    body = content[match.end():].strip()
    
    frontmatter = {}
    for line in frontmatter_raw.strip().split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip().strip('"').strip("'")
            
    return frontmatter, body

def is_empty(body):
    # Ein Beitrag gilt als leer, wenn er weniger als 200 Zeichen Text hat
    return len(body) < 200

def generate_image_prompt(title, description):
    # Generiert einen professionellen Prompt für DALL-E/Midjourney
    return f"Professional high-tech 3D render or minimalist illustration for a blog post titled '{title}'. Theme: {description}. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."

def fix_posts():
    files = get_blog_files()
    processed_posts = []
    
    # 1. Sammeln aller Posts
    all_data = []
    for filename in files:
        path = os.path.join(CONTENT_DIR, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter, body = parse_frontmatter(content)
        if not frontmatter:
            continue
            
        pub_date_str = frontmatter.get('pubDate', '2030-01-01')
        try:
            pub_date = datetime.strptime(pub_date_str, '%Y-%m-%d')
        except ValueError:
            pub_date = datetime(2030, 1, 1)
            
        all_data.append({
            'filename': filename,
            'path': path,
            'frontmatter': frontmatter,
            'body': body,
            'pub_date': pub_date,
            'is_empty': is_empty(body)
        })
    
    # 2. Sortieren nach ursprünglichem Datum
    all_data.sort(key=lambda x: x['pub_date'])
    
    # 3. Neu datieren ab 2025-10-05
    start_date = datetime(2025, 10, 5)
    current_date = start_date
    
    updated_count = 0
    empty_list = []
    
    for post in all_data:
        # Nur Posts anpassen, die am oder nach dem 05.10.2025 (oder weit in der Zukunft) liegen
        # Wir wollen die ganz alten Posts (2023, 2024) in Ruhe lassen
        if post['pub_date'] >= datetime(2025, 10, 1): # Puffer für die ersten Oktober-Posts
            new_date_str = current_date.strftime('%Y-%m-%d')
            post['frontmatter']['pubDate'] = new_date_str
            current_date += timedelta(days=1)
            updated_count += 1
            
            # 4. Image Prompt sicherstellen
            if 'imagePrompt' not in post['frontmatter'] or not post['frontmatter']['imagePrompt']:
                title = post['frontmatter'].get('title', '')
                desc = post['frontmatter'].get('description', '')
                post['frontmatter']['imagePrompt'] = generate_image_prompt(title, desc)
            
            # Hero Image Pfad vereinheitlichen falls nötig
            if post['frontmatter'].get('heroImage', '').startswith('Prompt:'):
                slug = post['filename'].replace('.md', '').lstrip('_')
                post['frontmatter']['heroImage'] = f"/images/blog/{slug}.webp"

            # Inhalts-Check
            if post['is_empty']:
                empty_list.append(post['filename'])

            # Zurückschreiben
            new_frontmatter_lines = ["---"]
            # Wir schreiben die Keys in einer festen Reihenfolge für Sauberkeit
            order = ['title', 'description', 'pubDate', 'heroImage', 'imagePrompt', 'author', 'keywords']
            written_keys = set()
            
            for k in order:
                if k in post['frontmatter']:
                    new_frontmatter_lines.append(f'{k}: "{post["frontmatter"][k]}"')
                    written_keys.add(k)
            
            # Restliche Keys falls vorhanden
            for k, v in post['frontmatter'].items():
                if k not in written_keys:
                    new_frontmatter_lines.append(f'{k}: "{v}"')
            
            new_frontmatter_lines.append("---")
            
            new_content = "\n".join(new_frontmatter_lines) + "\n\n" + post['body']
            
            with open(post['path'], 'w', encoding='utf-8') as f:
                f.write(new_content)

    print(f"✅ Erledigt! {updated_count} Posts wurden neu datiert (ab {start_date.strftime('%Y-%m-%d')}).")
    print(f"📊 {len(empty_list)} Posts haben noch keinen ausreichenden Inhalt (< 200 Zeichen).")
    
    if empty_list:
        print("\n⚠️ Die folgenden Dateien müssen inhaltlich noch ausformuliert werden:")
        for ep in sorted(empty_list):
            print(f"  - {ep}")

if __name__ == "__main__":
    fix_posts()
