//rejestracja

// otowrzenie bazy danych 
const request = indexedDB.open("usersDB", 2);

// obsługa błędów lub aktualizacja bazy danych
request.onerror = (event) => {
  console.error("Błąd bazy danych:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  
  const objectStore = db.createObjectStore("users", { keyPath: "email" });
};


document.addEventListener("DOMContentLoaded", () => {
  

  // funkcja rejestracji użytkownika
  window.registerUser = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // sprawdzanie haseł
    if (password !== confirmPassword) {
      alert("Podane hasła nie są identyczne!");
      return;
    }

  
    const transaction = request.result.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    // sprawdzanie czy użytkownik o danej nazwie już istnieje
    const requestGet = objectStore.get(username);
    requestGet.onsuccess = (event) => {
      const existingUser = event.target.result;

      if (existingUser) {
        alert("Użytkownik o tej nazwie już istnieje. Wybierz inną nazwę.");
      } else {
        
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
