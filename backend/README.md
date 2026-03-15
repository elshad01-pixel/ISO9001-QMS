# eAudit Backend (NestJS)

NestJS backend foundation for ISO 9001 QMS modules.

## Modules included
- auth
- users
- organizations
- roles
- permissions
- documents
- processes
- risks
- nonconformities
- corrective-actions
- audits
- management-reviews
- training
- kpis
- notifications
- audit-logs

## Setup
```bash
npm install
cp .env.example .env
npm run start:dev
```

API base URL: `http://localhost:3000/api`

## Scripts
```bash
npm run build
npm run start:dev
npm run start:prod
npm run lint
npm run test
npm run test:e2e
npm run migration:run
npm run seed:run
```

## Environment variables
- `PORT`
- `JWT_SECRET`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `NODE_ENV`
