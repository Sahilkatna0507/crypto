document.getElementById("refrenceCurrency").addEventListener("change", async function () {
    console.log("ddd");
    let selectedUUID = this.value;
    await stats(selectedUUID);
});

async function stats(selectedUUID) {
    try {
        console.log("hhh")
        const url = 'https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl';
        const data = await fetchDataFromAPI(url); // Function should be defined in fetch.js
        const btcDominance = data.data.btcDominance;
        const totalvolume = data.data.total24hVolume;
        const totlamarket = data.data.totalMarketCap;
        const trndingcoin=data.data.bestCoins;
        const newestCoins = data.data.newestCoins;
        const market = document.querySelector("#market-cap");
        const total = document.querySelector("#volume");
        const btc = document.querySelector('#btc-dominance');
        market.innerHTML = totlamarket;
        btc.innerHTML = btcDominance; // Clear previous rows
        total.innerHTML = totalvolume;
        //NEW COINS
        const trending = document.querySelector("#trending-coins ");
        trending.innerHTML="";
        trndingcoin.forEach(coin => {
               const row = document.createElement('ul');
            row.innerHTML = `
                <li>
                 <img src="${coin.iconUrl}" alt="${coin.name} logo" class="w-20 h-20 object-contain" />

                </li>
                <li class="">${coin.name}</li>  `;
            trending.appendChild(row);
        });
//newOINS
         const newCoin = document.querySelector("#favorites-coins");
        newCoin.innerHTML="";
        newestCoins.forEach(coin => {
               const row = document.createElement('ul');
            row.innerHTML = `
                <li>
                 <img src="${coin.iconUrl}" alt="${coin.name} logo" class="w-20 h-20 object-contain" />

                </li>
                <li class="">${coin.name}</li>  `;
            newCoin.appendChild(row);
        });

    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
stats();