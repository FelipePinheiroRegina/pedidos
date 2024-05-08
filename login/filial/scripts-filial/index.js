const ButtoEnterFilial = document.querySelector('.enter-filial')

ButtoEnterFilial.addEventListener('click', (event) => {
    event.preventDefault()

    const { value } = document.querySelector('#filial')

    localStorage.clear()
    localStorage.setItem('@filial:', value)
    window.location.href = `transportadora/index.html`
})