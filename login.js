const users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users)

function userExists(username, password) {
    return users.some(user => user.name === username && user.pass === password);
}

function createUser(username, password, moves) {
    users.push({ name: username, pass: password, moves: moves }); 
    localStorage.setItem('users', JSON.stringify(users));
    console.log(users);
}

function login(event) {
    event.preventDefault(); 

    const inputUsername = document.querySelector("#name").value;
    const inputPassword = document.querySelector("#password").value;

    if (userExists(inputUsername, inputPassword)) {
        alert('Login successful!');
        localStorage.setItem('user_name', inputUsername);
        window.location.href = "main.html"; 
    } else {
        const confirmCreateUser = confirm("User does not exist. Do you want to create a new user?");
        
        if (confirmCreateUser) {
            createUser(inputUsername, inputPassword, 0); 
            alert('New user created!');
        } else {
            alert('Login failed.');
        }
    }
}