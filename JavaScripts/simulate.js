
document.addEventListener('DOMContentLoaded', function() {
  displayUserMarkers();
});

function displayUserMarkers() {
  var loggedInUser = checkLoggedInUser();
  if (!loggedInUser) {
      console.log('Brak zalogowanego użytkownika.');
      return;
  }

  var db;
  var request = indexedDB.open('markersDB', 1);

  request.onsuccess = function(event) {
      db = event.target.result;
      loadMarkers(loggedInUser.username, db);
  };

  request.onerror = function(event) {
      console.error('Błąd podczas otwierania bazy danych IndexedDB.');
  };
}

function loadMarkers(username, db) {
  var transaction = db.transaction(['markers'], 'readonly');
  var objectStore = transaction.objectStore('markers');
  var markers = [];

  objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
          if (cursor.value.addedBy === username) {
              markers.push(cursor.value);
          }
          cursor.continue();
      } else {
          displayMarkers(markers);
      }
  };
}

function displayMarkers(markers) {
  var container = document.getElementById('markers-container');
  if (!container) {
      console.error('Nie znaleziono kontenera do wyświetlania markerów.');
      return;
  }
  container.innerHTML = ''; // Czyści poprzednie markery

  // Dodawanie nagłówka "Twoje miejsca"
  var header = document.createElement('h1');
  header.textContent = 'Twoje miejsca';
  container.appendChild(header);

  markers.forEach(function(marker) {
      var markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.innerHTML = `
          <img src="${marker.imageURL}" alt="${marker.placeName}">
          <h3>${marker.placeName}</h3>
          <p>${marker.address}</p>
      `;
      container.appendChild(markerElement);
  });
}


// Funkcja pomocnicza do pobierania informacji o zalogowanym użytkowniku z lokalnego magazynu
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}












        function redirectToHomepage() {
            // Tutaj ustaw adres URL, do którego chcesz przekierować użytkownika
            var homepageUrl = "main.html";
            
            // Wykonaj przekierowanie
            window.location.href = homepageUrl;
        }