import re
import glob
import os
import datetime

def get_slug(title):
    slug = re.sub(r'[^\w\s-]', '', title).strip().lower().replace(' ', '-')
    return re.sub(r'-+', '-', slug)

existing_files = glob.glob('src/pages/blog/content/*.md')
implemented_slugs = set()
for f in existing_files:
    filename = os.path.basename(f)
    if filename.startswith('_'):
        slug = filename[1:-3] 
    else:
        slug = filename[:-3]
    implemented_slugs.add(slug)

with open('docs/blog.md', 'r') as f:
    content = f.read()

# Capture all Titles from the text
titles = re.findall(r'\*\*Titel:\*\*\s*(.*?)\n', content)
descriptions = re.findall(r'\*Beschreibung:\*\s*(.*?)\n', content)

all_topics = []
seen_slugs = set()

for i in range(min(len(titles), len(descriptions))):
    title = titles[i].strip().replace('**', '').replace('.', '')
    desc = descriptions[i].strip().replace('**', '')
    slug = get_slug(title)
    if slug not in seen_slugs:
        seen_slugs.add(slug)
        all_topics.append({'title': title, 'desc': desc, 'slug': slug})

print(f"Total unique topics found: {len(all_topics)}")

missing = [t for t in all_topics if t['slug'] not in implemented_slugs]
print(f"Missing items: {len(missing)}")

total_implemented = len(implemented_slugs)
needed = 200 - total_implemented

if needed > 0:
    to_create = missing[:needed]
    print(f"Creating {len(to_create)} new posts to reach 200.")
    
    current_date = datetime.date(2026, 4, 6) 
    count = 0
    
    for item in to_create:
        title = item['title']
        desc = item['desc']
        slug = item['slug']
        
        weeks = count // 2
        is_thursday = count % 2 == 1
        publish_date = current_date + datetime.timedelta(weeks=weeks * 7 + (3 if is_thursday else 0))
        
        filename = f"src/pages/blog/content/_{slug}.md"
        image_prompt = f"A modern, abstract digital art piece visualizing {title} in a dark, tech-oriented style. --ar 16:9 --style raw --quality high --stylize 750"
        linkedin = f"🚀 Neuer Blogbeitrag online: {title}\n\n{desc}\n\n#Softwareentwicklung #DevSecOps #WaldheimDev"
        
        with open(filename, 'w') as out:
            out.write(f'''---
title: "{title}"
description: "{desc}"
pubDate: "{publish_date}"
heroImage: "Prompt: {image_prompt}"
author: 'markus-waldheim'
keywords: {title.replace(' ', ', ')}
linkedinPost: |
  {linkedin}
---

## {title}

Der vollständige Inhalt für diesen Beitrag wird in Kürze ergänzt.

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
''')
        count += 1
    print(f"Successfully created {count} posts.")
else:
    print("Goal of 200 reached.")


