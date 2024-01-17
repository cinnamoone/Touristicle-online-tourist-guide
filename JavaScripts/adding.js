var db;
var request = indexedDB.open('markersDB', 4);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('markers', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;
};

request.onerror = function(event) {
  console.log('Błąd podczas otwierania bazy danych IndexedDB.');
};

var markerForm = document.getElementById('marker-form');
function dodajMarker() {
  var placeName = document.getElementById('placeName').value;
  var address = document.getElementById('address').value;
  var category = document.getElementById('category').value;
  var coordinates = document.getElementById('coordinates').value;
  var imageURL = document.getElementById('imageURL').value;

  var isValid = true;
  if (category === "wybierz kategorię z listy") {
    document.getElementById('category-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('category-error').style.display = 'none';
  }
  if (!placeName) {
    document.getElementById('placeName-popup').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('placeName-popup').style.display = 'none';
  }

  if (!address) {
    document.getElementById('address-popup').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('address-popup').style.display = 'none';
  }

  if (!coordinates) {
    document.getElementById('coordinates-popup').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('coordinates-popup').style.display = 'none';
  }

  // ... sprawdzenie innych pól ...

  if (!isValid) {
    return;
  }
  // Sprawdzenie, czy wybrano kategorię
 

  var addedBy = checkLoggedInUser(); 

  var markerData = {
    placeName: placeName,
    address: address,
    category: category,
    coordinates: coordinates,
    imageURL: imageURL,
    addedBy: addedBy.username 
  };
  
  var transaction = db.transaction(['markers'], 'readwrite');
  var objectStore = transaction.objectStore('markers');
  var request = objectStore.add(markerData);

  request.onsuccess = function() {
    swal('Marker został dodany do bazy.');
  };

  markerForm.reset();
}

// Funkcja do wczytywania markerów dla danego użytkownika
function wczytajMarkeryDlaUzytkownika(nick) {
  var transaction = db.transaction(['markers'], 'readonly');
  var objectStore = transaction.objectStore('markers');
  var markers = [];

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      if (cursor.value.addedBy && cursor.value.addedBy.nick === nick) {
        markers.push(cursor.value);
      }
      cursor.continue();
    } else {
    }
  };
}
document.addEventListener('DOMContentLoaded', function() {
  var loggedInUser = checkLoggedInUser();
  var loginContainer = document.getElementById('login-container');
  var markerForm = document.getElementById('marker-form');

  if (loggedInUser) {
    
    markerForm.style.display = 'block';
    loginContainer.style.display = 'none';
  } else {
    
    markerForm.style.display = 'none';
    loginContainer.style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var map = L.map('map2').setView([50.0614300, 19.9365800], 15);
  var satLayer2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  
  L.Control.geocoder().addTo(map);

        var marker;

        map.on('click', function(e) {
            if (marker) {
                map.removeLayer(marker);
            }

            // pobranie współrzędnych z kliknięcia na mapie
            var coordinates = e.latlng;

            marker = L.marker(coordinates).addTo(map);

            document.getElementById('coordinates').value = coordinates.lat + ', ' + coordinates.lng;
        });
      
});

// Funkcja pomocnicza do pobierania informacji o zalogowanym użytkowniku z lokalnego magazynu
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}
