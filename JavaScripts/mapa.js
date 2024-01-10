
//panel filtrowania
function toggleFilterPanel() {
    var filterContainer = document.getElementById('filter-container');
    var filterPanel = document.getElementById('filterPanel');
  
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
      filterContainer.style.display = 'block';
      filterPanel.style.width = '300px'; 
    } else {
      filterContainer.style.display = 'none';
      filterPanel.style.width = '150px'; 
    }
  }
  
  function resetMarkers() {
    markersLayer.clearLayers();
    markers.forEach(function(marker) {
        markersLayer.addLayer(marker);
    });
}
  