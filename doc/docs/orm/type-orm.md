# TypeORM
- Je to o něco robustnější tradiční ORM s různýma dalšíma fičurama
- TypeORM je velmi ovlivněn jinými ORM, jako je Hibernate, Doctrine...
- Existují v něm dva přístupy
  - DataMapper - kde jsou oddělené datové modely od manipulace s daty 
  - ActiveRecord - záznam uloží sám sebe
- Schéma zde popisujete třídama které využívají různé anotace pro dopsání databázových specifik
- Z typů se pak generují migrace 
- Eager and lazy relace

### Podporované databáze
- MySQL 
- MariaDB
- Postgres
- CockroachDB
- SQLite
- Microsoft SQL Server
- Oracle
- SAP Hana
- sql.js
- MongoDB

### Cachování
- podporuje přímo
- dá se říkat u konkrétních dotazů i globálně jak a co se má cachvoat