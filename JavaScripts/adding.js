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

var markerForm = document.getElementById('marker-form');
function dodajMarker() {
  var placeName = document.getElementById('placeName').value;
  var address = document.getElementById('address').value;
  var category = document.getElementById('category').value;
  var coordinates = document.getElementById('coordinates').value;
  var imageURL = document.getElementById('imageURL').value;

  // Sprawdzenie, czy wybrano kategorię
  if (category === "wybierz kategorię z listy") {
      document.getElementById('category-error').style.display = 'block';
      return; // Zatrzymaj funkcję, jeśli kategoria nie została wybrana
  } else {
      document.getElementById('category-error').style.display = 'none';
  }

  var addedBy = checkLoggedInUser(); // Pobierz informacje o zalogowanym użytkowniku

  var markerData = {
    placeName: placeName,
    address: address,
    category: category,
    coordinates: coordinates,
    imageURL: imageURL,
    addedBy: addedBy.username // Wyciągnij tylko nick użytkownika
  };
  
  var transaction = db.transaction(['markers'], 'readwrite');
  var objectStore = transaction.objectStore('markers');
  var request = objectStore.add(markerData);

  request.onsuccess = function() {
    alert('Marker został dodany do bazy danych IndexedDB.');
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
      // Tutaj masz dostęp do tablicy markers, która zawiera markery danego użytkownika
    }
  };
}

// Funkcja pomocnicza do pobierania informacji o zalogowanym użytkowniku z lokalnego magazynu
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}
