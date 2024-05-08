export class TokenManager {
    static generate(password, userId) {
        const options = { method: 'POST' };

        return fetch(`http://192.168.10.112:8401/rest/api/oauth2/v1/token?grant_type=password&password=${password}&username=${userId}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            });
    }

    static refreshToken() {
        const userId = sessionStorage.getItem('userId');
        const password = sessionStorage.getItem('password');

        if (!userId || !password) {
            throw new Error('Credenciais não disponíveis.');
        }

        return fetch(`http://192.168.10.112:8401/rest/api/oauth2/v1/token?grant_type=password&password=${password}&username=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        })
        .then(token => {
            sessionStorage.setItem('accessToken', token.access_token);
        });
    }

    static timeExpireToken() {
        const accessTokenExpirationTime = 3600 * 1000;
        const timeToRenew = 3000 * 1000;

        // Calcula o tempo restante até a expiração do token
        const timeUntilExpiration = accessTokenExpirationTime - Date.now();

        // Configura o temporizador para renovar o token antes de expirar
        setTimeout(() => {
            this.refreshToken();
        }, timeUntilExpiration - timeToRenew);
    }
}
