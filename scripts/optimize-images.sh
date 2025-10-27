#!/bin/bash

# 🖼️ Image Optimizer für Core Web Vitals
# Konvertiert PNG → WebP und optimiert Bildgrößen

set -e

echo "🖼️  Image Optimizer für Core Web Vitals"
echo ""

# Prüfe ob cwebp installiert ist
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp (WebP Tools) ist nicht installiert!"
    echo "Installation:"
    echo "  - Linux: sudo apt install webp"
    echo "  - macOS: brew install webp"
    exit 1
fi

# Wechsle ins Projekt-Root
cd "$(dirname "$0")/.." || exit

echo "🔍 Suche große PNG/JPG-Dateien..."
echo ""

# Finde große Bilder (> 50 KB)
large_images=$(find public -type f \( -name "*.png" -o -name "*.jpg" \) -size +50k)

count=0
total_saved=0

for img in $large_images; do
    # WebP-Pfad generieren
    webp="${img%.*}.webp"
    
    # Überspringe wenn WebP schon existiert
    if [ -f "$webp" ]; then
        echo "⏭️  Überspringe (existiert): $(basename "$webp")"
        continue
    fi
    
    # Original-Größe
    original_size=$(stat -c%s "$img" 2>/dev/null || stat -f%z "$img")
    original_size_kb=$((original_size / 1024))
    
    echo "🔄 Konvertiere: $(basename "$img") (${original_size_kb} KB)"
    
    # Konvertiere zu WebP (Qualität 80)
    cwebp -q 80 "$img" -o "$webp" 2>/dev/null
    
    # Neue Größe
    new_size=$(stat -c%s "$webp" 2>/dev/null || stat -f%z "$webp")
    new_size_kb=$((new_size / 1024))
    
    # Einsparung berechnen
    saved=$((original_size - new_size))
    saved_kb=$((saved / 1024))
    saved_percent=$(( (saved * 100) / original_size ))
    
    total_saved=$((total_saved + saved))
    count=$((count + 1))
    
    echo "   ✅ Erstellt: $(basename "$webp") (${new_size_kb} KB, -${saved_percent}%)"
    echo ""
done

if [ $count -eq 0 ]; then
    echo "ℹ️  Keine Bilder zum Optimieren gefunden (alle schon konvertiert)"
else
    total_saved_kb=$((total_saved / 1024))
    echo "✅ Optimierung abgeschlossen!"
    echo "   📊 $count Bilder konvertiert"
    echo "   💾 $total_saved_kb KB gespart"
fi

echo ""
echo "🚀 Nächste Schritte:"
echo "1. Ersetze PNG-Referenzen in Astro-Dateien mit WebP"
echo "2. Beispiel: /bento/image.png → /bento/image.webp"
echo "3. Build ausführen: pnpm build"
echo ""
