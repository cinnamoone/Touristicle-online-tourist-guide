//ranking
let displayedRecords = 10;

document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const cityFilter = document.getElementById("city-filter"); 
    const sortSelect = document.getElementById("sort");
    const rankingList = document.getElementById("ranking-list");

    // pobieranie danych z pliku json
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
            const selectedCity = cityFilter.value;
            const sortOption = sortSelect.value;
        
            let filteredData = data.filter(item => selectedCategory === "all" || item.category === selectedCategory);
        
            if (selectedCity !== "all") {
                filteredData = filteredData.filter(item => {
                    if (item.info && item.info.adres) {
                        const addressParts = item.info.adres.split(',');
                        const city = addressParts[addressParts.length - 1].trim();
                        return city.includes(selectedCity);
                    }
                    return false;
                });
            }
        
            const sortedData = sortOption === "highest"
                ? filteredData.sort((a, b) => b.info.ocena - a.info.ocena)
                : filteredData.sort((a, b) => a.info.ocena - b.info.ocena);
        
            rankingList.innerHTML = "";
        
            for (let i = 0; i < Math.min(displayedRecords, sortedData.length); i++) {
                const item = sortedData[i];
        
                const listItem = document.createElement("li");
                const itemImage = document.createElement("img");
                itemImage.src = item.info.zdjecie;
                itemImage.alt = item.title;
        
                const itemName = document.createElement("h3");
                itemName.textContent = item.title;
        
                const itemAddress = document.createElement("p");
                itemAddress.textContent = `Adres: ${item.info.adres}`;
        
                const itemRating = document.createElement("p");
                itemRating.textContent = `Ocena: ${item.info.ocena}`;
        
                listItem.appendChild(itemImage);
                listItem.appendChild(itemName);
                listItem.appendChild(itemAddress);
                listItem.appendChild(itemRating);
                rankingList.appendChild(listItem);
            }
        
            if (displayedRecords < sortedData.length) {
                const showMoreButton = document.createElement("button");
                showMoreButton.textContent = "Pokaż więcej";
                showMoreButton.classList.add("show-more-button"); 
                showMoreButton.addEventListener("click", () => {
                    displayedRecords += 10;
                    displayRanking(data);
                });
                rankingList.appendChild(showMoreButton);
            }
            
        }
        
        
});


function toggleFilter() {
    var filterPanel = document.getElementById('filter');
    if (filterPanel.style.display === 'none') {
        filterPanel.style.display = 'block';
    } else {
        filterPanel.style.display = 'none';
    }
}
