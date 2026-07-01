#!/usr/bin/env bash
# Publie le build (dist/) sur la branche `production` du dépôt GitHub.
# C'est cette branche que le serveur Hostinger récupère (voir README).
# Usage : npm run deploy
set -euo pipefail

cd "$(dirname "$0")/.."
REMOTE_URL=$(git remote get-url origin)

npm run build

cd dist
rm -rf .git
git init -q -b production
git add -A
git commit -qm "deploy: $(date '+%Y-%m-%d %H:%M') — $(git -C .. rev-parse --short HEAD)"
git push -f "$REMOTE_URL" production
rm -rf .git

echo "✔ Branche production mise à jour."
echo "  Sur le serveur : cd ~/public_html && git fetch origin production && git reset --hard origin/production"
