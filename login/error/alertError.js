export const alertError = {
    element: document.querySelector('.error'),

    open(msg) {
        document.querySelector('.msg').textContent = msg
        this.element.classList.add('open')
    },

    close () {
        this.element.classList.remove('open')
    }
}