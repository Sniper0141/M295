# Aufgabe 4.1

## Was kann man mit HopScotch machen?

- **RestAPI** (HTML) Messages verschicken, jeglicher Art:
    - Get
    - Post
    - Put
    - Patch
    - Delete
    - Head
    - Options
    - Connect
    - Trace
    - *einen Anpassbaren*
- GraphQL Requests schicken
- Echtzeit-Kommunikation betreiben
    - WebSocket 
    - SSE
    - Socket.IO
    - MQTT (Messagebus)

## WWW Abfragen

### https://www.galaxus.ch/
- Gibt Status OK (200)
- Brauchte 1587ms
- schickte 0.23Mb als Response, das meiste davon HTML
- verschiedene Sachen im Header, womit ich nicht viel anfangen kann

### https://www.zli.ch/ausbildungszentrum/giv-me-404
- Status 404
- Habe trotzdem HTML erhalten
- 415ms, weitaus weniger als Galaxus (wahrscheinlich wegen weniger Daten)
- jap, 31.95Kb

### https://picsum.photos/seed/picsum/200/300
- Status OK 200
- 701ms
- 6.31Kb
- Bild wird gerendert

### https://pokeapi.co/api/v2/pokemon/ditto
- Status OK 200 
- Json Daten
- 368ms
- 24.08Kb

### https://cat-fact.herokuapp.com/facts/random
- Status OK 200
- ein wenig Json Daten
- Random Fact ist im Json, ist aber auf Russisch xD
- 439ms

### https://jsonplaceholder.typicode.com/todos/1
- Status OK 200
- 384ms 
- 83B (sehr klein)
- Ein kleines Json zurückbekommen
- viele Sachen im Header gesetzt

### https://jsonplaceholder.typicode.com/posts
- Status "Created" 201
- 349ms
- 15B (sehr klein)
- sehr kleines Json erhalten
- im Header sind wieder gleich viele Sachen wie vorhin gesetzt
