# Pulso

Pulso is a web application for small food businesses. It helps them understand product costs, margins, purchases, sales and inventory.

## Project status

The project foundation is under development. The repository contains two independent TypeScript applications:

- `frontend/`: React and Vite user interface.
- `backend/`: NestJS REST API with PostgreSQL and TypeORM.

## Requirements

- Node.js 24 LTS
- npm 11 or later
- PostgreSQL

## Local setup

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

cd frontend
npm install
npm run dev
```

Run the backend in another terminal after setting `DATABASE_URL` in `backend/.env`:

```bash
cd backend
npm install
npm run start:dev
```

The frontend runs at `http://localhost:5173`. The API health endpoint is available at `http://localhost:3000/api/v1/health`.

## Quality checks

Run these commands inside both `frontend/` and `backend/`:

```bash
npm run format:check
npm run lint
npm run test
npm run build
```

GitHub Actions executes the same checks for pull requests and changes to `main`.

## Documentation

- [Project Wiki](https://github.com/Fernanda-Escobar-Fullstack/pulso/wiki)
