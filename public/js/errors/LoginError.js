class LoginError extends Error {
    constructor() {
        super('Usuário e/ou senha inválidos.')
    }
}

export default LoginError;