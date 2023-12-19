

            var map = L.map('map').setView([50.0614300, 19.9365800], 15);
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
              L.Control.geocoder().addTo(map);


              var markers = [
    L.marker([50.053555165158244, 19.848564721218292], { category: 'museum', title: 'Muzeum A' }),
    L.marker([50.057731118068396, 19.884149685348152], { category: 'viewpoint', title: 'Punkt widokowy B' }),
    L.marker([50.05282655584498, 19.904319897606957], { category: 'museum', title: 'Muzeum C' }),
    L.marker([50.06205651582134, 19.937869678768998], { category: 'museum', title: 'Rynek Podziemny' }),
    L.marker([50.06157439140573, 19.93736005904437], { category: 'viewpoint', title: 'Sukiennice' }),
    L.marker([50.06277280600165, 19.938084255501], { category: 'museum', title: 'Muzeum Bursztynu' }),
    L.marker([50.053555165158244, 19.848564721218292], { category: 'museum', title: 'Muzeum A' }),
    L.marker([50.061956647590286, 19.93674315095667], { category: 'viewpoint', title: 'Rynek główny' }),
    L.marker([50.06108881834254, 19.93938244469425], { category: 'restaurant', title: 'Italiano Pizza and pasta' })
];
markers.forEach(marker => {
    switch (marker.options.title) {
        case 'Muzeum A':
            marker.info = {
                zdjecie: 'laswolski.jpg',
                adres: 'Kraków',
                ocena: 4.4,
                komentarze: ['Bardzo interesujące!', 'Warto odwiedzić.']
            };
            break;

        case 'Punkt widokowy B':
            marker.info = {
                zdjecie: 'zdj.jpg',
                adres: 'ul. Widokowa 2, Miasto B',
                ocena: 4.5,
                komentarze: ['Piękne widoki!', 'Wspaniałe miejsce.']
            };
            break;

        // Dodaj obsługę dla pozostałych markerów
        // ...

        default:
            // Domyślna obsługa, jeśli tytuł nie pasuje do żadnego przypadku
            break;
    }
});

var markersLayer = L.layerGroup(markers).addTo(map);
var filterContainer = document.getElementById('filter-container');

var customControl = L.Control.extend({
    options: {
      position: 'topleft'
    },

    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      container.innerHTML = '<button class="custom-button" onclick="toggleFilterPanel()">Filtruj</button>';
      return container;
    }
  });

  map.addControl(new customControl());

function toggleFilterPanel() {
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
        filterContainer.style.display = 'block';
    } else {
        filterContainer.style.display = 'none';
    }
}
function filterMarkers() {
    var museumChecked = document.getElementById('museumCheckbox').checked;
    var viewpointChecked = document.getElementById('viewpointCheckbox').checked;
    var restaurantChecked = document.getElementById('restaurantCheckbox').checked;
    var viewpointChecked = document.getElementById('viewpointCheckbox').checked;

    markersLayer.clearLayers();

    markers.forEach(function(marker) {
        if ((museumChecked && marker.options.category === 'museum') ||
            (viewpointChecked && marker.options.category === 'viewpoint') || (restaurantChecked && marker.options.category === 'restaurant'))   {
            markersLayer.addLayer(marker);
        }
    });
}

function resetMarkers() {
    markersLayer.clearLayers();
    markers.forEach(function(marker) {
        markersLayer.addLayer(marker);
    });
}

// Dodaj nowy kontener do przechowywania informacji
var infoContainer = L.control({ position: 'bottomleft' });

infoContainer.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-container'); // utwórz nowy kontener div z klasą "info-container"
    this.update();
    return this._div;
};

// Aktualizuj zawartość kontenera na podstawie informacji o zaznaczonym miejscu
infoContainer.update = function (info) {
    this._div.innerHTML = '<h4>Informacje o miejscu</h4>';

    if (info) {
        this._div.innerHTML += `
            <p><strong>Zdjęcie:</strong> <img src="${info.zdjecie}" alt="Zdjęcie"></p>
            <p><strong>Adres:</strong> ${info.adres}</p>
            <p><strong>Ocena:</strong> ${generateRatingStars(info.ocena)}</p>
            <p><strong>Komentarze:</strong> ${info.komentarze.join('<br>')}</p>
            <span class="close-button" onclick="resetInfoContainer()">x</span>`;
    } else {
        this._div.innerHTML += 'Kliknij na marker, aby zobaczyć informacje.';
    }
};


// Dodaj kontener do mapy
infoContainer.addTo(map);

// Obsługa kliknięcia na markerze
markers.forEach(marker => {
    marker.on('click', function () {
        infoContainer.update(marker.info);
    });
});

// Funkcja do zresetowania informacji na panelu bocznym
function resetInfoContainer() {
    infoContainer.update();
}
function generateRatingStars(rating) {
    const stars = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating)) +
                  (rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : '');
    return `<div class="rating-stars">${stars}</div>`;
}