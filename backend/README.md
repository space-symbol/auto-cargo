# Transvestor Cargo Portal Backend

Бэкенд-сервис для портала Transvestor Cargo Portal, построенный на Fastify, TypeScript и Prisma.

## Технологический стек

- **Среда выполнения**: Node.js v18+
- **Фреймворк**: Fastify
- **Язык программирования**: TypeScript
- **База данных**: PostgreSQL 14+ (через Prisma ORM)
- **Аутентификация**: JWT
- **Документация API**: Swagger/OpenAPI
- **Валидация**: Zod
- **Логирование**: Pino

## Требования

- Node.js (v18 или выше)
- PostgreSQL 14 или выше
- Docker (опционально, для контейнеризированной разработки)
- npm или bun

## Начало работы

1. Установка зависимостей:
   ```bash
   npm install
   # или
   bun install
   ```

2. Настройка переменных окружения:
   Создайте файл `.env` в корневой директории со следующими переменными:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/transvestor_cargo"
   JWT_SECRET="ваш-секретный-ключ"
   PORT=3000
   NODE_ENV=development
   ```

3. Настройка базы данных:
   ```bash
   npx prisma migrate dev
   ```

4. Заполнение базы данных начальными данными (опционально):
   ```bash
   npm run prisma:seed
   ```

## Разработка

Запуск сервера разработки:
```bash
npm run dev
# или
bun run dev
```

Сервер будет доступен по адресу `http://localhost:3000` по умолчанию.

## Документация API

После запуска сервера, документация Swagger будет доступна по адресу:
```
http://localhost:3000/documentation
```

## Доступные скрипты

- `npm run dev` - Запуск сервера разработки с горячей перезагрузкой
- `npm run build` - Сборка проекта
- `npm start` - Запуск продакшн-сервера
- `npm run prisma:seed` - Заполнение базы данных начальными данными
- `npm run lint` - Запуск ESLint
- `npm run test` - Запуск тестов
- `npm run prisma:generate` - Генерация Prisma клиента
- `npm run prisma:migrate` - Применение миграций базы данных

## Структура проекта

```
backend/
├── src/
│   ├── routes/        # Маршруты API
│   ├── controllers/   # Контроллеры
│   ├── services/      # Бизнес-логика
│   ├── models/        # Модели данных
│   ├── middleware/    # Middleware функции
│   ├── utils/         # Утилиты
│   ├── types/         # TypeScript типы
│   ├── config/        # Конфигурация
│   └── app.ts         # Основной файл приложения
├── prisma/           # Схема базы данных и миграции
├── tests/            # Тесты
├── dist/             # Скомпилированные JavaScript файлы
└── package.json      # Зависимости проекта и скрипты
```

## API Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/refresh` - Обновление токена
- `POST /api/auth/logout` - Выход из системы

### Пользователи
- `GET /api/users` - Получение списка пользователей
- `GET /api/users/:id` - Получение информации о пользователе
- `POST /api/users` - Создание пользователя
- `PUT /api/users/:id` - Обновление пользователя
- `DELETE /api/users/:id` - Удаление пользователя

### Грузоперевозки
- `GET /api/cargo` - Получение списка грузоперевозок
- `GET /api/cargo/:id` - Получение информации о грузоперевозке
- `POST /api/cargo` - Создание грузоперевозки
- `PUT /api/cargo/:id` - Обновление грузоперевозки
- `DELETE /api/cargo/:id` - Удаление грузоперевозки

## Поддержка Docker

Для запуска проекта с использованием Docker:

```bash
docker-compose up
```

Это запустит как PostgreSQL базу данных, так и бэкенд-сервис.

## Разработка

1. Создайте новую ветку для вашей функциональности
2. Внесите изменения
3. Убедитесь, что все тесты проходят
4. Отправьте pull request

## Безопасность

- Все пароли хешируются с использованием bcrypt
- JWT токены имеют ограниченный срок действия
- Все входные данные валидируются с помощью Zod
- Используется HTTPS в продакшене
- Реализована защита от CSRF атак

## Лицензия

MIT License 