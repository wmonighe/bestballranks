# Best Ball Rankings

This repository contains a simple web page that pulls fantasy football rankings
and sentiment scores from a Google Spreadsheet. The data is loaded directly in
the browser and displayed in a table.

## Usage

Open `index.html` in a modern web browser. The page will fetch data from the
public spreadsheet and populate the table with the following columns:

- **Ranking**
- **Position**
- **Team**
- **Player**
- **Sentiment** (from column F of the `Sentiment` sheet)

The spreadsheet ID and sheet names are configured directly in `index.html`.

### Unabated API

Player headshots are loaded from the Unabated API. A `config.js` file is
included with the repository and already contains the API key needed to connect
to the service. The page fetches player data for Major League Baseball (league
ID `5`) so that headshot URLs can be matched to the rankings:

```javascript
// config.js
const UNABATED_API_KEY = 'fwe8yfew80f9wyhb';
```

No additional setup is required. Simply open the page and it will fetch
headshots using this key. If you wish to pull a different sport, edit
`LEAGUE_ID` in `index.html`.

If a headshot is available from Unabated, the Player column will display the
image directly in front of the player's name.

