# Reputo

Лендинг Reputo (React + TypeScript + Vite) с бэкендом на FastAPI: заявки с формы
сохраняются в Postgres, уведомление о каждой заявке приходит в Telegram-бота
(через прокси). Docker compose поднимает **базу, бэкенд и фронт** (статика в
лёгком nginx-контейнере). SSL и домены обслуживает системный nginx сервера —
его конфиги и certbot ведутся отдельно, вне репозитория.

## Структура

```
frontend/   — лендинг: Vite + React + TS (src/components: ui / charts / demo / sections)
backend/    — FastAPI: app/leads (router, schemas, models, service), app/notifications
```

## Запуск

```bash
cp .env.example .env      # заполнить переменные
docker compose up -d --build
```

- Сайт целиком — `127.0.0.1:5002` (фронт-контейнер, `/api` проксируется на бэкенд внутри compose-сети).
- API напрямую — `127.0.0.1:8002`, health check — `GET /api/health`.
- Порты меняются через `FRONTEND_PORT` / `BACKEND_PORT`.

Системному nginx сервера достаточно проксировать весь трафик домена на
`127.0.0.1:5002` (или отдельно `/api/` → `127.0.0.1:8002`).

## Разработка

```bash
docker compose up -d           # база + бэкенд (+ фронт-контейнер)
cd frontend && npm run dev     # vite dev server на :5173, /api проксируется на :8002
```

## Переменные окружения (.env)

| Переменная | Что это |
|---|---|
| `FRONTEND_PORT` | порт сайта на хосте (дефолт 5002; 5000/5001 заняты trend-trade-front) |
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
| **5002** | **reputo frontend (127.0.0.1)** |
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
