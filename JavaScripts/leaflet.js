
/*
//customowe ikony
var treeIcon = L.icon({
    iconUrl: 'https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png',
    iconSize: [38,70],
    
});
var churchIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3891/3891873.png',
    iconSize: [38,70],
    
});

L.marker([50.053555165158244, 19.848564721218292], {icon: treeIcon}).addTo(map)
.bindPopup('Las Wolski');

L.marker([50.05467807987789, 19.848382344298596], {icon: churchIcon}).addTo(map)
.bindPopup('Kapliczka');


var map = L.map('map').setView([50.0614300, 19.9365800], 15);
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.Control.geocoder().addTo(map);*/


  document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return
  
    let currentDropdown
    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle("active")
    }
  
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
  })