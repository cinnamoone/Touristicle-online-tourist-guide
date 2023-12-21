//rejestracja

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

// Otwórz bazę danych i magazyn danych
document.addEventListener("DOMContentLoaded", () => {
  // ... (poprzedni kod) ...

  // Funkcja rejestracji użytkownika
  window.registerUser = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Sprawdź, czy hasła są takie same
    if (password !== confirmPassword) {
      alert("Podane hasła nie są identyczne!");
      return;
    }

    // Otwórz bazę danych i magazyn danych
    const transaction = request.result.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    // Sprawdź, czy użytkownik o danej nazwie już istnieje
    const requestGet = objectStore.get(username);
    requestGet.onsuccess = (event) => {
      const existingUser = event.target.result;

      if (existingUser) {
        alert("Użytkownik o tej nazwie już istnieje. Wybierz inną nazwę.");
      } else {
        // Dodaj nowego użytkownika do bazy danych
        const newUser = { username, email, password };
        const requestAdd = objectStore.add(newUser);

        requestAdd.onsuccess = () => {
          const confirmation = confirm("Rejestracja zakończona pomyślnie. Chcesz teraz przejść do strony logowania?");
          
          if (confirmation) {
            window.location.href = 'login.html';
          }
        };

        requestAdd.onerror = () => {
          alert("Błąd rejestracji. Spróbuj ponownie.");
        };
      }
    };

    transaction.oncomplete = () => {
      request.result.close();
    };
  };
});
