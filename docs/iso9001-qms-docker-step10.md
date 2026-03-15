# ISO 9001:2015 QMS SaaS – Step 10 Docker Deployment Configuration

## Files delivered
- `docker-compose.yml`
- `Dockerfile.frontend`
- `Dockerfile.backend`
- `deploy/nginx/frontend.conf`
- `.env.docker.example`

## Services
- `postgres` (PostgreSQL 16)
- `backend` (NestJS API)
- `frontend` (Angular app served by Nginx)

## Local run instructions

1. Copy environment template:
   ```bash
   cp .env.docker.example .env
   ```

2. Build and start:
   ```bash
   docker compose up --build -d
   ```

3. Access services:
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:3000/api`
   - PostgreSQL: `localhost:5432`

4. Stop services:
   ```bash
   docker compose down
   ```

5. Stop and remove volumes:
   ```bash
   docker compose down -v
   ```

## Notes
- Nginx routes `/api/*` to backend service `backend:3000`.
- Angular SPA fallback is enabled with `try_files ... /index.html`.
- Use strong `JWT_SECRET` and non-default DB credentials in non-local environments.
