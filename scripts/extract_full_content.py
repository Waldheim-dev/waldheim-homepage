import re
import glob
import os

CONTENT_DIR = 'src/pages/blog/content'

def get_slug(title):
    slug = re.sub(r'[^\w\s-]', '', title).strip().lower().replace(' ', '-')
    return re.sub(r'-+', '-', slug)

def extract_from_blog_md():
    with open('docs/blog.md', 'r') as f:
        content = f.read()

    # Find blocks that look like markdown blog posts, potentially wrapped in asterisks or varying backticks
    # We'll look for frontmatter start '---' and end '---'
    # And we'll clean the asterisks if they wrap the entire block
    
    # Pattern to find the start of a markdown block and extract until the next one or end of file
    # We look for the 'title:' line inside the block
    raw_blocks = re.split(r'### // Beitrag \d+', content)
    
    updated_count = 0
    for rb in raw_blocks:
        # Look for the markdown block inside this section
        # It usually starts with --- and ends with ---
        # We also need to strip any leading/trailing triple asterisks from the whole block if present
        
        # Clean the block from the surrounding triple asterisks used for formatting in blog.md
        clean_rb = rb.replace('***', '')
        
        match = re.search(r'(---.*?---.*?(?=\n\n|\Z))', clean_rb, re.DOTALL)
        if match:
            block = match.group(1)
            
            # Extract title
            title_match = re.search(r'title: "(.*?)"', block)
            if not title_match:
                title_match = re.search(r"title: '(.*?)'", block)
            
            if title_match:
                title = title_match.group(1)
                slug = get_slug(title)
                
                target_file = os.path.join(CONTENT_DIR, f"_{slug}.md")
                if not os.path.exists(target_file):
                    target_file = os.path.join(CONTENT_DIR, f"{slug}.md")
                
                if os.path.exists(target_file):
                    with open(target_file, 'r') as tf:
                        existing_content = tf.read()
                    
                    pub_date_match = re.search(r'pubDate: "(.*?)"', existing_content)
                    if pub_date_match:
                        block = re.sub(r'pubDate: ".*?"', f'pubDate: "{pub_date_match.group(1)}"', block)
                    
                    block = block.replace('beispiel@email.com', 'kontakt@waldheim.dev')
                    
                    # Ensure linkedinPost is preserved
                    if 'linkedinPost:' in existing_content and 'linkedinPost:' not in block:
                        linkedin_match = re.search(r'linkedinPost: \|(.*?)\n---', existing_content, re.DOTALL)
                        if linkedin_match:
                            block = block.replace('\n---', f'\nlinkedinPost: |{linkedin_match.group(1)}\n---', 1)

                    with open(target_file, 'w') as tf:
                        tf.write(block)
                    print(f"Updated {target_file} with content for '{title}'")
                    updated_count += 1
    
    print(f"Total updated from blog.md: {updated_count}")

if __name__ == "__main__":
    extract_from_blog_md()
