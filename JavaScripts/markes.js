    
            var map = L.map('map').setView([50.0614300, 19.9365800], 15);
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
              L.Control.geocoder().addTo(map);


              var markers = [
    L.marker([50.053555165158244, 19.848564721218292], { category: 'museum', title: 'Muzeum A' }),
    L.marker([50.057731118068396, 19.884149685348152], { category: 'viewpoint', title: 'Punkt widokowy B' }),
    L.marker([50.05282655584498, 19.904319897606957], { category: 'museum', title: 'Muzeum C' })
];

var markersLayer = L.layerGroup(markers).addTo(map);

function filterMarkers() {
    var museumChecked = document.getElementById('museumCheckbox').checked;
    var viewpointChecked = document.getElementById('viewpointCheckbox').checked;

    markersLayer.clearLayers();

    markers.forEach(function(marker) {
        if ((museumChecked && marker.options.category === 'museum') ||
            (viewpointChecked && marker.options.category === 'viewpoint')) {
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