function toggleFilterPanel() {
    var filterContainer = document.getElementById('filter-container');
    var filterPanel = document.getElementById('filterPanel');
  
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
      filterContainer.style.display = 'block';
      filterPanel.style.width = '300px'; // Możesz dostosować szerokość panelu, jak chcesz
    } else {
      filterContainer.style.display = 'none';
      filterPanel.style.width = '150px'; // Szerokość początkowa panelu
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
  