const buttonClose = document.querySelector('.close')

buttonClose.addEventListener('click', event => {
    document.documentElement.classList.remove('open')
})
