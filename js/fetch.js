   async function fetchDataFromAPI(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ddc77ba17dmsh9757b4165dd8a04p179b34jsndb3e9fbbea77',
		    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.querySelector('button');
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});

