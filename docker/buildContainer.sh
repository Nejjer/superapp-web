#!/bin/bash

set -e  # прерываем выполнение при любой ошибке

APP_NAME="superapp"

cd ..

echo "🚧 Начинаем сборку фронтенда..."
npm run build

echo "⚙️  Собираем сервер..."
cd servers
npm run build
cd ..

echo "🐳 Собираем Docker образ: $APP_NAME"
docker build -t nejer/$APP_NAME -f docker/Dockerfile .

echo "✅ Сборка успешно завершена!"

echo "💅 Пушим докер образ!"

docker push nejer/$APP_NAME:latest
