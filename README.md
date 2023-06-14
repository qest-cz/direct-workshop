## How to run locally
- terminal 1: `docker-compose -f docker-compose-redis-only.yml up`
- terminal 2: `npm install`
- terminal 2: `cd pawesome-care`
- terminal 2: `npm install`
- terminal 2: `nx serve grid`
- terminal 3: `nx serve controlls`
- terminal 4: `nx serve game`
- go to URL: http://localhost:3000/api/game/start

### Prerequisites
- install node: https://kinsta.com/blog/how-to-install-node-js/
- `npm install -g nx`
- `npm install -g @nrwl/cli`

## How to run via docker
- `docker compose up install`
(lasts about 5-10 min, it will write some warnings during the process - ignore, end at exit 0 after installation)
- `docker compose up`
- go to URL: http://localhost:3000/api/game/start

### Prerequisites
- install docker: https://docs.docker.com/engine/install/
- install docker-compose: https://docs.docker.com/compose/install/