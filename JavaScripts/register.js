//rejestracja

// otworzenie bazy danych 
const request = indexedDB.open("usersDB", 2);

// obsługa błędów lub aktualizacja bazy danych
request.onerror = (event) => {
  console.error("Błąd bazy danych:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  let objectStore;
  if (!db.objectStoreNames.contains("users")) {
    objectStore = db.createObjectStore("users", { keyPath: "email" });
  } else {
    objectStore = request.transaction.objectStore("users");
  }

  // tworzenie indeksu dla 'username' 
  if (!objectStore.indexNames.contains("username")) {
    objectStore.createIndex("username", "username", { unique: true });
  }
};
 
document.addEventListener("DOMContentLoaded", () => {
  

  // funkcja rejestracji użytkownika
  window.registerUser = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Sprawdzanie, czy wszystkie pola są wypełnione
    if (!username || !email || !password || !confirmPassword) {

      swal("Proszę wypełnić wszystkie pola!");
      
      return;
    }

    // sprawdzanie haseł
    if (password !== confirmPassword) {

      swal("Podane hasła nie są identyczne!", "Spróbuj ponownie.", "warning");
      
      return;
    }

  
    const db = request.result;
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    // Sprawdzanie, czy użytkownik o danym e-mailu już istnieje
    const requestEmail = objectStore.get(email);
    requestEmail.onsuccess = () => {
      if (requestEmail.result) {
        swal("Użytkownik o tym adresie e-mail już istnieje.");
        return;
      }

      // Sprawdzanie, czy użytkownik o danej nazwie użytkownika już istnieje
      const usernameIndex = objectStore.index("username");
      const requestUsername = usernameIndex.get(username);
      requestUsername.onsuccess = () => {
        if (requestUsername.result) {
          swal("Użytkownik o tej nazwie już istnieje. Wybierz inną nazwę.");
          return;
        }

        // Rejestracja nowego użytkownika
        const newUser = { username, email, password };
        const requestAdd = objectStore.add(newUser);

        requestAdd.onsuccess = () => {
          const confirmation = confirm("Rejestracja zakończona pomyślnie. Chcesz teraz przejść do strony logowania?");
          
          if (confirmation) {
            window.location.href = 'login.html';
          }
        };

        requestAdd.onerror = () => {
          swal("Błąd rejestracji. Spróbuj ponownie.");
        };
      };
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };
});