# Buildweek-2-G6

Questo progetto è un clone di Spotify, realizzato per emulare l'esperienza utente dell'applicazione originale Spotify. Offre la possibilità di esplorare diverse pagine, tra cui la homepage, la ricerca di brani e artisti, nonché la gestione e l'ascolto di album e playlist.

## Step di avvio

### 1. Clonazione repository

```bash
git clone https://github.com/TunaSandwichhh/Buildweek-2-G6.git
```

### 2. Installazione dependencies

Dopo aver clonato il progetto, naviga nella cartella del progetto e installa le dipendenze usando npm:

```bash
npm install
```

### 3. Compilazione del Progetto

Per compilare il progetto TypeScript in JavaScript, esegui il seguente comando:

```bash
npm run build
```

Il risultato della compilazione si troverà nella cartella /dist del progetto

## Descrizione HTML

### - index.html

La pagina principale del clone di Spotify, che funge da punto di ingresso per l'utente. Presenta una barra laterale per la navigazione e una sezione principale con contenuti dinamici, oltre ad una barra di ricerca dinamica.

### - searchPage.html

Permette agli utenti di visualizzare brani, album, artisti e playlist in base alla ricerca. I risultati sono divisi in sezioni facilmente navigabili.

### - artists.html

Dedicata alla visualizzazione delle informazioni sugli artisti, inclusi i brani più popolari, la discografia e artisti correlati. È possibile anche ascoltare anteprime dei brani direttamente dalla pagina.

### - album.html

Consente agli utenti di visualizzare i dettagli degli album, comprese le tracce disponibili. Gli utenti possono riprodurre brani attraverso il player integrato nella pagina.

### - playlist.html

Visualizza i dettagli di una playlist, inclusi i brani che la compongono.

## Descrizione Typescript

### - HomePage.ts

#### - getPlaylistIds()

```typescript
() => Promise<void>;
```

Funzione asincrona che recupera gli ID delle playlist da un profilo utente di Spotify specificato. Utilizza una chiamata fetch a un endpoint dell' API di Spotify. Gli ID recuperati vengono salvati in un array playlistIds.

#### - getPlaylist()

```typescript
() => Promise<Playlist[]>;
```

Funzione asincrona che recupera i dettagli delle playlist utilizzando gli ID precedentemente ottenuti.

### - PlaylistPage.ts

#### - getPlaylistTracks(id: string)

```typescript
() => Promise<Track[]>;
```

Recupera i brani di una specifica playlist utilizzando l'ID della playlist. La funzione esegue una chiamata fetch e restituisce un array di Track[]

#### - getPlaylist(id: string)

```typescript
() => Promise<Playlist>;
```

Ottiene i dettagli di una playlist specifica tramite ID

### - AlbumPage.ts

#### - getAlbum(id: string)

```typescript
() => Promise<Album>;
```

Ottiene i dettagli di un album specifico tramite il suo ID

### - ArtistPage.ts

#### - getArtistOverview(id: string)

```typescript
() => Promise<ArtistOverview>;
```

Recupera una panoramica di un artista specifico, inclusi i brani popolari, la discografia e gli artisti correlati

#### - getTrackDetails(id: string)

```typescript
() => Promise<Track>;
```

Ottiene i dettagli di un singolo brano tramite ID, utilizzato per ottenere l'URL di anteprima del brano per la riproduzione

### - searchPage.ts

#### - getSearchResult(query: string)

```typescript
() => Promise<SearchResult>;
```

Funzione asincrona che esegue una ricerca multipla su Spotify utilizzando una stringa di query fornita. Utilizza l'API di Spotify per cercare artisti, brani, album e playlist che corrispondono alla query di ricerca. La funzione restituisce un oggetto SearchResult che contiene i risultati della ricerca o null in caso di errore

## Autori

[TunaSandwichhh](https://github.com/TunaSandwichhh)
[Zaffirim](https://github.com/Zaffirim)
[smoulderpipe](https://github.com/smoulderpipe)
[marco-di-candia](https://github.com/marco-di-candia)
[PinnaElias](https://github.com/PinnaElias)
