import React from "react";
export function Login() {
    React.useEffect(()=>{
        document.getElementById('submitLogin').addEventListener('click', function () {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (!username || !password) return;
            // Use fetch to send the form data to the server
            fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            }).then(response => {
                localStorage.setItem("user", username);
                if (response.ok) window.location.href = '/scores';
            });
        });
    });
    return (
        <main>
            <img className="img" src="/images/detective.png" alt="main pic for now"/>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Username" required /><br/>
                <input type="password" id="password" placeholder="Password" required /><br/>
                <button type="button" id="submitLogin" className="btn btn-success">Login</button>
            </form>
        </main>
    );
}