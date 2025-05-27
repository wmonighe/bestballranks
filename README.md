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
- **Sentiment** (from column H of the `Rankings` sheet)

The spreadsheet ID and sheet names are configured directly in `index.html`.
