# Notizen Unterricht


## Tag 1


### Variabel-Typen
- var => NIE BENUTZEN
- const => konstant bleibende Variablen
- let => veränderbare Variablen

### Arrays
Item adden:
```
var myArray = [ "string1", "string2" ];
myArray.push("string3");

// Ausgabe: [ "string1", "string2", "string3" ] 
```

### Softwareverteilungsarchitekturen
**Standalone-Anwendungen**

- ... auf einem einzelnen Gerät, kein Internet nötig
- Client-Server-Anwendungen
- ... Client fragt an, Server antwortet.

**Peer-to-Peer-Anwendungen**
- Alle Teilnehmer gleichberechtigt
- Clients miteinander

Beispiele:
- Corona-App (leider)
- Tor-Browser

### Statuscodes

- Information
- Successs
- Redirection
- Error responses


## Tag 2

### Rest API 

Rest (**R**epresentational **S**tate **T**ransfer ist ein Entwurfsmuster für HTTP-Schnittstellen.

**CRUD**
- Create
- Read
- Update
- Delete

**JSON**
- serialisiertes *JavaScript Objekt*. 
- Gibt nicht viele Alternativen
- Datenaustausch RestAPIs
- Einfaches Daten-Format
- Sprachen-Unabhängig (überall unterstützt)

**Payload und Parameter**

Wie senden Clients Daten an Servers?

https://www.zli.ch/kurse/2?key=value&key2=value2#anchor
1. "https" => Protokoll
2. "www.zli.ch" => Host
3. 