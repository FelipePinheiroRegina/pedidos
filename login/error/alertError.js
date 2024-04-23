export const alertError = {
    element: document.querySelector('.error'),

    open() {
        this.element.classList.add('open')
    },

    close () {
        this.element.classList.remove('open')
    }
}