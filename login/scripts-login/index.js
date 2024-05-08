import { alertError } from "../error/alertError.js";
import { TokenManager } from "./ApiAccessToken.js";

const buttonLogin = document.querySelector('.button-login');
const userIdInput = document.querySelector('#userid');
const passwordInput = document.querySelector('#idpassword');

buttonLogin.addEventListener('click', event => {
    event.preventDefault();

    const userId = userIdInput.value;
    const password = passwordInput.value;

    TokenManager.generate(password, userId)
        .then(data => {
            // Se a autenticação for bem-sucedida, armazene os dados na sessionStorage
            sessionStorage.clear();
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('token_type', data.token_type);
            window.location.href = "filial/index.html";
        })
        .catch(error => {
            // Se ocorrer um erro na autenticação, exiba uma mensagem de erro
            console.error('Erro de autenticação:', error);
            alertError.open('Usuário não autenticado');
        });
});

// Limpa a mensagem de erro quando os campos de entrada ganham foco
userIdInput.onfocus = () => alertError.close();
passwordInput.onfocus = () => alertError.close();
