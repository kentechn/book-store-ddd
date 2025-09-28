
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# CI環境変数を設定
ENV CI=true
RUN corepack enable
COPY ./backend /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
ENV CI=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Prismaクライアントを生成（TypeScriptコンパイル前に必要）
RUN pnpm prisma generate
RUN pnpm build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma


COPY ./backend/start_app.sh /app/start_app.sh

EXPOSE 3000

RUN chmod +x /app/start_app.sh
CMD ["sh", "start_app.sh"]
