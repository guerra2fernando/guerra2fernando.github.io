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
$commit = git rev-parse HEAD
git push -f origin gh-pages
Pop-Location

if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Waiting for the GitHub Pages build triggered by the push..."
  $repo = "guerra2fernando/guerra2fernando.github.io"
  $deadline = (Get-Date).AddMinutes(3)
  $status = $null
  while ((Get-Date) -lt $deadline) {
    Start-Sleep -Seconds 5
    $build = gh api "repos/$repo/pages/builds" --jq '.[0] | [.commit, .status] | @tsv' 2>$null
    if (-not $build) { continue }
    $parts = $build -split "`t"
    if ($parts.Count -ge 2 -and $parts[0] -eq $commit) {
      $status = $parts[1]
      if ($status -eq "built" -or $status -eq "errored") { break }
    }
  }

  if ($status -eq "errored") {
    Write-Host "The automatic build failed; requesting a manual build..."
    gh api -X POST "repos/$repo/pages/builds" | Out-Null
  } elseif ($status -ne "built") {
    Write-Host "The build is still running; check the Pages dashboard in a moment."
  }
}

Write-Host "Deployed: https://guerra2fernando.github.io"
