async function refrenceCurrency() {
    try {
        const url = `https://coinranking1.p.rapidapi.com/reference-currencies?limit=50&offset=0`;
        const data = await fetchDataFromAPI(url); // Function from fetch.js
        const refrenceCurrency = data.data.currencies;
        const refrenceCurrencyList = document.querySelector('#refrenceCurrency');
        const refrenceCurrencySet = new Set();
        refrenceCurrency.forEach(currency => {   
            const currencyName = currency.name;
            const currencySymbol = currency.symbol;
            const currencyUuid = currency.uuid;
            // console.log(currencyUuid);
            if(!refrenceCurrencySet.has(currencyUuid)){
                refrenceCurrencySet.add(currencyUuid);
                const option = document.createElement('option');
                option.value = currencyUuid;
                option.textContent = `${currencyName} (${currencySymbol})`;
                refrenceCurrencyList.appendChild(option);         
            }
        });
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
refrenceCurrency();


