const users = [
  { email: 'user1@example.com', password: 'password1', fullName: 'John Doe'},
  { email: 'user2@example.com', password: 'password2', fullName: 'Jane Doe'}
];

// Function to check if a user is logged in
function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}

// Function to update the dropdown menu based on login status
function updateDropdownMenu() {
  const dropdownMenu = document.querySelector('.dropdown ul.submenu');

  // Check if a user is logged in
  const loggedInUser = checkLoggedInUser();

  if (dropdownMenu) {
    if (loggedInUser) {
      // If logged in, update the menu with "Moje Konto" and "Wyloguj"
      dropdownMenu.innerHTML = `
        <li><a href="#">Moje Konto</a></li>
        <li><a href="#" onclick="logout()">Wyloguj</a></li>
      `;
    } else {
      // If not logged in, display the default "Logowanie" and "Rejestracja"
      dropdownMenu.innerHTML = `
        <li><a href=".\login.html">Logowanie</a></li>
        <li><a href=".\signup.html">Rejestracja</a></li>
      `;
    }
  }
}

// Function to handle logout
function logout() {
  localStorage.removeItem('loggedInUser');
  updateDropdownMenu(); // Update menu after logout
}

// Function to handle login
// Function to handle login
function login(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  const user = users.find(u => u.email === emailInput && u.password === passwordInput);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    const loggedInUserElement = document.getElementById('loggedInUser');
    const loginFormElement = document.getElementById('loginForm');
    const userInfoElement = document.getElementById('userInfo');
    const errorElement = document.getElementById('error');

    if (loggedInUserElement && loginFormElement && userInfoElement && errorElement) {
      loggedInUserElement.innerText = user.fullName;
      loginFormElement.style.display = 'none';
      userInfoElement.style.display = 'block';
      errorElement.style.display = 'none';
      console.log('Setting user details and updating dropdown menu');
   }
   
   updateDropdownMenu();
   console.log('After updating dropdown menu');
   
    window.location.href = 'konto.html';
  } else {
    alert('Invalid email or password');
  }
}
