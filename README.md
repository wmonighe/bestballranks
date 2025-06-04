# Best Ball Rankings

This repository contains a simple web page that pulls fantasy football rankings
and sentiment scores from a Google Spreadsheet. The data is loaded directly in
the browser and displayed in a table.

## Usage

Open `index.html` in a modern web browser. The page will fetch data from the
public spreadsheet and populate the table with the following columns. Above the
table are slider controls that let you adjust the weighting of each metric when
calculating the **Rating** value. Move the sliders and click **Update** to
recompute ratings.

- **Rating** (weighted combination of wmonighe, ADP, fantasy points and sentiment percentiles)
- **Player**
- **Team**
- **Position**
- **ADP** (column J of the `Rankings` sheet, with percentile from column L of that sheet appended in parentheses)
- **wmonighe Rank** (column G of the `Rankings` sheet)
- **Fantasy Points** (column I of the `Rankings` sheet, with the computed fantasy point percentile appended in parentheses as a decimal between 0 and 1)
- **Sentiment** (from column F of the `Sentiment` sheet, with the computed
  sentiment percentile appended in parentheses as a decimal between 0 and 1)

Note: values shown in parentheses represent the percentile rank for that metric.

The spreadsheet ID and sheet names are configured directly in `index.html`.

### Player Headshots

Headshots are loaded from Sportradar's Getty Images API. The page downloads the
player manifest XML once on load and stores a mapping from player name to image
URL in memory. When building the table, each player's name is preceded by their
headshot image if available. A small default image is used if the manifest does
not contain a match.

The manifest is fetched from the following endpoint:

```
https://api.sportradar.us/nfl-images-t3/getty/headshots/players/manifest.xml?api_key=e2f66p2fmb5ndn539cf6f2yc
```

No additional setup is required.

