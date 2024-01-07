document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const cityFilter = document.getElementById("city-filter"); // City filter element
    const sortSelect = document.getElementById("sort");
    const rankingList = document.getElementById("ranking-list");

    // Fetch data from JSON file
    fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {
            displayRanking(data);

            categoryFilter.addEventListener("change", () => {
                displayRanking(data);
            });

            cityFilter.addEventListener("change", () => {
                displayRanking(data);
            });

            sortSelect.addEventListener("change", () => {
                displayRanking(data);
            });
        })
        .catch(error => console.error(error));

    function displayRanking(data) {
        const selectedCategory = categoryFilter.value;
        const selectedCity = cityFilter.value; // City filter value
        const sortOption = sortSelect.value;

        // Apply category filter
        let filteredData = data.filter(item => selectedCategory === "all" || item.category === selectedCategory);

        // Apply city filter
        if (selectedCity !== "all") {
            filteredData = filteredData.filter(item => {
                if (item.info && item.info.adres) {
                    const addressParts = item.info.adres.split(',');
                    const city = addressParts[addressParts.length - 1].trim(); // Get the last part of the address
                    return city.includes(selectedCity);
                }
                return false;
            });
        }

        // Sorting logic
        const sortedData = sortOption === "highest"
            ? filteredData.sort((a, b) => b.info.ocena - a.info.ocena)
            : filteredData.sort((a, b) => a.info.ocena - b.info.ocena);

        rankingList.innerHTML = "";

        // Display sorted and filtered data
        sortedData.forEach(item => {
            const listItem = document.createElement("li");
            const itemImage = document.createElement("img");
            itemImage.src = item.info.zdjecie;
            itemImage.alt = item.title;

            const itemName = document.createElement("h3");
            itemName.textContent = item.title;

            const itemRating = document.createElement("p");
            itemRating.textContent = `Ocena: ${item.info.ocena}`;

            listItem.appendChild(itemImage);
            listItem.appendChild(itemName);
            listItem.appendChild(itemRating);
            rankingList.appendChild(listItem);
        });
    }
});
