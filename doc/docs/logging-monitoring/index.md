# Logování a monitoring

## Logování
Při logování je třeba zajistit pár věcí
1) snadné čtení logů při vývoji aplikace - JSON se blbě čte z konzole
```json
2022-02-02 12:12:12 [info]: some log
    context: 
        url: "/hello-world"
        method: "get"
}
```
2) jednoznačné a vyhledávatelné logy po nasazení aplikace - vhodná interpretace například přes JSON
```json
{
  "time": "2022-02-02 12:12:12",
  "level": "20",
  "message": "some log",
  "context": {
    "url": "/hello-world",
    "method": "get"
  }
}
```
3) aby se nelogovalo zbytečně velké množství dat a logovalo se jen co má smysl
 
### Knihovny pro logování
Pomáhají nám standatizovat logování a správně ho nastavit. 

Při vývoji píšeme logy s různou důležitostí (`trace`, `warn`, `error`, ...). 
Pomocí nastavení knihovny pak v prostředích dokážeme řídit jaké logy se mají skutečně logovat.
Dokážeme je i přepínat v případě potřeby. 

Knihovny využívají často několik "transportů" které zajistí interpretaci logu 
- Json, formátovaný text, ...
- console, file, api, ...

Příklady balíčků
- https://www.npmjs.com/package/bunyan
- https://www.npmjs.com/package/pino
- https://www.npmjs.com/package/winston
- ...

```typescript
export const logger = pino({
    name: 'app-name',
    level: 'info'
});

logger.info('hello world');
logger.info({foo: "bar"});
logger.error(e);
logger.trace("don't log this with setting above");
```

### Logger s kontextem
- pro API cally a jiné opakující se akce
- navěsí se na logger potřebné informace o requestu, které se přidávají automaticky do kazdého logu
```typescript
express.use((req, res, next) => {
    const logger = createLogger();
    logger.setContext({
        url: req.path,
        method: req.method,
        headers: req.headers,
    });
    req.logger = logger;
})
...
expres.get("/hello-world", (req,res) => {
    req.logger.info('some log');
    ...
})
```

```
2022-02-02 12:12:12 [info]: some log
    context: 
        url: "/hello-world"
        method: "get"
        headers: {...}    
}
```
- Implementace přes DI kontejner navěšený na request

### Logování v nest.js
https://docs.nestjs.com/techniques/logger

Nest má integrovaný vlastní logger. 
Používá trochu jinou sadu Levelů než se běžně používají balíčky jako pino.  
Vestavěný logger se dá ale nahradit vlastní implementací. 
Pokud se správně nastaví injection scope, takže lze snadno vytvořit logger s kontextem pro requesty. 

### ELK - Elasticsearch, Logstash, Kibana
Stack postavený na těchto třech nástrojích
- Logstash sbírá logy 
- Elastic je ukládá a indexuje
- Kibana je zobrazuje

Vývojář by se neměl starat o nic jiného než zapisovat logy a hledat v nich.
Vývojář se tedy prakticky setká jen s kibanou. V kibaně lze logy vyhledat, filtrovat ale i dělat nad nimi agregace grafy atp.

#### best practise
- Nad prostředím mít připravený automatický sběr logů z kontejnerů ze stdOut
- Logy dělat ve strojově čitelném formátu, ideálně json

## Monitoring
Záleží na použitém stacku

### Prometheus
- běžně se používá s kubernety 
- scrapuje metriky z podů na nějakém speciálním endpointu
- [prom-client](https://www.npmjs.com/package/prom-client) je balíček do nodeJS, který se stará o sběr metrik
- Existuje [middleware pro express](https://www.npmjs.com/package/express-prometheus-middleware) který metriky vystaví na routu. 
  Zároveň poskytuje základní metriky o http requestech
- Pro zobrazování pak slouží různé nástroje, jako třeba Grafana

### Cloudové metriky
Cloudový poskytovatelé mají vlastní řešení na logování/monitoring a poskytují pro ně SDK do NodeJS.  
