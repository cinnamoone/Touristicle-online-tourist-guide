//zmiana menu w zależności czy użytkownik jest zalogowany czy nie
function updateMenu() {
    const loggedInUser = checkLoggedInUser();

    
    const menu = document.querySelector('.menu ul');

    
    if (loggedInUser) {
        
        menu.innerHTML = `
            <li><a href="dodawanie.html">Dodaj miejsce</a></li>
            <li class="dropdown">
                <a href="#">Konto</a>
                <ul class="submenu">
                    <li id="mojeKontoItem"><a href="konto.html">Moje konto</a></li>
                    <li id="wylogujItem"><a href="main.html" onclick="logout()">Wyloguj</a></li>
                </ul>
            </li>
            <li><a href="ranking.html">Ranking</a></li>`;
    } else {
        
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

//obsługa wylogowania
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'main.html'; 
}


document.addEventListener('DOMContentLoaded', updateMenu);

function checkLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }
  
  