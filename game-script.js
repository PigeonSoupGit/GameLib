// Get the game number from the URL
const urlParts = window.location.pathname.split("/");
const filename = urlParts[urlParts.length - 1];
const gameNumber = filename.replace("Game", "").replace(".html", "");

// Fetch the game data from the Google Sheets link
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLbWKalCA797IkK5AI47tXvjqmSWf5AslOpYey4ck9oXGvkLXG8lQ0ibii-XQCldr5BHclGt9mBmo_/pub?output=csv";
fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n");
    const games = {};
    rows.slice(1).forEach(row => {
      const rowData = row.split(",");
      const gameNum = rowData[0].replace(/"/g, '');  // Remove surrounding double quotes
      const gameName = rowData[1].replace(/"/g, ''); // Remove surrounding double quotes
      
      let gameDescription = rowData[2].replace(/(^"|"$)/g, ''); // Remove surrounding double quotes only if present
      if (rowData.length > 3) {
        // Combine additional columns if present
        for (let i = 3; i < rowData.length; i++) {
          gameDescription += `,${rowData[i]}`;
        }
        gameDescription = gameDescription.replace(/(^"|"$)/g, ''); // Remove surrounding double quotes again
      }
      
      games[gameNum] = { name: gameName, description: gameDescription };
    });

    // Get the game name and description from the games object
    const gameData = games[gameNumber] || { name: "Unknown Game", description: "No description available" };

    // Fill in the placeholders
    document.getElementById("game-id-placeholder").textContent = gameNumber;
    document.getElementById("game-id-placeholder-table").textContent = gameNumber;
    document.getElementById("game-name-placeholder").textContent = gameData.name;
    document.getElementById("game-name-placeholder-table").textContent = gameData.name;
    document.getElementById("game-description").textContent = gameData.description;
  });
