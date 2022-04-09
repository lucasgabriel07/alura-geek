import { userService } from './services/user-service.js';

const form = document.querySelector('.login__form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const { accessToken, user } = await userService.login(email, password);
        localStorage.setItem('token', accessToken);
        window.location.href = '/admin'
    } catch(error) {
        alert(error.message)
    }
});

export function getAccessToken() {
    return localStorage.setItem('token', accessToken);
}