#!/bin/bash
# Script zur Konvertierung fehlender WebP-Dateien
# Durchsucht public/-Verzeichnisse und konvertiert PNG/JPG zu WebP

set -e

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../public" && pwd)"
QUALITY=85
MISSING_COUNT=0
CONVERTED_COUNT=0

echo "🔍 Suche nach fehlenden WebP-Dateien..."
echo ""

# Funktion zum Konvertieren einer Datei
convert_to_webp() {
  local img_file="$1"
  local webp_file="${img_file%.*}.webp"
  
  if [ ! -f "$webp_file" ]; then
    echo "  ⚠️  Fehlt: $(basename "$webp_file")"
    MISSING_COUNT=$((MISSING_COUNT + 1))
    
    # Konvertiere zu WebP
    if cwebp -q "$QUALITY" "$img_file" -o "$webp_file" > /dev/null 2>&1; then
      echo "  ✅ Konvertiert: $(basename "$webp_file")"
      CONVERTED_COUNT=$((CONVERTED_COUNT + 1))
    else
      echo "  ❌ Fehler bei: $(basename "$img_file")"
    fi
  fi
}

# Durchsuche alle Verzeichnisse in public/
for dir in "$BASE_DIR"/*; do
  if [ -d "$dir" ]; then
    dir_name=$(basename "$dir")
    echo "📁 $dir_name/"
    
    # Finde alle PNG/JPG/JPEG Dateien
    find "$dir" -maxdepth 1 -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read img_file; do
      convert_to_webp "$img_file"
    done
    
    echo ""
  fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Zusammenfassung:"
echo "   Fehlende WebP-Dateien: $MISSING_COUNT"
echo "   Erfolgreich konvertiert: $CONVERTED_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $CONVERTED_COUNT -eq 0 ] && [ $MISSING_COUNT -eq 0 ]; then
  echo "✨ Alle WebP-Dateien sind bereits vorhanden!"
fi
