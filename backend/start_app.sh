
#!/bin/sh
echo "Starting application..."

# DATABASE_URLが設定されているかチェック
if [ -z "\$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# マイグレーション実行（本番環境でのみ）
pnpm prisma migrate deploy

echo "Starting Node.js application..."
node dist/main.js
