function redirectToHomepage() {
    var homepageUrl = "main.html";
    window.location.href = homepageUrl;
}


document.addEventListener('DOMContentLoaded', function() {
  displayUserMarkers();
  displayUserComments();
  displayUserFavorites()
});

function displayUserMarkers() {
  var loggedInUser = checkLoggedInUser();
  if (!loggedInUser) {
      console.log('Brak zalogowanego użytkownika.');
      return;
  }

  var db;
  var request = indexedDB.open('markersDB', 3);

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
    header.textContent = 'Dodane miejsca';
    container.appendChild(header);

  if (markers.length === 0) {
    container.innerHTML += '<p>Nie dodałeś jeszcze żadnych miejsc.</p>';
    return;
}

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
    var request = indexedDB.open('markersDB', 3);
  
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

    var header = document.createElement('h1');
    header.textContent = 'Twoje komentarze';
    container.appendChild(header);

    if (comments.length === 0) {
        container.innerHTML += '<p>Nie dodałeś jeszcze żadnych komentarzy.</p>';
        return;
    }
  
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
  function displayUserFavorites() {
    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }

    var db;
    var request = indexedDB.open('markersDB', 3);

    request.onsuccess = function(event) {
        db = event.target.result;
        loadFavorites(loggedInUser.username, db);
    };

    request.onerror = function(event) {
        console.error('Błąd podczas otwierania bazy danych IndexedDB.');
    };
}

function loadFavorites(username, db) {
    var transaction = db.transaction(['favourites'], 'readonly');
    var objectStore = transaction.objectStore('favourites');
    var favorites = [];

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.userName === username) {
                favorites.push(cursor.value);
            }
            cursor.continue();
        } else {
            var uniqueFavorites = filterUniqueFavorites(favorites);
            displayFavorites(uniqueFavorites);
        }
    };
}

function filterUniqueFavorites(favorites) {
    var uniqueFavorites = [];
    var uniqueNames = new Set();

    favorites.forEach(function(favorite) {
        if (!uniqueNames.has(favorite.placeName)) {
            uniqueNames.add(favorite.placeName);
            uniqueFavorites.push(favorite);
        }
    });

    return uniqueFavorites;
}

function displayFavorites(favorites) {
    var container = document.getElementById('favorites-container');
    if (!container) {
        console.error('Nie znaleziono kontenera do wyświetlania ulubionych miejsc.');
        return;
    }
    container.innerHTML = ''; 

    var header = document.createElement('h1');
    header.textContent = 'Twoje ulubione miejsca';
    container.appendChild(header);

    if (favorites.length === 0) {
        container.innerHTML += '<p>Nie dodałeś jeszcze żadnych ulubionych miejsc.</p>';
        return;
    }

    favorites.forEach(function(favorite) {
        var favoriteElement = document.createElement('div');
        favoriteElement.className = 'favorite';
        favoriteElement.innerHTML = `
            
            <img src="${favorite.imageUrl}" alt="Obraz miejsca" />
            <p><strong>Nazwa miejsca:</strong> "${favorite.placeName}"</p>
        `;
        container.appendChild(favoriteElement);
    });
}


  

// Funkcja pomocnicza do pobierania informacji o zalogowanym użytkowniku z lokalnego magazynu
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}











