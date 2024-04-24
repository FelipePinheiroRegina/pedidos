import { alertError } from "./error/alertError.js"

const buttonLogin = document.querySelector('.button-login')
let email = document.querySelector('#idemail')
let password = document.querySelector('#idpassword')

buttonLogin.addEventListener('click', event => {
    event.preventDefault()

    email = document.querySelector('#idemail').value
    password = document.querySelector('#idpassword').value
    
    console.log(email, password)
    if(email === "admin" && password === "admin"){
        window.location.href = "transportadora/index.html"
    } else {
        alertError.open('Email ou Senha inválidos')
    }
})

email.onfocus = () => alertError.close()
password.onfocus = () => alertError.close()