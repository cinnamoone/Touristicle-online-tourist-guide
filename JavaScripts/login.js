//logowanie
// Otwórz lub utwórz bazę danych IndexedDB
const request = indexedDB.open("usersDB", 2);

// Obsługa błędów lub aktualizacja bazy danych
request.onerror = (event) => {
  console.error("Błąd bazy danych:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Utwórz magazyn danych dla użytkowników
  const objectStore = db.createObjectStore("users", { keyPath: "email" });
};

// Funkcja do obsługi wylogowania
function logout() {
  localStorage.removeItem('loggedInUser');
  updateDropdownMenu(); // Update menu after logout
}

// Próba logowania
// Próba logowania
function login(event) {
    event.preventDefault();
  
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
  
    console.log('Próba logowania:', emailInput, passwordInput);
  
    const loginTransaction = request.result.transaction(["users"], "readonly");
    const loginObjectStore = loginTransaction.objectStore("users");
  
    const requestGet = loginObjectStore.get(emailInput);
    requestGet.onsuccess = (event) => {
      const user = event.target.result;
  
      console.log('Znaleziony użytkownik:', user);
  
      if (user && user.password === passwordInput) {
        console.log('Poprawne logowanie');
  
        // Zapisz informacje o zalogowanym użytkowniku w localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
  
        // Wyświetl alert z informacją o zalogowaniu
        alert('Zalogowano pomyślnie! Przekierowywanie do strony "Moje Konto"...');
  
        // Przekieruj użytkownika do strony "konto.html" po pewnym czasie (np. 2 sekundy)
        setTimeout(() => {
          window.location.href = 'konto.html';
        }, 2000);
      } else {
        console.log('Nieprawidłowy email lub hasło');
        alert('Nieprawidłowy email lub hasło');
      }
    };
  
    requestGet.onerror = (event) => {
      console.error('Błąd podczas logowania:', event.target.error);
    };
  
    loginTransaction.oncomplete = () => {
      request.result.close();
    };
  }
  
// Funkcja do sprawdzenia, czy użytkownik jest zalogowany
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}


