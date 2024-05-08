export const Load = {
    open(){
        document.documentElement.classList.add('loading')
    },

    remove() {
        document.documentElement.classList.remove('loading')
    }
    
}