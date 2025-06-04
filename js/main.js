document.getElementById("refrenceCurrency").addEventListener("change", async function () {
    let selectedUUID = this.value;
    await getData(selectedUUID);
});

async function getData(selectedUUID) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 0;
        const offset = (currentPage * 20);
        const timePeriod = urlParams.get('time') || '24h'; // Default to 24h if not specified
        let sorting = urlParams.get('sort') || 'desc'; // Default to ascending if not specified
        if (sorting === 'low-high') {
            sorting = 'asc';
        }
        console.log(`Fetching data for UUID: ${selectedUUID}, Time Period: ${timePeriod}, Sort: ${sorting}, Offset: ${offset}`);
        const url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=${selectedUUID}&timePeriod=${timePeriod}&orderBy=marketCap&orderDirection=${sorting}&limit=20&offset=${offset}`;
        const data = await fetchDataFromAPI(url); // Function should be defined in fetch.js
        const coinList = data.data.coins;
        const tbody = document.querySelector('#coins-table-body');
        tbody.innerHTML = ''; // Clear previous rows
        coinList.forEach((coin, index) => {
            const row = document.createElement('tr');
            const chartId = `sparkline-chart-${index}`;
            row.className = 'border border-gray-600 rounded-lg p-4';
            row.onclick = function () {
                window.location.href = `coindetail.html?id=${coin.uuid}`;
            };
            row.style = "cursor: pointer";

            row.innerHTML = `
                <td class="py-2 px-4 border-b">${coin.name} (${coin.symbol})</td>
                <td class="py-2 px-4 border-b">
                    <img src="${coin.iconUrl}" alt="${coin.name}" class="w-6 h-6 inline-block mr-2">
                    $${parseFloat(coin.price).toFixed(4)}
                </td>
                <td class="py-2 px-4 border-b ${coin.change > 0 ? 'text-green-600' : 'text-red-600'}">
                    ${coin.change}%
                </td>
                <td class="py-2 px-4 border-b">$${formatNumber(coin.marketCap)}</td>
                <td class="py-2 px-4 border-b">$${formatNumber(coin['24hVolume'])}</td>
                <td class="py-2 px-4 border-b">
                    <canvas id="${chartId}" width="100" height="40"></canvas>
                </td>
            `;
            tbody.appendChild(row);
            if (coin.sparkline && Array.isArray(coin.sparkline)) {
                const sparklineData = coin.sparkline.map(val => val ? parseFloat(val) : null);
                drawSparkline(chartId, sparklineData, coin.color || '#3b82f6');
            }
        });
    } 
    catch (error) {
        console.error("Error fetching data:", error);
    }
}


//pagination

function drawSparkline(canvasId, dataPoints, lineColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map((_, i) => i),
            datasets: [{
                data: dataPoints,
                borderColor: lineColor,
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0.4
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

function formatNumber(num) {
    if (!num) return '-';
    return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// Initial load
getData("yhjMzLPhuIDl"); // Default: USD
function timeDetail(){
        const timeDropdowns = document.querySelectorAll('.time-btn');
        timeDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function () {
                const selectedPage = this.value;
                // Update URL with ?timePeriod=selectedPage
                const url = new URL(window.location);
                url.searchParams.set('time', selectedPage);
                window.location.href = url.toString(); // navigate to updated URL
            });
        });
    
}
timeDetail();


function highlow(){
        const highlow = document.querySelectorAll('.highlow-btn');
        highlow.forEach(dropdown => {
            dropdown.addEventListener('change', function () {
                const selectedPage = this.value;
                // Update URL with ?timePeriod=selectedPage
                const url = new URL(window.location);
                url.searchParams.set('sort', selectedPage);
                window.location.href = url.toString(); // navigate to updated URL
            });
        });
    
}
highlow();

function price(){
        const price = document.querySelectorAll('.price-btn');
        price.forEach(dropdown => {
            dropdown.addEventListener('change', function () {
                const selectedPage = this.value;
                // Update URL with ?timePeriod=selectedPage
                const url = new URL(window.location);
                url.searchParams.set('price', selectedPage);
                window.location.href = url.toString(); // navigate to updated URL
            });
        });
    
}
price();

