[CmdletBinding()]
param (
    [switch]$DryRun
)

$SrcDir = (Resolve-Path "$PSScriptRoot\..\src").Path
$FixedCount = 0

Write-Host "[INFO] Suche nach Links ohne trailing slash..."
Write-Host ""

$files = Get-ChildItem -Path $SrcDir -Filter *.astro -Recurse

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # We apply the same regex patterns as the bash version
    $newContent = $content
    
    # Fix 1: Simple paths: /kontakt -> /kontakt/
    $newContent = [regex]::Replace($newContent, 'href=(["''])/([a-zA-Z0-9/_-]+)(["''])', 'href=$1/$2/$3')
    
    # Fix 2: Paths with anchor: /silvacore#features -> /silvacore/#features
    $newContent = [regex]::Replace($newContent, 'href=(["''])/([a-zA-Z0-9/_-]+)#([a-zA-Z0-9_-]+)(["''])', 'href=$1/$2/#$3$4')
    
    # Fix 3: Revert for files with extensions: /favicon.ico/ -> /favicon.ico
    $newContent = [regex]::Replace($newContent, 'href=(["''])/([^"'']*\.(webp|png|jpg|jpeg|svg|ico|xml|webmanifest))/(["''])', 'href=$1/$2$4')
    
    # Fix 4: Revert double slashes: /kontakt// -> /kontakt/
    $newContent = [regex]::Replace($newContent, '//(["''])', '/$1')
    
    # Fix 5: Fix base href: <base href="//" /> -> <base href="/" />
    $newContent = $newContent -replace '<base href="//" />', '<base href="/" />'
    
    if ($content -ne $newContent) {
        if ($DryRun) {
            Write-Host "[DRY-RUN] Würde fixen: $($file.FullName)" -ForegroundColor Yellow
        } else {
            [System.IO.File]::WriteAllText($file.FullName, $newContent)
            Write-Host "[SUCCESS] Gefixt: $($file.FullName)" -ForegroundColor Green
            $FixedCount++
        }
    }
}

Write-Host ""
Write-Host "----------------------------------------"
Write-Host "[SUCCESS] Fertig!" -ForegroundColor Green
Write-Host "   Dateien gefixt: $FixedCount"
Write-Host "----------------------------------------"
Write-Host ""
Write-Host "Tipp: Prüfe die Änderungen mit:"
Write-Host "   git diff src/"
Write-Host ""
