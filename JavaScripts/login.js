//logowanie
// tworzenie/otwieranie bazy danych IndexedDB
const request = indexedDB.open("usersDB",  2);

// obsługa błędów lub aktualizacja bazy danych
request.onerror = (event) => {
  console.error("Błąd bazy danych:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore("users", { keyPath: "email" });
};

// wylogowanie - usuniecie uzytkownika z localstorage
function logout() {
  localStorage.removeItem('loggedInUser');
  updateDropdownMenu(); // aktualizacja menu po wylogowaniu
}


// próba logowania
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
  
        //zapisanie informacji o zalogowanym użytkowniku w localStorage, potrzebne do symulowania działania konta
        localStorage.setItem('loggedInUser', JSON.stringify(user));
  
        
        Swal.fire({
          title: 'Zalogowano pomyślnie!',
          text: 'Przekierowywanie do strony "Moje Konto"...',
          icon: 'success',
          customClass: {
            confirmButton: "custom-confirm-button-class" 
          },
          timer: 3000, 
          showConfirmButton: false 
      });
      
  
        setTimeout(() => {
          window.location.href = 'konto.html';
        }, 2000);
      } else {
        console.log('Nieprawidłowy email lub hasło');

        Swal.fire({
          title: "Nieprawidłowy email lub hasło!",
          text: "Spróbuj ponownie.",
          icon: "error",
          customClass: {
            confirmButton: "custom-confirm-button-class" 
          }
        });

      }
    };
  
    requestGet.onerror = (event) => {
      console.error('Błąd podczas logowania:', event.target.error);
    };
  
    loginTransaction.oncomplete = () => {
      request.result.close();
    };
  }
  
// funkcja do sprawdzenia, czy użytkownik jest zalogowany
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}


