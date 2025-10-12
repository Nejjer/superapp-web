# Базовый образ для Node и nginx
FROM node:23-slim AS base

WORKDIR /app

# --- Скопируем сервер ---
COPY ./servers/build ./servers/build
COPY ./servers/package*.json ./

RUN cd servers && npm ci

# --- Скопируем фронтенд билд ---
COPY ./dist ./dist

# --- Экспонируем порты ---
EXPOSE 5000
# --- Скрипт запуска ---
# Запускаем сервер
CMD ["node", "servers/build/index.js"]
