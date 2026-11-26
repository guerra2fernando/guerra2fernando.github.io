$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$tmp = Join-Path $env:TEMP "fernando-portfolio-gh-pages"

Write-Host "Building the static site..."
Push-Location $root
npm run build
Pop-Location

if (Test-Path $tmp) {
  Remove-Item -Recurse -Force $tmp
}
New-Item -ItemType Directory -Path $tmp | Out-Null

Write-Host "Preparing the gh-pages branch..."
Copy-Item -Path (Join-Path $root "out\*") -Destination $tmp -Recurse -Force
Copy-Item -Path (Join-Path $root "out\.nojekyll") -Destination $tmp -Force

Push-Location $tmp
git init -b gh-pages | Out-Null
git add -A
git commit -m "Deploy portfolio" | Out-Null
git remote add origin https://github.com/guerra2fernando/guerra2fernando.github.io.git
git push -f origin gh-pages
Pop-Location

if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Requesting a GitHub Pages build..."
  gh api -X POST repos/guerra2fernando/guerra2fernando.github.io/pages/builds | Out-Null
}

Write-Host "Deployed: https://guerra2fernando.github.io"
