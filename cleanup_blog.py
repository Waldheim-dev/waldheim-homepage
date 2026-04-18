import os
import re

# Paths
BLOG_DIR = "/home/markus/Dev/waldheim-suite/products/homepage/src/pages/blog/content/"
PUBLIC_IMAGES_DIR = "/socialverse/"

# Specific placeholders to fill
PLACEHOLDERS = {
    "_socialverse-leadmanagement-crm-update.md": [
        (r"\[Hier Screenshot des neuen Kanban-Boards einfügen\]", f"![Socialverse Kanban Board]({PUBLIC_IMAGES_DIR}socialverse_leadoverview.webp)"),
        (r"\[Hier Screenshot einer Lead-Detailansicht mit Kommentaren/Aufgaben einfügen\]", f"![Socialverse Lead Detail]({PUBLIC_IMAGES_DIR}socialverse_lead.webp)")
    ],
    "_socialverse-kommandozentrale-update.md": [
        (r"\[Hier Screenshot vom neuen Kanban-Board einfügen – zeig die Dynamik!\]", f"![Socialverse Kanban Board]({PUBLIC_IMAGES_DIR}socialverse_leadoverview.webp)"),
        (r"\[Hier Screenshot einer Lead-Ansicht – zeig die Interaktion!\]", f"![Socialverse Lead Detail]({PUBLIC_IMAGES_DIR}socialverse_lead.webp)")
    ]
}

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    filename = os.path.basename(file_path)
    if filename in PLACEHOLDERS:
        for pattern, replacement in PLACEHOLDERS[filename]:
            content = re.sub(pattern, replacement, content)

    parts = content.split("-----")
    
    main_content_parts = []
    footer_parts = []
    
    found_footer = False
    for i, part in enumerate(parts):
        trimmed_part = part.strip()
        if "**" in trimmed_part and "mailto:" in trimmed_part and len(trimmed_part) < 1000:
            footer_parts.append(trimmed_part)
            found_footer = True
        elif not found_footer:
            main_content_parts.append(part)
    
    if footer_parts:
        first_footer = footer_parts[0]
        new_main_content = "-----".join(main_content_parts).rstrip()
        final_content = new_main_content + "\n\n-----\n\n" + first_footer + "\n"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(final_content)
        return True
    else:
        match = re.search(r"(\*\*[^*]+\*\*.*mailto:.*)$", content, re.DOTALL)
        if match:
            footer = match.group(1).strip()
            main_content = content[:match.start()].rstrip()
            final_content = main_content + "\n\n-----\n\n" + footer + "\n"
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(final_content)
            return True
                
    return False

def main():
    files = [f for f in os.listdir(BLOG_DIR) if f.endswith(".md")]
    processed_count = 0
    missing_footer = []
    for filename in files:
        if process_file(os.path.join(BLOG_DIR, filename)):
            processed_count += 1
        else:
            missing_footer.append(filename)
    
    print(f"Processed {processed_count} files.")
    if missing_footer:
        print(f"Files missing footer ({len(missing_footer)}):")
        for f in missing_footer:
            print(f"  {f}")

if __name__ == "__main__":
    main()