# If we still haven't reached 200, add the remaining ones from the predefined list
predefined_extra = [
    ("Angular-Migration: Mein schrittweiser Plan für ein Upgrade ohne Kopfschmerzen", "Ein Leitfaden für den sicheren Umstieg auf die neueste Angular-Version."),
    ("Code-Qualität in Go-Projekten sicherstellen: Mein Mix aus Linting, Formatting und Git-Hooks", "Wie ich automatisierte Checks nutze, um hohe Code-Qualität in Go-Backends zu gewährleisten."),
    ("Von Windows zu Linux: Wie ich eine Go-Anwendung für den Produktiveinsatz portiere", "Praktische Tipps beim Wechsel von Windows zur Linux-Produktionsumgebung."),
    ("PostgreSQL und Go: Effizientes Daten-Handling ohne schweren ORM", "Warum ich in Go oft auf SQL-nahe Bibliotheken wie sqlx oder pgx setze."),
    ("Modulares Design in Angular: Meine Strategie für wiederverwendbare Komponenten-Bibliotheken", "Wie ich skalierbare Komponenten-Bibliotheken in Angular aufbaue."),
    ("Testgetriebene Entwicklung (TDD) mit Go: Eine pragmatische Einführung", "Warum TDD in Go Spaß macht und zu robusterem Code führt."),
    ("KI-gestützte Code-Vervollständigung jenseits von Copilot: Meine Alternativen in VS Code", "Vergleich von KI-Tools wie Supermaven, Codeium und Tabnine."),
    ("Die Kunst der Protokollierung: Mein Logging-Framework für Go-Microservices", "Warum strukturiertes Logging überlebenswichtig ist und wie ich es mit slog umsetze."),
    ("Performance-Optimierung in Angular: Change Detection und RxJS richtig einsetzen", "Wie Sie Ladezeiten Ihrer Angular-Anwendung drastisch verbessern."),
    ("Cross-Plattform-Entwicklung mit Go: Ein Build-System für Windows, macOS und Linux", "Wie ich Go's Cross-Compilation-Features nutze."),
    ("Refactoring eines Go-Monolithen: Meine Taktiken zur schrittweisen Modernisierung", "Wie man eine gewachsene Go-Codebasis schrittweise verbessert."),
    ("Sichere API-Gateways für Go-Microservices: Eine praktische Anleitung", "Wie ich den Zugriff auf Microservices zentral absichere."),
    ("CloudLand 2026: Ein Rückblick auf mein Chaos-Experiment", "Meine Erfahrungen und Erkenntnisse vom CloudLand-Vortrag."),
    ("GitOps für Datenbanken: Schema-Migrationen in der CI/CD-Pipeline", "Wie ich Datenbank-Änderungen automatisiert und sicher ausrolle."),
    ("Observability in Go: Tracing und Metriken mit OpenTelemetry", "Wie ich tiefe Einblicke in die Performance meiner Microservices gewinne."),
    ("Zero Trust im lokalen Netzwerk: Wie ich meine Home-Office-Infrastruktur absichere", "Ein Sicherheitskonzept für moderne Remote-Work."),
    ("Der Weg zum Scrum Master: Meine Reise und was ich daraus gelernt habe", "Persönliche Einblicke in agile Methoden und Team-Führung."),
    ("Angular und Web-Security: Die Top 5 Bedrohungen und wie man sie abwehrt", "Ein Leitfaden für sichere Frontend-Anwendungen."),
    ("PostgreSQL-Tuning für Fortgeschrittene: Wenn Indizes nicht mehr ausreichen", "Tiefergehende Optimierungstechniken für große Datenmengen."),
    ("Automatisierung mit Go: CLI-Tools für den täglichen Admin-Wahnsinn", "Wie ich Routineaufgaben mit kleinen Go-Programmen automatisiere."),
    ("Das Waldheim-Designsystem: Unsere Philosophie für UX und UI", "Ein Blick hinter die Kulissen unserer visuellen Identität."),
    ("Cyber-Resilienz für KMU: Warum Prävention nicht mehr ausreicht", "Wie Unternehmen sich auf den Ernstfall vorbereiten können."),
    ("Zukunft der Softwareentwicklung: Meine Trends für 2027", "Ein Ausblick auf die kommenden Jahre in Go, Angular und KI.")
]

current_files = glob.glob('src/pages/blog/content/*.md')
current_count = len(current_files)
needed_more = 200 - current_count

if needed_more > 0:
    print(f"Still need {needed_more} more. Creating from predefined list.")
    count = 0
    current_date = datetime.date(2026, 6, 25) # Continue from where we left off
    for title, desc in predefined_extra[:needed_more]:
        slug = get_slug(title)
        filename = f"src/pages/blog/content/_{slug}.md"
        if not os.path.exists(filename):
            weeks = count // 2
            is_thursday = count % 2 == 1
            publish_date = current_date + datetime.timedelta(weeks=weeks * 7 + (3 if is_thursday else 0))
            
            image_prompt = f"A modern, abstract digital art piece visualizing {title} in a dark, tech-oriented style. --ar 16:9 --style raw --quality high --stylize 750"
            linkedin = f"🚀 Neuer Blogbeitrag online: {title}\n\n{desc}\n\n#Softwareentwicklung #DevSecOps #WaldheimDev"
            
            with open(filename, 'w') as out:
                out.write(f'''---
title: "{title}"
description: "{desc}"
pubDate: "{publish_date}"
heroImage: "Prompt: {image_prompt}"
author: 'markus-waldheim'
keywords: {title.replace(' ', ', ')}
linkedinPost: |
  {linkedin}
---

## {title}

Der vollständige Inhalt für diesen Beitrag wird in Kürze ergänzt.

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
''')
            count += 1
    print(f"Created {count} extra posts.")

