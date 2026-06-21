Write-Host "[INFO] Generiere Video-Poster fuer Core Web Vitals Optimierung..."
Write-Host ""

# Check if ffmpeg is available
if (-not (Get-Command "ffmpeg" -ErrorAction SilentlyContinue)) {
    Write-Error "[ERROR] ffmpeg ist nicht installiert!"
    Write-Host "Installation unter Windows: winget install Gyan.FFmpeg"
    exit 1
}

$RootDir = (Resolve-Path "$PSScriptRoot\..").Path

# Videos Array
$Videos = @(
    "public/videos/video_chip.mp4"
    "public/videos/video_devsecops.mp4"
    "public/videos/video_software.mp4"
    "public/videos/video_neuronen.mp4"
    "public/videos/video_assistentin.mp4"
    "public/videos/video_smarthome.mp4"
)

foreach ($video in $Videos) {
    $videoPath = Join-Path $RootDir $video
    
    if (Test-Path $videoPath) {
        $posterPath = $videoPath -replace '\.mp4$', '-poster.jpg'
        $posterName = [System.IO.Path]::GetFileName($posterPath)
        
        Write-Host "[INFO] Generiere Poster: $posterName"
        
        # Take screenshot at 1 second, high quality
        & ffmpeg -i "$videoPath" -ss 00:00:01 -vframes 1 -q:v 2 -y "$posterPath" > $null 2>&1
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $posterPath)) {
            $size = (Get-Item $posterPath).Length
            $sizeKb = [math]::Round($size / 1024, 1)
            Write-Host "   [SUCCESS] Erstellt: $posterName ($sizeKb KB)" -ForegroundColor Green
        } else {
            Write-Host "   [ERROR] Fehler beim Generieren des Posters fuer: $video" -ForegroundColor Red
        }
    } else {
        Write-Host "   [WARN] Video nicht gefunden: $video" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "[INFO] Poster-Generierung abgeschlossen!" -ForegroundColor Green
Write-Host ""
Write-Host "Naechste Schritte:"
Write-Host "1. Pruefe die generierten Poster-Bilder in public/videos/"
Write-Host "2. Build ausfuehren: pnpm build"
Write-Host "3. PageSpeed Insights testen: https://pagespeed.web.dev/"
Write-Host ""
