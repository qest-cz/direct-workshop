# Prisma
https://www.prisma.io/

- Jedná se o velice zajímavé Typescriptové ORM - Next-generation ORM
- Jaký dotaz pošlete do databáze takový typ se vrátí
- podporuje migrace, je typově bezpečná a pomáhá při vývoji
- speciálně se v ní popisuje schéma a z něj se pak generují datové typy

### Podporované databáze
- PostgreSQL
- MySQL
- MongoDB
- SQL Server
- SQLite
- CockroachDB

### Integrace do nx monorepa

https://www.npmjs.com/package/@nx-tools/nx-prisma

základní příkazy:
```typescript
nx prisma-generate orm
nx prisma-deploy orm
nx prisma-migrate orm
```

### Middlewary
Jedná se o hooky které lze provádět před či po vykonání určitých dotazů

existuje implementace redisu: https://www.npmjs.com/package/prisma-redis-middleware
