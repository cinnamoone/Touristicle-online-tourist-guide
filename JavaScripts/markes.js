

            var map = L.map('map').setView([50.0614300, 19.9365800], 15);
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);



              L.Control.geocoder().addTo(map);
              var parkIcon = L.icon({
                iconUrl: '../style/img/icons/park.png',
                iconSize: [40,40],
                 });

                 L.Control.geocoder().addTo(map);
              var infoIcon = L.icon({
                iconUrl: '../style/img/icons/info.png',
                iconSize: [40,40],
                 });

                 L.Control.geocoder().addTo(map);
              var restaurantIcon = L.icon({
                iconUrl: '../style/img/icons/restaurant.png',
                iconSize: [40,40],
                 });


                 var museumIcon = L.icon({
                    iconUrl: '../style/img/icons/museum.png',
                    iconSize: [40,40],
                     });
                   
                     var viewIcon = L.icon({
                        iconUrl: '../style/img/icons/view.png',
                        iconSize: [40,40],
                         });




              var markers = [
    L.marker([50.053555165158244, 19.848564721218292], {icon: parkIcon, category: 'park', title: 'Las Wolski' }),
    L.marker([50.0645817136116, 19.943452411089474], {icon: infoIcon, category: 'info', title: 'Punkt Informacji' }),
    L.marker([50.05282655584498, 19.904319897606957], {icon: museumIcon, category: 'museum', title: 'Muzeum C' }),
    L.marker([50.06205651582134, 19.937869678768998], {icon: museumIcon, category: 'museum', title: 'Rynek Podziemny' }),
    L.marker([50.06157439140573, 19.93736005904437], {icon: viewIcon, category: 'viewpoint', title: 'Sukiennice' }),
    L.marker([50.06277280600165, 19.938084255501], {icon: museumIcon, category: 'museum', title: 'Muzeum Bursztynu' }),
    L.marker([50.06031474322343, 19.941430219690446], {icon: parkIcon,  category: 'park', title: 'Planty' }),
    L.marker([50.061956647590286, 19.93674315095667],  {icon: viewIcon, category: 'viewpoint', title: 'Rynek główny' }),
    L.marker([50.06108881834254, 19.93938244469425], {icon: restaurantIcon, category: 'restaurant', title: 'Italiano Pizza and pasta' })
];
markers.forEach(marker => {
    switch (marker.options.title) {
        case 'Rynek Podziemny':
            marker.info = {
                zdjecie: '../style/img/imgHTML/podz.jpg',
                nazwa: "Rynek Podziemny",
                adres: 'Rynek Główny 1, 31-042 Kraków',
                ocena: 4.4,
                komentarze: ['Bardzo interesujące!', 'Warto odwiedzić.']
            };
            break;

        case 'Muzeum Bursztynu':
            marker.info = {
                zdjecie: '../style/img/imgHTML/bursztyn.jpg',
                nazwa: "Muzeum Bursztynu",
                adres: 'Świętego Jana 2, 31-018 Kraków',
                ocena: 4.5,
                komentarze: ['Piękne widoki!', 'Wspaniałe miejsce.']
            };
            break;

            case 'Las Wolski':
            marker.info = {
                zdjecie: '../style/img/imgHTML/laswolski.jpg',
                nazwa: "Las Wolski",
                adres: 'Kraków',
                ocena: 4.5,
                komentarze: ['Piękne widoki!', 'Wspaniałe miejsce.']
            };
            break;

            case 'Rynek główny':
            marker.info = {
                zdjecie: '../style/img/imgHTML/rynekgl.jpg',
                nazwa: "Rynek Głowny",
                adres: 'Rynek Główny, 31-422 Kraków',
                ocena: 4.5,
                komentarze: ['Piękne widoki!', 'Wspaniałe miejsce.']
            };
            break;

            case 'Sukiennice':
            marker.info = {
                zdjecie: '../style/img/imgHTML/sukiennice.jpg',
                nazwa: "Sukiennice",
                adres: 'Rynek Główny 1/3, 31-042 Kraków',
                ocena: 4.5,
                komentarze: ['Piękne widoki!', 'Wspaniałe miejsce.']
            };
            break;

            case 'Italiano Pizza and pasta':
            marker.info = {
                zdjecie: '../style/img/imgHTML/italiano.jpg',
                nazwa: "Italiano Pizza and pasta",
                adres: 'Sienna 6, 31-041 Kraków',
                ocena: 4.5,
                komentarze: ['Super jedzenie!', 'Pyszna pizza :)']
            };
            break;

            case 'Punkt Informacji':
            marker.info = {
                zdjecie: '../style/img/imgHTML/info.jpg',
                nazwa: "Punkt Informacji Miejskiej - InfoKraków",
                adres: 'Szpitalna 25, 31-024 Kraków',
                ocena: 4.1,
                komentarze: ['Pomocne panie', 'Długie kolejki']
            };
            break;

            case 'Planty':
            marker.info = {
                zdjecie: '../style/img/imgHTML/planty.jpg',
                nazwa: "Planty",
                adres: '31-041 Kraków',
                ocena: 4.5,
                komentarze: ['Urokliwy park', 'Przyjemny spacerke']
            };
            break;

        // markery zostaną jeszcze dodane

        default:
            // domyślna obsługa jeśli tytuł nie pasuje do żadnego przypadku
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
    var viewChecked = document.getElementById('viewCheckbox').checked;
    var nmChecked = document.getElementById('nmCheckbox').checked;
    var funChecked = document.getElementById('funCheckbox').checked;
    var parkChecked = document.getElementById('parkCheckbox').checked;
    
    var infoChecked = document.getElementById('infoCheckbox').checked;
    var atmsChecked = document.getElementById('atmsCheckbox').checked;
    var wcChecked = document.getElementById('wcCheckbox').checked;
    var restaurantCheckedd = document.getElementById('restaurantCheckbox').checked;
    var barChecked = document.getElementById('barCheckbox').checked;

    markersLayer.clearLayers();

    markers.forEach(function(marker) {
        if ((museumChecked && marker.options.category === 'museum') ||
            (viewChecked && marker.options.category === 'viewpoint') || 
            (nmChecked && marker.options.category === 'natureMonument') ||
            (funChecked && marker.options.category === 'fun') ||
            (parkChecked && marker.options.category === 'park') ||

            (infoChecked && marker.options.category === 'info') ||
            (atmsChecked && marker.options.category === 'atms') ||
            (wcChecked  && marker.options.category === 'wc') ||
            (restaurantCheckedd && marker.options.category === 'restaurant') ||
            (barChecked && marker.options.category === 'bar')

            
            )   {
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

// dodaj nowy kontener do przechowywania informacji
var infoContainer = L.control({ position: 'bottomleft' });

infoContainer.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-container'); 
    this.update();
    return this._div;
};

// aktualizacja zawartości kontenera na podstawie informacji o zaznaczonym miejscu
infoContainer.update = function (info) {
    this._div.innerHTML = '<h4>Informacje o miejscu</h4>';

    if (info) {
        this._div.innerHTML += `
            <p><strong></strong> <img src="${info.zdjecie}" alt="Zdjęcie"></p>
            <p><strong> ${info.nazwa}</strong></p>
            <p><strong>Adres:</strong> ${info.adres}</p>
            <p><strong>Ocena:</strong> ${generateRatingStars(info.ocena)}</p>
            <p><strong>Komentarze:</strong> ${info.komentarze.join('<br>')}</p>
            <span class="close-button" onclick="resetInfoContainer()">x</span>`;
    } else {
        this._div.innerHTML += 'Kliknij na marker, aby zobaczyć informacje.';
    }
};



infoContainer.addTo(map);

// obsługa kliknięcia na markerze
markers.forEach(marker => {
    marker.on('click', function () {
        infoContainer.update(marker.info);
    });
});

// funkcja do zresetowania informacji na panelu bocznym
function resetInfoContainer() {
    infoContainer.update();
}
function generateRatingStars(rating) {
    const stars = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating)) +
                  (rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : '');
    return `<div class="rating-stars">${stars}</div>`;
}