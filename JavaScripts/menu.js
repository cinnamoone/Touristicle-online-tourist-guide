function updateMenu() {
    const loggedInUser = checkLoggedInUser();

    // Znajdź element menu w DOM
    const menu = document.querySelector('.menu ul');

    // Sprawdź, czy użytkownik jest zalogowany
    if (loggedInUser) {
        // Użytkownik jest zalogowany, zmień menu
        menu.innerHTML = `
            <li><a href="dodawanie.html">Dodaj miejsce</a></li>
            <li class="dropdown">
                <a href="#">Konto</a>
                <ul class="submenu">
                    <li id="mojeKontoItem"><a href="konto.html">Moje-Konto</a></li>
                    <li id="wylogujItem"><a href="main.html" onclick="logout()">Wyloguj</a></li>
                </ul>
            </li>
            <li><a href="ranking.html">Ranking</a></li>`;
    } else {
        // Użytkownik nie jest zalogowany, zostaw domyślne menu
        menu.innerHTML = `
            <li><a href="dodawanie.html">Dodaj miejsce</a></li>
            <li class="dropdown">
                <a href="#">Konto</a>
                <ul class="submenu">
                    <li><a href="./login.html">Logowanie</a></li>
                    <li><a href="./signup.html">Rejestracja</a></li>
                </ul>
            </li>
            <li><a href="ranking.html">Ranking</a></li>`;
    }
}
function logout() {
    // Usuwa zapisane informacje o zalogowanym użytkowniku
    localStorage.removeItem('loggedInUser');

    // Możesz też przekierować użytkownika na stronę główną lub stronę logowania
    window.location.href = 'main.html'; // lub 'login.html'
}

// Wywołaj funkcję updateMenu przy ładowaniu strony
document.addEventListener('DOMContentLoaded', updateMenu);
