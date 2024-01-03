const request = indexedDB.open("usersDB", 2); 

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Utwórz magazyn danych dla użytkowników, jeśli nie istnieje
  if (!db.objectStoreNames.contains("users")) {
    const objectStore = db.createObjectStore("users", { keyPath: "email" });
    // Dodaj indeksy dla pól, które mogą być używane do wyszukiwania
    objectStore.createIndex("username", "username", { unique: false });
  }

  // Utwórz magazyn danych dla komentarzy
  if (!db.objectStoreNames.contains("comments")) {
    db.createObjectStore("comments", { autoIncrement: true });
  }

  // Utwórz magazyn danych dla polubionych postów
  if (!db.objectStoreNames.contains("likedPosts")) {
    db.createObjectStore("likedPosts", { autoIncrement: true });
  }

  // Utwórz magazyn danych dla dodanych postów
  if (!db.objectStoreNames.contains("addedPosts")) {
    db.createObjectStore("addedPosts", { autoIncrement: true });
  }
};



// Funkcja do dodawania komentarza do bazy danych
function addComment(userEmail, commentText) {
  const db = request.result;
  const commentTransaction = db.transaction(["comments"], "readwrite");
  const commentObjectStore = commentTransaction.objectStore("comments");

  // Dodaj nowy komentarz do magazynu danych
  const newComment = { userEmail, commentText };
  const requestAddComment = commentObjectStore.add(newComment);

  requestAddComment.onsuccess = () => {
    console.log('Dodano komentarz do bazy danych');
  };

  requestAddComment.onerror = (event) => {
    console.error('Błąd podczas dodawania komentarza:', event.target.error);
  };

  commentTransaction.oncomplete = () => {
    console.log('Transakcja zakończona');
  };
}
