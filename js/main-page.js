const input = document.querySelector('#input');
const button = document.querySelector('#searchButton');
async function fetchData(fetchUrl, sendMethod) {
  try {
      let response = await fetch(fetchUrl, {
          method: sendMethod,
          
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      let result = await response.json();
      return result;

  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

async function searchForPlayer() {
  const playerName = input.value;
  const mojangURL = `https://api.ashcon.app/mojang/v2/user/${playerName}`;
  const playerUUID = await fetchData(mojangURL, 'GET');
  console.log(playerUUID.uuid)
  
  let playerInfo = await fetchData("https://api.hypixel.net/v2/skyblock/profiles?uuid=" + playerUUID.uuid + "&key=2d65dd58-a376-4852-bbdb-5957d2d0d1c6", 'GET');
  playerInfo = playerInfo.profiles;
  let ironmanProfiles = [];
  for(let i = 0;i<playerInfo.length; i++) {
    if(playerInfo[i].game_mode == "ironman") {
      ironmanProfiles.push(playerInfo[i]);
    }
  }
  if(ironmanProfiles.length == 0) {
    document.getElementById("ironmanProfiles").innerHTML = "No Ironman Profiles Found";
    return;
  }
}