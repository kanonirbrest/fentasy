export const findMaxGameNumber = (data) => {
  let maxGameNumber = 0;

  for (const player in data) {
    if (Object.prototype.hasOwnProperty.call(data, player)) {
      data[player].forEach((game) => {
        if (game.gameNumber > maxGameNumber) {
          maxGameNumber = game.gameNumber;
        }
      });
    }
  }

  return maxGameNumber;
};
export const fillArray = (n) => {
  // Use Array.from to create an array of length n and fill it with numbers from 1 to n
  return Array.from({ length: n }, (_, i) => i + 1);
};

export const extractIdsFromUrl = (url) => {
  // Define the regular expression to match the tournamentid and gameid
  const regex = /\/tournaments\/(\d+)\/games\/(\d+)/;

  // Execute the regular expression on the URL
  const match = url.match(regex);

  // If a match is found, extract the tournamentid and gameid
  if (match) {
    const tournamentId = match[1];
    const gameId = match[2];
    return { tournamentId, gameId };
  } else {
    // If no match is found, return null or an appropriate error message
    return null;
  }
};
