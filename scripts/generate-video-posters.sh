#!/bin/bash

# 🎬 Video Poster Generator für Core Web Vitals Optimierung
# Erstellt Poster-Bilder aus Videos für schnelleres LCP

set -e

echo "🎬 Generiere Video-Poster für Core Web Vitals Optimierung..."
echo ""

# Prüfe ob ffmpeg installiert ist
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg ist nicht installiert!"
    echo "Installation: sudo apt install ffmpeg (Linux) oder brew install ffmpeg (macOS)"
    exit 1
fi

# Wechsle ins Projekt-Root
cd "$(dirname "$0")/.." || exit

# Videos Array
declare -a videos=(
    "public/videos/video_chip.mp4"
    "public/videos/video_devsecops.mp4"
    "public/videos/video_software.mp4"
    "public/videos/video_neuronen.mp4"
    "public/videos/video_assistentin.mp4"
    "public/videos/video_smarthome.mp4"
)

# Generiere Poster für jedes Video
for video in "${videos[@]}"; do
    if [ -f "$video" ]; then
        # Poster-Pfad generieren
        poster="${video%.mp4}-poster.jpg"
        
        echo "📸 Generiere Poster: $(basename "$poster")"
        
        # Screenshot bei 1 Sekunde, hohe Qualität
        ffmpeg -i "$video" \
            -ss 00:00:01 \
            -vframes 1 \
            -q:v 2 \
            -y \
            "$poster" 2>/dev/null
        
        # Dateigröße prüfen
        size=$(du -h "$poster" | cut -f1)
        echo "   ✅ Erstellt: $(basename "$poster") ($size)"
    else
        echo "   ⚠️  Video nicht gefunden: $video"
    fi
done

echo ""
echo "✅ Poster-Generierung abgeschlossen!"
echo ""
echo "📊 Nächste Schritte:"
echo "1. Prüfe die generierten Poster-Bilder in public/videos/"
echo "2. Build ausführen: pnpm build"
echo "3. PageSpeed Insights testen: https://pagespeed.web.dev/"
echo ""
