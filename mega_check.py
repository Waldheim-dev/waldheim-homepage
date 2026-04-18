import os
import re
import glob

def check_missing_images():
    content_dirs = [
        'src/pages/blog/content',
        'src/pages/referenzen/projects',
        'src/pages/ueber-mich/skills',
        'src/pages/ueber-mich/karriere'
    ]
    public_dir = 'public'
    
    missing_images = []
    
    # Files to scan
    files = []
    for cdir in content_dirs:
        if os.path.exists(cdir):
            files.extend(glob.glob(f"{cdir}/**/*.md", recursive=True))
            files.extend(glob.glob(f"{cdir}/**/*.json", recursive=True))

    for filepath in files:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Regex to find anything that looks like an image path
        # 1. heroImage: "..."
        # 2. image: "..."
        # 3. assets: [ "...", ... ]
        # 4. ![...](...)
        
        paths = []
        # heroImage / image
        paths.extend(re.findall(r'(?:heroImage|image):\s*"([^"]+)"', content))
        # assets array
        assets_match = re.search(r'assets:\s*\[(.*?)\]', content, re.DOTALL)
        if assets_match:
            paths.extend(re.findall(r'"([^"]+)"', assets_match.group(1)))
        # markdown images
        paths.extend([m[1] for m in re.finditer(r'!\[([^\]]*)\]\(([^)]+)\)', content)])
        
        for p in paths:
            if p.startswith('http') or p.startswith('mailto:'): continue
            
            # Clean path
            clean_p = p.lstrip('/')
            full_path = os.path.join(public_dir, clean_p)
            
            if not os.path.exists(full_path):
                missing_images.append({'file': filepath, 'image': p})

    # Deduplicate
    unique_missing = {}
    for item in missing_images:
        if item['image'] not in unique_missing:
            unique_missing[item['image']] = item['file']
            
    print(f"TOTAL MISSING: {len(unique_missing)}")
    for img, f in unique_missing.items():
        print(f"MISSING: {img} in {f}")

if __name__ == "__main__":
    check_missing_images()
