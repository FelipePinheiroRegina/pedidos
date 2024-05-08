export const alertError = {
    element: document.querySelector('.error'),

    open(msg) {
        document.querySelector('.msg').textContent = msg
        this.element.classList.add('open')
        setTimeout(closeWithSetTimeOut, 8000)
    },

    close () {
        this.element.classList.remove('open')
    }
}

function closeWithSetTimeOut() {
    document.querySelector('.error').classList.remove('open')
}