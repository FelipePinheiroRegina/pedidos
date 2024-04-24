export const alertError = {
    element: document.querySelector('.error'),

    open(msg) {
        this.element.textContent = msg
        this.element.classList.add('open')
    },

    close () {
        this.element.classList.remove('open')
    }
}