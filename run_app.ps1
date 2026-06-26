if (-not $env:OPENAI_API_KEY) {
  Write-Host "OPENAI_API_KEY is not set."
  Write-Host "Set it first, for example:"
  Write-Host '$env:OPENAI_API_KEY="sk-..."'
  exit 1
}

& "C:\Program Files\nodejs\node.exe" .\server.js
