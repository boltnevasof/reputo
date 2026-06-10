# Reputo

Лендинг Reputo (React + TypeScript + Vite) с бэкендом на FastAPI: заявки с формы
сохраняются в Postgres, уведомление о каждой заявке приходит в Telegram-бота
(через прокси). Всё собирается одним docker compose, nginx раздаёт статику,
проксирует `/api` и готов к подключению SSL-сертификатов.

## Структура

```
frontend/   — лендинг: Vite + React + TS (src/components: ui / charts / demo / sections)
backend/    — FastAPI: app/leads (router, schemas, models, service), app/notifications
nginx/      — конфиги: default.conf.template (HTTP), ssl.conf.example (HTTPS)
certs/      — сюда кладутся fullchain.pem / privkey.pem
```

## Запуск

```bash
cp .env.example .env      # заполнить переменные
docker compose up -d --build
```

Лендинг — http://localhost (порт меняется через `HTTP_PORT`).
Health check бэкенда — `GET /api/health`.

## Переменные окружения (.env)

| Переменная | Что это |
|---|---|
| `DOMAIN` | домен для nginx (`server_name`) |
| `POSTGRES_USER / PASSWORD / DB` | доступы к базе |
| `TELEGRAM_BOT_TOKEN` | токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | chat_id, куда слать уведомления о заявках |
| `PROXY_URL` | прокси для Telegram API: `http://host:port` или `socks5://host:port` |
| `PROXY_LOGIN / PROXY_PASSWORD` | авторизация прокси |

## SSL

1. Положите сертификаты в `certs/`: `fullchain.pem` и `privkey.pem`.
2. `cp nginx/ssl.conf.example nginx/ssl.conf.template`
3. `docker compose up -d --force-recreate nginx`

Для Let's Encrypt: в HTTP-конфиге уже есть локация `/.well-known/acme-challenge/`
под `certbot --webroot`.

## Разработка без докера

```bash
# фронт (vite dev server проксирует /api на :8000)
cd frontend && npm install && npm run dev

# бэк (нужен запущенный Postgres, см. переменные в backend/app/config.py)
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## API

`POST /api/leads` — приём заявки:

```json
{
  "clinic_name": "Дентал-Сити",
  "clinic_link": "https://yandex.ru/maps/org/...",
  "city": "Казань",
  "clinics_count": "5",
  "contact": "@username или +7 900 000-00-00"
}
```

Заявка пишется в таблицу `leads`, уведомление уходит в Telegram фоном —
сбой телеграма не ломает приём заявки (смотрите логи backend).
