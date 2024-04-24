export const alertSuccess = {
    element: document.querySelector('.success'),

    open(msg) {
        document.querySelector('.msg-success').textContent = msg
        this.element.classList.add('open')
    },

    close () {
        this.element.classList.remove('open')
    }
}