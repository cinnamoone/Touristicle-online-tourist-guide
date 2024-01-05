document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const sortSelect = document.getElementById("sort");
    const rankingList = document.getElementById("ranking-list");

    // Pobierz dane z pliku JSON (zakładając, że jest to plik "data.json")
    fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {
            // Wyświetl listę na stronie
            displayRanking(data);

            // Dodaj obsługę zmiany kategorii i sortowania
            categoryFilter.addEventListener("change", () => {
                displayRanking(data);
            });

            sortSelect.addEventListener("change", () => {
                displayRanking(data);
            });
        })
        .catch(error => console.error(error));

    // Funkcja do wyświetlania listy z filtrowaniem i sortowaniem
    function displayRanking(data) {
        const selectedCategory = categoryFilter.value;
        const sortOption = sortSelect.value;

        // Filtrowanie i sortowanie danych
        const filteredData = data.filter(item => selectedCategory === "all" || item.category === selectedCategory);
        const sortedData = sortOption === "highest"
            ? filteredData.sort((a, b) => b.info.ocena - a.info.ocena)
            : filteredData.sort((a, b) => a.info.ocena - b.info.ocena);

        // Wyczyść listę przed dodaniem nowych elementów
        rankingList.innerHTML = "";

        // Wyświetl dane na liście
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