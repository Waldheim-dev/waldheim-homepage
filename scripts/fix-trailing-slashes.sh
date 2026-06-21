#!/bin/bash
# Script zum automatischen Hinzufügen von trailing slashes zu internen Links
# Konform mit Astro Config: trailingSlash: 'always'

set -e

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../src" && pwd)"
FIXED_COUNT=0
DRY_RUN=false

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Suche nach Links ohne trailing slash..."
echo ""

# Funktion zum Fixen einer Datei
fix_file() {
  local file="$1"
  local temp_file="${file}.tmp"
  
  # Erstelle Backup
  cp "$file" "$temp_file"
  
  # Fix 1: Einfache Pfade ohne Anchor und ohne Extension
  # /kontakt → /kontakt/
  # /services/devsecops → /services/devsecops/
  sed -i -E 's|href=(["\x27])/([a-zA-Z0-9/_-]+)(["\x27])|href=\1/\2/\3|g' "$temp_file"
  
  # Fix 2: Pfade mit Anchor (muss vor / kommen)
  # /silvacore#features → /silvacore/#features
  sed -i -E 's|href=(["\x27])/([a-zA-Z0-9/_-]+)#([a-zA-Z0-9_-]+)(["\x27])|href=\1/\2/#\3\4|g' "$temp_file"
  
  # Fix 3: Rückgängig machen für Dateien mit Extensions
  # /favicon.ico/ → /favicon.ico
  sed -i -E 's|href=(["\x27])/([^"\x27]*\.(webp|png|jpg|jpeg|svg|ico|xml|webmanifest))/(["\x27])|href=\1/\2\4|g' "$temp_file"
  
  # Fix 4: Rückgängig machen für doppelte Slashes
  # /kontakt// → /kontakt/
  sed -i -E 's|//(["\x27])|/\1|g' "$temp_file"
  
  # Fix 5: Fix für base href (soll / bleiben)
  sed -i -E 's|<base href="//" />|<base href="/" />|g' "$temp_file"
  
  # Prüfe, ob Änderungen vorgenommen wurden
  if ! cmp -s "$file" "$temp_file"; then
    if [ "$DRY_RUN" = true ]; then
      echo -e "${YELLOW}[DRY-RUN]${NC} Würde fixen: $file"
      diff "$file" "$temp_file" | head -20 || true
    else
      mv "$temp_file" "$file"
      echo -e "${GREEN}✅${NC} Gefixt: $file"
      FIXED_COUNT=$((FIXED_COUNT + 1))
    fi
  else
    rm "$temp_file"
  fi
}

# Verarbeite alle .astro Dateien
while IFS= read -r -d '' file; do
  # Prüfe, ob die Datei problematische Links enthält
  if grep -qE 'href=["\x27]/[a-zA-Z0-9/_-]+(#[a-zA-Z0-9_-]+)?["\x27]' "$file" 2>/dev/null; then
    # Schließe bereits korrekte Links aus
    if grep -qE 'href=["\x27]/[a-zA-Z0-9/_-]+["\x27]' "$file" 2>/dev/null && \
       ! grep -qE 'href=["\x27]/[a-zA-Z0-9/_-]+/["\x27]' "$file" 2>/dev/null; then
      fix_file "$file"
    fi
  fi
done < <(find "$SRC_DIR" -type f -name "*.astro" -print0)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✨ Fertig!${NC}"
echo "   Dateien gefixt: $FIXED_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tipp: Prüfe die Änderungen mit:"
echo "   git diff src/"
