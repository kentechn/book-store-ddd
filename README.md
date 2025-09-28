# book-store-ddd
DDD練習用書籍ECサイト

## API設計書のUI生成
```bash
pnpm i
pnpm openapi:lint
pnpm openapi:build:doc
```

## 本番用Dockerイメージ作成
1. .env.prodの内容を本番環境用に書き換えた上で、以下のコマンドを実行してください。
1. build
```bash
# backendイメージのビルド
docker compose build backend

# frontendイメージのビルド
# comming soon...
```