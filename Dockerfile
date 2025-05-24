FROM node:18-alpine3.20 as build-stage

WORKDIR /app

COPY package.json .

COPY . .

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm i && \
    pnpm build

# production stage
FROM node:18-alpine3.20 as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/tsconfig.json /app/tsconfig.json
COPY --from=build-stage /app/.env.production /app/.env.production
COPY --from=build-stage /app/.env.development /app/.env.development

WORKDIR /app


RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm i && \
    pnpm build

EXPOSE 3000

CMD ["pnpm", "run","start:prod"]