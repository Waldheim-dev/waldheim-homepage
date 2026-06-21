[CmdletBinding()]
param (
    [int]$Quality = 85
)

$BaseDir = (Resolve-Path "$PSScriptRoot\..\public").Path
$MissingCount = 0
$ConvertedCount = 0

Write-Host "[INFO] Suche nach fehlenden WebP-Dateien..."
Write-Host ""

# Check if cwebp is available
if (-not (Get-Command "cwebp" -ErrorAction SilentlyContinue)) {
    Write-Error "[ERROR] 'cwebp' ist nicht installiert!"
    Write-Host ""
    Write-Host "Bitte installiere cwebp (WebP Tools):"
    Write-Host "  - Windows (Chocolatey): choco install webp"
    Write-Host "  - Windows (Scoop): scoop install webp"
    Write-Host "  - Windows (Manuell): Download von https://developers.google.com/speed/webp/docs/precompiled und 'bin'-Ordner zum PATH hinzufügen."
    Write-Host "  - macOS: brew install webp"
    Write-Host "  - Linux: sudo apt-get install webp"
    Write-Host ""
    exit 1
}

# Find subdirectories in public/
$Subdirs = Get-ChildItem -Path $BaseDir -Directory

foreach ($dir in $Subdirs) {
    Write-Host "[DIR] $($dir.Name)/"
    
    # Get PNG/JPG/JPEG files
    $imgFiles = Get-ChildItem -Path $dir.FullName -File | Where-Object { $_.Extension -match '^\.(png|jpg|jpeg)$' }
    
    foreach ($imgFile in $imgFiles) {
        $webpPath = [System.IO.Path]::ChangeExtension($imgFile.FullName, ".webp")
        
        if (-not (Test-Path $webpPath)) {
            Write-Host "  [WARN] Fehlt: $($imgFile.BaseName).webp"
            $MissingCount++
            
            # Convert to WebP
            & cwebp -q $Quality "$($imgFile.FullName)" -o "$webpPath" > $null 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  [SUCCESS] Konvertiert: $($imgFile.BaseName).webp"
                $ConvertedCount++
            } else {
                Write-Host "  [ERROR] Fehler bei: $($imgFile.Name)"
            }
        }
    }
    
    Write-Host ""
}

Write-Host "----------------------------------------"
Write-Host "[INFO] Zusammenfassung:"
Write-Host "   Fehlende WebP-Dateien: $MissingCount"
Write-Host "   Erfolgreich konvertiert: $ConvertedCount"
Write-Host "----------------------------------------"

if ($ConvertedCount -eq 0 -and $MissingCount -eq 0) {
    Write-Host "[SUCCESS] Alle WebP-Dateien sind bereits vorhanden!"
}
