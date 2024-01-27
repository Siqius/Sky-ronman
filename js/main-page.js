const input = document.querySelector('#input');
const button = document.querySelector('#searchButton');
async function fetchData(fetchUrl, sendMethod ,objectToSend) {
  try {
      let response = await fetch(fetchUrl, {
          method: sendMethod,
          body: objectToSend === "null" ? null : JSON.stringify(objectToSend),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      let result = await response.json();
      return result.uuid;

  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

async function searchForPlayer() {
  const playerName = input.value;
  const mojangURL = `https://api.ashcon.app/mojang/v2/user/${playerName}`;
  const playerUUID = await fetchData(mojangURL, 'GET', "null");
  console.log(playerUUID);
}