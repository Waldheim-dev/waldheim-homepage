Write-Host "[INFO] Image Optimizer fuer Core Web Vitals"
Write-Host ""

# Check if cwebp is available
if (-not (Get-Command "cwebp" -ErrorAction SilentlyContinue)) {
    Write-Error "[ERROR] cwebp (WebP Tools) ist nicht installiert!"
    Write-Host "Bitte installiere cwebp (Google WebP Tools) und fuege es zum PATH hinzu:"
    Write-Host "  - Windows (Chocolatey): choco install webp"
    Write-Host "  - Windows (Scoop): scoop install webp"
    Write-Host "  - Windows (Manuell): Download von https://developers.google.com/speed/webp/docs/precompiled und 'bin'-Ordner zum PATH hinzufügen."
    Write-Host "  - macOS: brew install webp"
    Write-Host "  - Linux: sudo apt-get install webp"
    Write-Host ""
    exit 1
}

$RootDir = (Resolve-Path "$PSScriptRoot\..").Path
$BaseDir = Join-Path $RootDir "public"

Write-Host "[INFO] Suche grosse PNG/JPG-Dateien..."
Write-Host ""

$largeImages = Get-ChildItem -Path $BaseDir -Recurse | Where-Object { 
    ($_.Extension -match '^\.(png|jpg)$') -and ($_.Length -gt 50KB)
}

$count = 0
$totalSaved = 0

foreach ($img in $largeImages) {
    $webpPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    $webpName = [System.IO.Path]::GetFileName($webpPath)
    $imgName = $img.Name
    
    # Skip if WebP already exists
    if (Test-Path $webpPath) {
        Write-Host "  [SKIP] Ueberspringe (existiert): $webpName"
        continue
    }
    
    $originalSize = $img.Length
    $originalSizeKb = [math]::Round($originalSize / 1024, 1)
    
    Write-Host "[INFO] Konvertiere: $imgName (${originalSizeKb} KB)"
    
    # Convert to WebP (Quality 80)
    & cwebp -q 80 "$($img.FullName)" -o "$webpPath" > $null 2>&1
    
    if ($LASTEXITCODE -eq 0 -and (Test-Path $webpPath)) {
        $newSize = (Get-Item $webpPath).Length
        $newSizeKb = [math]::Round($newSize / 1024, 1)
        
        $saved = $originalSize - $newSize
        $savedKb = [math]::Round($saved / 1024, 1)
        
        $savedPercent = 0
        if ($originalSize -gt 0) {
            $savedPercent = [math]::Round(($saved * 100) / $originalSize)
        }
        
        $totalSaved += $saved
        $count++
        
        Write-Host "   [SUCCESS] Erstellt: $webpName (${newSizeKb} KB, -$savedPercent%)" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "   [ERROR] Fehler bei der Konvertierung von: $imgName" -ForegroundColor Red
    }
}

if ($count -eq 0) {
    Write-Host "[INFO] Keine Bilder zum Optimieren gefunden (alle schon konvertiert)"
} else {
    $totalSavedKb = [math]::Round($totalSaved / 1024, 1)
    Write-Host "[SUCCESS] Optimierung abgeschlossen!" -ForegroundColor Green
    Write-Host "   [INFO] $count Bilder konvertiert"
    Write-Host "   [INFO] $totalSavedKb KB gespart"
}

Write-Host ""
Write-Host "Naechste Schritte:"
Write-Host "1. Ersetze PNG-Referenzen in Astro-Dateien mit WebP"
Write-Host "2. Beispiel: /bento/image.png → /bento/image.webp"
Write-Host "3. Build ausfuehren: pnpm build"
Write-Host ""
