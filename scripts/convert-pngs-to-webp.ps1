[CmdletBinding()]
param (
    [int]$Quality = 85
)

$BaseDir = (Resolve-Path "$PSScriptRoot\..\public").Path
$ConvertedCount = 0
$SkippedCount = 0
$ErrorCount = 0

Write-Host "----------------------------------------"
Write-Host "[INFO] PNG -> WebP Konvertierung"
Write-Host "----------------------------------------"
Write-Host "Verzeichnis: $BaseDir"
Write-Host "Qualität: $Quality"
Write-Host ""

# Check if cwebp is available
if (-not (Get-Command "cwebp" -ErrorAction SilentlyContinue)) {
    Write-Error "[ERROR] 'cwebp' ist nicht installiert!"
    Write-Host ""
    Write-Host "Bitte installiere cwebp (Google WebP Tools) und füge es zum PATH hinzu:"
    Write-Host "  - Windows (Chocolatey): choco install webp"
    Write-Host "  - Windows (Scoop): scoop install webp"
    Write-Host "  - Windows (Manuell): Download von https://developers.google.com/speed/webp/docs/precompiled und 'bin'-Ordner zum PATH hinzufügen."
    Write-Host "  - macOS: brew install webp"
    Write-Host "  - Linux: sudo apt-get install webp"
    Write-Host ""
    exit 1
}

# Recursively find PNG files
Write-Host "[INFO] Suche nach PNG-Dateien..."
Write-Host ""

$pngFiles = Get-ChildItem -Path $BaseDir -Filter *.png -Recurse

foreach ($pngFile in $pngFiles) {
    $webpPath = [System.IO.Path]::ChangeExtension($pngFile.FullName, ".webp")
    $relativePath = $pngFile.FullName.Substring($BaseDir.Length + 1)
    
    # Check if WebP already exists
    if (Test-Path $webpPath) {
        Write-Host "  [SKIP] Übersprungen: $relativePath (WebP existiert bereits)" -ForegroundColor Yellow
        $SkippedCount++
        continue
    }
    
    # Convert to WebP
    & cwebp -q $Quality "$($pngFile.FullName)" -o "$webpPath" > $null 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        $pngSize = $pngFile.Length
        $webpSize = (Get-Item $webpPath).Length
        
        $reduction = 0
        if ($pngSize -gt 0) {
            $reduction = [math]::Round(($pngSize - $webpSize) * 100 / $pngSize)
        }
        
        Write-Host "  [SUCCESS] Konvertiert: $relativePath (-$reduction% Größe)" -ForegroundColor Green
        $ConvertedCount++
    } else {
        Write-Host "  [ERROR] Fehler: $relativePath" -ForegroundColor Red
        $ErrorCount++
    }
}

# Summary
Write-Host ""
Write-Host "----------------------------------------"
Write-Host "[INFO] Zusammenfassung:"
Write-Host "----------------------------------------"
Write-Host "   [SUCCESS] Erfolgreich konvertiert: $ConvertedCount" -ForegroundColor Green
Write-Host "   [SKIP] Übersprungen: $SkippedCount" -ForegroundColor Yellow
Write-Host "   [ERROR] Fehler: $ErrorCount" -ForegroundColor Red
Write-Host "----------------------------------------"

if ($ConvertedCount -eq 0 -and $SkippedCount -gt 0) {
    Write-Host "[SUCCESS] Alle PNGs wurden bereits zu WebP konvertiert!" -ForegroundColor Green
} elseif ($ConvertedCount -gt 0) {
    Write-Host "[SUCCESS] Konvertierung abgeschlossen!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tipp: Lösche jetzt die originalen PNG-Dateien, wenn du nur WebP verwenden möchtest:"
    Write-Host "   Get-ChildItem -Path `"$BaseDir`" -Filter *.png -Recurse | Remove-Item"
}
Write-Host ""
