import os
import re
import glob
import requests
import base64

# Settings
CONTENT_DIR = 'products/homepage/src/pages/blog/content'
IMAGE_DIR = 'products/homepage/public/images/blog'
API_KEY = os.getenv('IF_CLOUD_API_KEY', 'sk-uEhUDtT8zzzB5ueqlK_cWw') # Fallback for now, but should use env var
API_BASE = 'https://llm.if-cloud.de/v1'
MODEL = 'Google_Imagen_4_Ultra' # Using the available high-quality image model
# Note: Using 1792x1024 as it yields 1408x768 (16:9) on this API, whereas 1920x1080 falls back to 1:1
SIZE = '1792x1024' 

# Quality suffix to avoid "Zeichenfehler" (artifacts/text issues)
QUALITY_SUFFIX = ", high quality, detailed, 8k resolution, cinematic, professional photography, perfect composition, no text, no letters, no distorted characters, no artifacts, masterpiece"

def generate_image(slug, prompt):
    print(f"Generating image for {slug}...")
    
    # Pre-clean prompt and add quality suffix
    clean_prompt = prompt.strip()
    # Remove common midjourney-like suffixes if they exist
    clean_prompt = re.sub(r'--ar\s+\d+:\d+', '', clean_prompt)
    clean_prompt = re.sub(r'--style\s+\w+', '', clean_prompt)
    clean_prompt = re.sub(r'--quality\s+\w+', '', clean_prompt)
    clean_prompt = re.sub(r'--stylize\s+\d+', '', clean_prompt)
    
    final_prompt = f"{clean_prompt}{QUALITY_SUFFIX}"
    
    image_filename = f"{slug}.webp"
    image_path = os.path.join(IMAGE_DIR, image_filename)
    
    # If image exists, skip unless we want to overwrite (not doing that here)
    if os.path.exists(image_path):
        print(f"Image already exists: {image_path}")
        return image_filename

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": MODEL,
        "prompt": final_prompt,
        "n": 1,
        "size": SIZE
    }

    try:
        print(f"Requesting image from {API_BASE} using model {MODEL} and size {SIZE}...")
        response = requests.post(f"{API_BASE}/images/generations", headers=headers, json=data, timeout=120)
        response.raise_for_status()
        
        result = response.json()
        
        # Try different possible locations for the URL or base64 data
        image_url = None
        b64_data = None
        if 'data' in result and len(result['data']) > 0:
            image_url = result['data'][0].get('url')
            b64_data = result['data'][0].get('b64_json')
        elif 'url' in result:
            image_url = result['url']
        
        if b64_data:
            print(f"Saving image from base64 data...")
            img_data = base64.b64decode(b64_data)
            with open(image_path, 'wb') as handler:
                handler.write(img_data)
            print(f"Successfully saved image to {image_path}")
            return image_filename
        elif image_url:
            print(f"Downloading image from {image_url}...")
            img_response = requests.get(image_url, timeout=60)
            img_response.raise_for_status()
            with open(image_path, 'wb') as handler:
                handler.write(img_response.content)
            print(f"Successfully saved image to {image_path}")
            return image_filename
        else:
            print(f"Response Error: No image data found in result: {result}")
            return None
            
    except Exception as e:
        print(f"Error generating image for {slug}: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response Error Body: {e.response.text}")
        return None

def main():
    if not os.path.exists(IMAGE_DIR):
        os.makedirs(IMAGE_DIR)

    files = glob.glob(os.path.join(CONTENT_DIR, '*.md'))
    print(f"Found {len(files)} markdown files in {CONTENT_DIR}")
    
    # Sort files to have consistent processing order
    files.sort()
    
    for file_path in files:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Extract slug from filename
        filename = os.path.basename(file_path)
        slug = filename[1:-3] if filename.startswith('_') else filename[:-3]
        
        # Check if heroImage or imagePrompt triggers it
        prompt = None
        
        # 1. Search for imagePrompt
        prompt_match = re.search(r'imagePrompt: "(.*?)"', content)
        if prompt_match:
            prompt = prompt_match.group(1)
        else:
            # 2. Search for legacy heroImage: "Prompt: ..."
            hero_prompt_match = re.search(r'heroImage: "Prompt: (.*?)"', content)
            if hero_prompt_match:
                prompt = hero_prompt_match.group(1)
        
        if prompt:
            # Generate and get filename
            new_image_name = generate_image(slug, prompt)
            
            if new_image_name:
                # Update the file content if it still has the Prompt: format in heroImage
                if 'heroImage: "Prompt: ' in content:
                    new_content = content.replace(f'heroImage: "Prompt: {prompt}"', f'heroImage: "/images/blog/{new_image_name}"')
                    with open(file_path, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {file_path} with new image path.")

if __name__ == "__main__":
    main()
