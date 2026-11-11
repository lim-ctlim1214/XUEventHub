async function loginAttempt() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        document.getElementById('login').classList.remove('hidden');
        await login(username, password);
        window.location.href = "admin-homepage.html"
    } catch (err) {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('pass_error').classList.remove('hidden');
    }
}

document.getElementById('login-button').addEventListener('click', loginAttempt);

if (isLoggedIn()){
    window.location.href = "admin-homepage.html"
}