const buttonClose = document.querySelector('.close')

buttonClose.addEventListener('click', event => {
    document.querySelector('.analytics').classList.remove('open')
})
