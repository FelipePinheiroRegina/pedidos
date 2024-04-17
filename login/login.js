const buttonLogin = document.querySelector('.button-login')

buttonLogin.addEventListener('click', event => {
    event.preventDefault()

    const email = document.querySelector('#idemail').value
    const password = document.querySelector('#idpassword').value

    if(email === "admin" && password === "admin"){
        window.history.replaceState({}, document.title, "/");
        window.location.href = "pedidos/transportadora/index.html"
    } else {
        alert('Unauthenticated user')
    }
})