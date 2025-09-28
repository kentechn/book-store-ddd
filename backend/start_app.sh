#!/bin/sh
echo "Starting application..."

# マイグレーション実行（本番環境でのみ）
# pnpm prisma migrate deploy

echo "Starting Node.js application..."
node ./dist/main