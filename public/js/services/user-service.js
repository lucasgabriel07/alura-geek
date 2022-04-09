import LoginError from '../errors/LoginError.js'

async function login(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    });

    if (response.ok) {
        const { accessToken, user } = await response.json();
        const id = user.id;
        await setActive(id, accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user_id', id);
    } else {
        throw new LoginError()
    }
    
}

async function setActive(userId, token) {
    await fetch(`/api/users/${userId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            active: true
        })
    });
}

async function userIsActive() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (token && userId) {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { active } = await response.json();
            return active;
        } catch(error) {
            return false;
        }
    }
    return false;
}

async function logout() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (token && userId) {
        await fetch(`/api/users/${userId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                active: false
            })
        });

        window.location.href = 'login';
    }
}

export const userService = { login, userIsActive, logout };