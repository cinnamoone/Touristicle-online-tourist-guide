function redirectToHomepage() {
    // Tutaj ustaw adres URL, do którego chcesz przekierować użytkownika
    var homepageUrl = "main.html";
    
    // Wykonaj przekierowanie
    window.location.href = homepageUrl;
}


document.addEventListener('DOMContentLoaded', function() {
  displayUserMarkers();
  displayUserComments();
});

function displayUserMarkers() {
  var loggedInUser = checkLoggedInUser();
  if (!loggedInUser) {
      console.log('Brak zalogowanego użytkownika.');
      return;
  }

  var db;
  var request = indexedDB.open('markersDB', 2);

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



function displayUserComments() {
    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }
  
    var db;
    var request = indexedDB.open('markersDB', 2);
  
    request.onsuccess = function(event) {
        db = event.target.result;
        loadComments(loggedInUser.username, db);
    };
  
    request.onerror = function(event) {
        console.error('Błąd podczas otwierania bazy danych IndexedDB.');
    };
  }
  
  function loadComments(username, db) {
    var transaction = db.transaction(['comments'], 'readonly');
    var objectStore = transaction.objectStore('comments');
    var comments = [];
  
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.addedBy === username) {
                comments.push(cursor.value);
            }
            cursor.continue();
        } else {
            displayComments(comments);
        }
    };
  }
  
  function displayComments(comments) {
    var container = document.getElementById('comments-container');
    if (!container) {
        console.error('Nie znaleziono kontenera do wyświetlania komentarzy.');
        return;
    }
    container.innerHTML = ''; // Clears previous comments
  
    // Adding a header "Your Comments"
    var header = document.createElement('h1');
    header.textContent = 'Twoje komentarze';
    container.appendChild(header);
  
    comments.forEach(function(comment) {
        var commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p><strong>Treść komentarza:</strong> "${comment.commentText}"</p> <!-- Adjusted to commentText -->
            <p><strong>Miejsce:</strong> ${comment.placeName}</p>
        `;
        container.appendChild(commentElement);
    });
  }
  
  

// Funkcja pomocnicza do pobierania informacji o zalogowanym użytkowniku z lokalnego magazynu
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}











