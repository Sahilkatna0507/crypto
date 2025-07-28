

// document.addEventListener('DOMContentLoaded', function() {
//     // Dummy data
//     const dummyData = {
//         totalCoins: 5000,
//         marketCap: "$1.5T",
//         volume: "$100B",
//         btcDominance: "45%",
//         topCoins: ["Bitcoin", "Ethereum", "Ripple"],
//         trendingCoins: ["Dogecoin", "Cardano", "Polkadot"],
//         favoriteCoins: ["Litecoin", "Chainlink", "Stellar"]
//     };

//     // Update the DOM with dummy data
//     document.getElementById('total-coins').textContent = dummyData.totalCoins;
//     document.getElementById('market-cap').textContent = dummyData.marketCap;
//     document.getElementById('volume').textContent = dummyData.volume;
//     document.getElementById('btc-dominance').textContent = dummyData.btcDominance;

//     const coinsContainer = document.getElementById('coins-container');
//     dummyData.topCoins.forEach(coin => {
//         const li = document.createElement('li');
//         li.textContent = coin;
//         coinsContainer.appendChild(li);
//     });

//     const trendingCoins = document.getElementById('trending-coins');
//     dummyData.trendingCoins.forEach(coin => {
//         const li = document.createElement('li');
//         li.textContent = coin;
//         trendingCoins.appendChild(li);
//     });

//     const favoritesCoins = document.getElementById('favorites-coins');
//     dummyData.favoriteCoins.forEach(coin => {
//         const li = document.createElement('li');
//         li.textContent = coin;
//         favoritesCoins.appendChild(li);
//     });

//     // Dummy data for coins table
//     const dummyCoinsTableData = [
//         {
//             uuid: "1",
//             name: "Bitcoin",
//             symbol: "BTC",
//             price: 45000,
//             change: 2.5,
//             marketCap: 850000000000,
//             "24hVolume": 35000000000,
//             sparkline: [44000, 44500, 45000],
//             iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014",
//         },
//         {
//             uuid: "2",
//             name: "Ethereum",
//             symbol: "ETH",
//             price: 31000,
//             change: -1.2,
//             marketCap: 350000000000,
//             "24hVolume": 15000000000,
//             sparkline: [2900, 2950, 3000],
//             iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=014",
//         },
//     ];

//     // Function to render coins table
//     // function renderCoinsTable(coins) {
//     //     const tableContainer = document.getElementById('coins-table-container');
//     //     let tableHTML = `
//     //         <table class="min-w-full bg-white">
//     //             <thead>
//     //                 <tr>
//     //                     <th class="py-2 px-4 border-b">Name</th>
//     //                     <th class="py-2 px-4 border-b">Price</th>
//     //                     <th class="py-2 px-4 border-b">Change</th>
//     //                     <th class="py-2 px-4 border-b">Market Cap</th>
//     //                     <th class="py-2 px-4 border-b">Volume (24h)</th>
//     //                     <th class="py-2 px-4 border-b">Chart</th>
//     //                 </tr>
//     //             </thead>
//     //             <tbody>
//     //     `;

//     //     coins.forEach(coin => {
//     //         tableHTML += `
//     //             <tr class="hover:bg-gray-100 cursor-pointer">
//     //                 <td class="py-2 px-4 border-b">
//     //                     <div class="flex items-center">
//     //                         <img src="${coin.iconUrl}" alt="${coin.name}" class="w-8 h-8 mr-2">
//     //                         <div>
//     //                             <p class="text-sm font-semibold">${coin.name}</p>
//     //                             <p class="text-sm text-gray-600">${coin.symbol}</p>
//     //                         </div>
//     //                     </div>
//     //                 </td>
//     //                 <td class="py-2 px-4 border-b">${coin.price}</td>
//     //                 <td class="py-2 px-4 border-b">
//     //                     <span class="${coin.change > 0 ? 'text-green-500' : 'text-red-500'}">${coin.change}%</span>
//     //                 </td>
//     //                 <td class="py-2 px-4 border-b">${coin.marketCap}</td>
//     //                 <td class="py-2 px-4 border-b">${coin["24hVolume"]}</td>
//     //                 <td class="py-2 px-4 border-b">
//     //                     <!-- Dummy chart representation -->
//     //                     <div class="w-20 h-10 bg-gray-200"></div>
//     //                 </td>
//     //             </tr>
//     //         `;\
//     //     });

//     //     tableHTML += `
//     //             </tbody>
//     //         </table>
//     //     `;

//     //     tableContainer.innerHTML = tableHTML;
//     // }

//     // Render the coins table with dummy data
//     renderCoinsTable(dummyCoinsTableData);
// });