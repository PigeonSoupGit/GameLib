  // Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameNumber = urlParams.get("gameNumber");

// Fetch the game data from the Google Sheets link
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLbWKalCA797IkK5AI47tXvjqmSWf5AslOpYey4ck9oXGvkLXG8lQ0ibii-XQCldr5BHclGt9mBmo_/pub?gid=0&single=true&output=csv"; // Replace with your published CSV link
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
  