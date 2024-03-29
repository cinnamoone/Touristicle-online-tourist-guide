
//obsługa klikniecia na logo strony
function redirectToHomepage() {
    var homepageUrl = "main.html";
    window.location.href = homepageUrl;
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deleteAccountButton').onclick = deleteAccount;

  displayUserMarkers();
  displayUserComments();
  displayUserFavorites()
});


//wyświetlanie markerów danego użytkownika
function displayUserMarkers() {
  var loggedInUser = checkLoggedInUser();
  if (!loggedInUser) {
      console.log('Brak zalogowanego użytkownika.');
      return;
  }

  var db;
  var request = indexedDB.open('markersDB', 4);

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
  container.innerHTML = ''; 
  
  
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
        <button class="buttonDelete" onclick="removeMarker('${marker.id}')">Usuń miejsce</button>
    `;
    container.appendChild(markerElement);
});
}
//usuwanie dodanych miejsc
function removeMarker(markerId) {
    var confirmDeletion = confirm('Czy na pewno chcesz usunąć to miejsce?');
    if (!confirmDeletion) {
        return;
    }

    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }

    var db;
    var request = indexedDB.open('markersDB', 4);

    request.onsuccess = function(event) {
        db = event.target.result;
        var transaction = db.transaction(['markers'], 'readwrite');
        var objectStore = transaction.objectStore('markers');

      
        var deleteRequest = objectStore.delete(Number(markerId));
        deleteRequest.onsuccess = function() {
            swal('Miejsce zostało usunięte.');
            loadMarkers(loggedInUser.username, db); 
        };
    };

    request.onerror = function(event) {
        console.error('Błąd podczas otwierania bazy danych IndexedDB.');
    };
}


//wyświetlanie komentarzy danego użytkownika
function displayUserComments() {
    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }

    var db;
    var request = indexedDB.open('markersDB', 4);

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

function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString(); // Poprawne formatowanie daty do czytelnej formy
}

function displayComments(comments) {
    var container = document.getElementById('comments-container');
    if (!container) {
        console.error('Nie znaleziono kontenera do wyświetlania komentarzy.');
        return;
    }
    container.innerHTML = '';

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
            <p><strong>Treść komentarza:</strong> "${comment.commentText}"</p>
            <p><strong>Miejsce:</strong> ${comment.placeName}</p>
            <p><strong>Data dodania:</strong> ${formatTimestamp(comment.timestamp)}</p> <!-- Wyświetlenie daty -->
            <button class="buttonDelete" onclick="removeComment('${comment.id}')">Usuń komentarz</button>
        `;
        container.appendChild(commentElement);
    });
}
//usuwanie komentarza 
function removeComment(commentId) {
    var confirmDeletion = confirm(`Czy na pewno chcesz usunąć ten komentarz?`);
    if (!confirmDeletion) {
        return;
    }

    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }

    var db;
    var request = indexedDB.open('markersDB', 4);

    request.onsuccess = function(event) {
        db = event.target.result;
        var transaction = db.transaction(['comments'], 'readwrite');
        var objectStore = transaction.objectStore('comments');

        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value.addedBy === loggedInUser.username && cursor.value.id === Number(commentId)) {
                    cursor.delete();
                    swal(`Komentarz został usunięty.`);
                }
                cursor.continue();
            } else {
                loadComments(loggedInUser.username, db);
            }
        };
    };

    request.onerror = function(event) {
        console.error('Błąd podczas otwierania bazy danych IndexedDB.');
    };
}


  //wyświetlanie ulubionych miejsc danego użytkownika
  function displayUserFavorites() {
    var loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
        console.log('Brak zalogowanego użytkownika.');
        return;
    }

    var db;
    var request = indexedDB.open('markersDB', 4);

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
            <button class="buttonDelete" onclick="removeFavorite('${favorite.placeName}')">Usuń z ulubionych</button>
        `;
        container.appendChild(favoriteElement);
    });
}
function removeFavorite(placeName) {
    Swal.fire({
        title: `Czy na pewno chcesz usunąć miejsce\n"${placeName}"\nz ulubionych?`,
        text: "Tej operacji nie można cofnąć.",
        icon: 'warning',
        customClass: {
            title: 'custom-font-class',
            confirmButton: 'custom-confirm-button-class'
        },
        showCancelButton: true,
        confirmButtonText: 'Tak, usuń',
        cancelButtonText: 'Nie, zachowaj'
    }).then((result) => {
        if (!result.isConfirmed) {
            return; // jeśli użytkownik nie potwierdzi, przerwij funkcję
        }

        var loggedInUser = checkLoggedInUser();
        if (!loggedInUser) {
            console.log('Brak zalogowanego użytkownika.');
            return;
        }

        var db;
        var request = indexedDB.open('markersDB', 4);

        request.onsuccess = function(event) {
            db = event.target.result;
            var transaction = db.transaction(['favourites'], 'readwrite');
            var objectStore = transaction.objectStore('favourites');

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.userName === loggedInUser.username && cursor.value.placeName === placeName) {
                        cursor.delete();
                        Swal.fire(`Usunięto z kolekcji ulubionych: "${placeName}"`, '', 'success');
                    }
                    cursor.continue();
                } else {
                    loadFavorites(loggedInUser.username, db);
                }
            };
        };

        request.onerror = function(event) {
            console.error('Błąd podczas otwierania bazy danych IndexedDB.');
        };
    });
}


  
//usuwanie konta

function deleteAccount() {
    const loggedInUser = checkLoggedInUser();
    if (!loggedInUser) {
      alert("Nie jesteś zalogowany.");
      return;
    }

    const isConfirmed = confirm("Czy na pewno chcesz usunąć swoje konto?");
    if (!isConfirmed) {
    console.log("Usuwanie konta anulowane.");
        return; 
    }
  
    const emailToDelete = loggedInUser.email;
  
    // Otwarcie transakcji z bazą danych
    const deleteTransaction = request.result.transaction(["users"], "readwrite");
    const usersObjectStore = deleteTransaction.objectStore("users");
  
    // Usuwanie użytkownika
    const deleteRequest = usersObjectStore.delete(emailToDelete);
    
    deleteRequest.onsuccess = () => {
      console.log('Konto usunięte:', emailToDelete);
      swal('Twoje konto zostało usunięte.');
  
      // Wylogowanie użytkownika po usunięciu konta
      logout();

      window.location.href = 'main.html';
    };
  
    deleteRequest.onerror = (event) => {
      console.error('Błąd podczas usuwania konta:', event.target.error);
    };
    
    deleteTransaction.oncomplete = () => {
      request.result.close();
    };
  }
  

  


// pobieranie informacji o zalogowanym użytkowniku z lokalstorage
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}