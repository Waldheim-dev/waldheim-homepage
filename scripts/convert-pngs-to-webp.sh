#!/bin/bash
# Script zur Konvertierung aller PNG-Dateien zu WebP im public/-Verzeichnis
# Durchsucht rekursiv alle Unterordner und konvertiert PNGs zu WebP
# Verwendung: ./scripts/convert-pngs-to-webp.sh [QUALITY]

set -e

# Konfiguration
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../public" && pwd)"
QUALITY="${1:-85}"  # Standard: 85, kann als Parameter übergeben werden
CONVERTED_COUNT=0
SKIPPED_COUNT=0
ERROR_COUNT=0

# Farben für Terminal-Ausgabe
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🖼️  PNG → WebP Konvertierung${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📁 Verzeichnis:${NC} $BASE_DIR"
echo -e "${BLUE}🎯 Qualität:${NC} $QUALITY"
echo ""

# Prüfe ob cwebp installiert ist
if ! command -v cwebp &> /dev/null; then
  echo -e "${RED}❌ Fehler: 'cwebp' ist nicht installiert!${NC}"
  echo ""
  echo "Installation unter Debian/Ubuntu:"
  echo "  sudo apt-get install webp"
  echo ""
  echo "Installation unter macOS:"
  echo "  brew install webp"
  echo ""
  exit 1
fi

# Funktion zum Konvertieren einer PNG-Datei
convert_png_to_webp() {
  local png_file="$1"
  local webp_file="${png_file%.png}.webp"
  local relative_path="${png_file#$BASE_DIR/}"
  
  # Prüfe ob WebP bereits existiert
  if [ -f "$webp_file" ]; then
    echo -e "  ${YELLOW}⏭️  Übersprungen:${NC} $relative_path ${YELLOW}(WebP existiert bereits)${NC}"
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
    return
  fi
  
  # Konvertiere zu WebP
  if cwebp -q "$QUALITY" "$png_file" -o "$webp_file" > /dev/null 2>&1; then
    # Dateigrößen berechnen
    local png_size=$(stat -c%s "$png_file" 2>/dev/null || stat -f%z "$png_file")
    local webp_size=$(stat -c%s "$webp_file" 2>/dev/null || stat -f%z "$webp_file")
    local reduction=$(( (png_size - webp_size) * 100 / png_size ))
    
    echo -e "  ${GREEN}✅ Konvertiert:${NC} $relative_path ${GREEN}(-${reduction}% Größe)${NC}"
    CONVERTED_COUNT=$((CONVERTED_COUNT + 1))
  else
    echo -e "  ${RED}❌ Fehler:${NC} $relative_path"
    ERROR_COUNT=$((ERROR_COUNT + 1))
  fi
}

# Suche und konvertiere alle PNG-Dateien rekursiv
echo "🔍 Suche nach PNG-Dateien..."
echo ""

# Finde alle PNG-Dateien im public/-Verzeichnis
find "$BASE_DIR" -type f -name "*.png" | sort | while read png_file; do
  convert_png_to_webp "$png_file"
done

# Zusammenfassung
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Zusammenfassung:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "   ${GREEN}✅ Erfolgreich konvertiert: $CONVERTED_COUNT${NC}"
echo -e "   ${YELLOW}⏭️  Übersprungen: $SKIPPED_COUNT${NC}"
echo -e "   ${RED}❌ Fehler: $ERROR_COUNT${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $CONVERTED_COUNT -eq 0 ] && [ $SKIPPED_COUNT -gt 0 ]; then
  echo -e "${GREEN}✨ Alle PNGs wurden bereits zu WebP konvertiert!${NC}"
elif [ $CONVERTED_COUNT -gt 0 ]; then
  echo -e "${GREEN}✨ Konvertierung abgeschlossen!${NC}"
  echo ""
  echo "💡 Tipp: Lösche jetzt die originalen PNG-Dateien, wenn du nur WebP verwenden möchtest:"
  echo "   find $BASE_DIR -type f -name '*.png' -delete"
fi

echo ""

exit 0
