// Inicjalizacja bazy danych IndexedDB
var db;
var request = indexedDB.open('markersDB', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('markers', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;
};

request.onerror = function(event) {
  alert('Błąd podczas otwierania bazy danych IndexedDB.');
};

// Obsługa formularza
var markerForm = document.getElementById('marker-form');
function dodajMarker() {
    var placeName = document.getElementById('placeName').value;
    var address = document.getElementById('address').value;
    var category = document.getElementById('category').value;
    var coordinates = document.getElementById('coordinates').value;
    var imageURL = document.getElementById('imageURL').value;
  
    var markerData = {
      placeName: placeName,
      address: address,
      category: category,
      coordinates: coordinates,
      imageURL: imageURL
    };
  
    // Zapisz marker w bazie danych
    var transaction = db.transaction(['markers'], 'readwrite');
    var objectStore = transaction.objectStore('markers');
    var request = objectStore.add(markerData);
  
    request.onsuccess = function() {
      alert('Marker został dodany do bazy danych IndexedDB.');
    };
  
    // Wyczyść formularz
    markerForm.reset();
  }
  
