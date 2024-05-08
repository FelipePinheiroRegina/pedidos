export const alertSuccess = {
    element: document.querySelector('.success'),

    open(msg) {
        document.querySelector('.msg-success').textContent = msg
        this.element.classList.add('open')
        setTimeout(closeWithSetTimeOut, 8000)
    },

    close () {
        this.element.classList.remove('open')
    }
}

function closeWithSetTimeOut() {
    document.querySelector('.success').classList.remove('open')
}