// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameNumber = urlParams.get("gameNumber");

// Fetch the game data from the Google Sheets link
const sheetURL = "https://docs.google.com/spreadsheets/d/11Mkl0WLT1ae99ZjKNr_W2MEE-KSN9vmq3tZeG2imBy4/edit?usp=sharing";
fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n");
    const games = {};
    rows.slice(1).forEach(row => {
      const [gameNum, gameName] = row.split(",");
      games[gameNum] = gameName;
    });

    // Get the game name from the games object
    const gameName = games[gameNumber] || "Unknown Game";

    // Fill in the game name
    const gameNamePlaceholder = document.getElementById("game-name-placeholder");
    gameNamePlaceholder.textContent = gameName;
  });
