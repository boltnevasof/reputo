# Reputo

Лендинг Reputo (React + TypeScript + Vite) с бэкендом на FastAPI: заявки с формы
сохраняются в Postgres, уведомление о каждой заявке приходит в Telegram-бота
(через прокси). В docker compose подняты только **база и бэкенд** — статику
фронта и SSL обслуживает системный nginx сервера (его конфиги ведутся отдельно).

## Структура

```
frontend/   — лендинг: Vite + React + TS (src/components: ui / charts / demo / sections)
backend/    — FastAPI: app/leads (router, schemas, models, service), app/notifications
```

## Запуск бэкенда

```bash
cp .env.example .env      # заполнить переменные
docker compose up -d --build
```

API доступен на `127.0.0.1:8002` (порт меняется через `BACKEND_PORT`).
Health check — `GET /api/health`.

## Сборка фронта

```bash
cd frontend && npm install && npm run build
```

Готовая статика — в `frontend/dist/`. Системный nginx сервера раздаёт эту папку
и проксирует `/api/` на `127.0.0.1:8002`. Страницы документов лежат в статике
как `/privacy.html` и `/oferta.html`.

## Разработка

```bash
docker compose up -d           # база + бэкенд на :8002
cd frontend && npm run dev     # vite dev server, /api проксируется на :8002
```

## Переменные окружения (.env)

| Переменная | Что это |
|---|---|
| `BACKEND_PORT` | порт API на хосте (дефолт 8002; 8001 занят trend-trade-back) |
| `POSTGRES_USER / PASSWORD / DB` | доступы к базе |
| `TELEGRAM_BOT_TOKEN` | токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | chat_id, куда слать уведомления о заявках |
| `PROXY_URL` | прокси для Telegram API: `socks5://host:port` или `http://host:port` |
| `PROXY_LOGIN / PROXY_PASSWORD` | авторизация прокси |
| `CORS_ORIGINS` | origin фронта для локальной разработки |

## Порты на сервере (чтобы не конфликтовать)

| Порт | Сервис |
|---|---|
| 80 / 443 | системный nginx |
| 5000 / 5001 | trend-trade-front |
| 8001 | trend-trade-back (web) |
| **8002** | **reputo backend (127.0.0.1)** |

## API

`POST /api/leads` — приём заявки:

```json
{
  "clinic_name": "Дентал-Сити",
  "clinic_link": "https://yandex.ru/maps/org/...",
  "contact": "@username или +7 900 000-00-00"
}
```

Заявка пишется в таблицу `leads`, уведомление уходит в Telegram фоном —
сбой телеграма не ломает приём заявки (смотрите логи backend).
