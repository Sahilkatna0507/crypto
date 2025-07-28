  const apiKey ='ddc77ba17dmsh9757b4165dd8a04p179b34jsndb3e9fbbea77'
  const apiHost = 'coinranking1.p.rapidapi.com';
  const apiUrl = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=20&offset=0';
const openModalBtn = document.getElementById('openModalBtn'); 
const closeModalBtn = document.getElementById('closeModalBtn'); 
const searchModal = document.getElementById('searchModal'); 
const searchInput = document.getElementById('searchInput'); 
const resultsContainer = document.getElementById('resultsContainer'); 
openModalBtn.addEventListener('click', () => {
  searchModal.style.display = 'flex';
});
closeModalBtn.addEventListener('click', () => {
  searchModal.style.display = 'none'; 
  searchInput.value = ''; 
  resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">Type at least 2 characters to search.</p>';
});
async function fetchGames() {
  const response = await fetch(apiUrl, {
    headers: {
      'X-RapidAPI-Key': apiKey, 
      'X-RapidAPI-Host': apiHost 
    }
  });
  return await response.json(); 
}

function handleSearch(games, query) {
  const data= games.data; 
  const coins= data.coins;
    console.log("games:", data);
  return coins.filter(game => {
     console.error("games.coins i or not an array");
    const nameMatch = game.name.toLowerCase().includes(query);
    const symbolMatch = game.symbol.toLowerCase().includes(query);
    return nameMatch || symbolMatch;
  });
}

function renderResults(games) {
  if (games.length === 0) { 
    resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">No results found.</p>'; 
    return;
  }

  resultsContainer.innerHTML = '';
  games.forEach(game => { 
    const gameItem = document.createElement('div'); 
    gameItem.className = 'game-item'; 
    gameItem.innerHTML = `
      <div class="info">
        <h4>${game.name}</h4>
        <p>${game.price}</p>
      </div>
    `;
    resultsContainer.appendChild(gameItem); 
  });
}
let gamesData = []; 
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim().toLowerCase(); 
  if (query.length < 2) {
    resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">Type at least 2 characters to search.</p>'; 
    return;
  }
  if (gamesData.length === 0) {
    gamesData = await fetchGames();
  }
  const filteredGames = handleSearch(gamesData, query); 
  renderResults(filteredGames);
});