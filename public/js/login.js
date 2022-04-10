import { userService } from './services/user-service.js';
import LoginError from './errors/LoginError.js';

const userIsActive = await userService.userIsActive();

if (userIsActive) {
    window.location.href = 'admin';
} else {
    const form = document.querySelector('.login__form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const email = emailInput.value;
        const password = passwordInput.value;
    
        try {
            await userService.login(email, password);
            window.location.href = 'admin'
        } catch(error) {
            if (error instanceof LoginError) {
                alert(error.message)
            }
        }
    });
}