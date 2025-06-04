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
      'X-RapidAPI-Key': apiKey, // API key ka use karna
      'X-RapidAPI-Host': apiHost // API host set karna
    }
  });
  return await response.json(); // JSON response ko return karna
}

// Input query ke basis par games ko filter karna
// function handleSearch(games, query) {
//   // console.log(games);
//   console.log("Filtering games...");
// return games.coins.filter(game => {
//   console.log(game);
//     const titleMatch = game.title.toLowerCase().includes(query); // Title me match check karna
//     const genreMatch = game.genre.toLowerCase().includes(query); // Genre me match check karna
//     const platformMatch = game.platform.toLowerCase().includes(query); // Platform me match check karna
//     return titleMatch || genreMatch || platformMatch; // Agar koi bhi match ho to return karna
//   });
// }
function handleSearch(games, query) {
  const data= games.data; // Games data ko access karna
  const coins= data.coins; // Coins array ko access karna
    console.log("games:", data);
  return coins.filter(game => {
     console.error("games.coins i or not an array");
    const nameMatch = game.name.toLowerCase().includes(query);
    const symbolMatch = game.symbol.toLowerCase().includes(query);
    return nameMatch || symbolMatch;
  });
}

// Filtered results ko render karne ke liye function
function renderResults(games) {
  if (games.length === 0) { // Agar koi result na ho
    resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">No results found.</p>'; // No result message show karna
    return;
  }

  resultsContainer.innerHTML = ''; // Pehle se existing content ko clear karna
  games.forEach(game => { // Har ek game ke liye
    const gameItem = document.createElement('div'); // Ek naya div create karna
    gameItem.className = 'game-item'; // Class set karna
    gameItem.innerHTML = `
      <div class="info">
        <h4>${game.name}</h4>
        <p>${game.price}</p>
      </div>
    `; // Game ke details HTML me add karna
    resultsContainer.appendChild(gameItem); // Result container me add karna
  });
}

// Search input ke changes handle karne ke liye event listener
let gamesData = []; // Games data ko cache karne ke liye variable
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim().toLowerCase(); // User input ko lowercase me convert karna
  if (query.length < 2) { // Agar input 2 characters se kam ho
    resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">Type at least 2 characters to search.</p>'; // Default message show karna
    return;
  }

  if (gamesData.length === 0) { // Agar games data load na hua ho
    gamesData = await fetchGames(); // API se games ko fetch karna
  }

  const filteredGames = handleSearch(gamesData, query); // Filtered results ko fetch karna
  renderResults(filteredGames); // Filtered results ko render karna
});