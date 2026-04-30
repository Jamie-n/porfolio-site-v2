#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

function Require-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: '$name'. Install it and try again."
  }
}

Require-Command "docker"

try {
  docker info | Out-Null
} catch {
  throw "Docker is not running or not reachable. Start Docker Desktop (WSL2/Linux containers) and try again."
}

Write-Host "Starting Docker..."
docker compose up --build

Write-Host ""
Write-Host "App should be available at http://localhost:3000"
