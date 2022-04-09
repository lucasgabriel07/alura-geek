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
        return response.json();
    }

    throw new Error('Usuário e/ou senha inválidos.')
}

export const userService = { login }