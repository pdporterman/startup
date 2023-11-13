"next"
const MAX_MOVES = 100000;
document.querySelector('#submitLogin').addEventListener('click', function(e) {
    e.preventDefault();


    const inputUsername = document.querySelector("#name").value;
    const inputPassword = document.querySelector("#password").value;

    const user = { name: inputUsername, pass: inputPassword, moves: MAX_MOVES };

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "main.html";
});