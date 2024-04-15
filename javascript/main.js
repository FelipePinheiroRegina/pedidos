import { formatDate } from './date.js'
import { TableView } from './table.js';
new TableView('#app')
// LOGIN
const currentPath = window.location.pathname;
const pageLog = '/login/index.html'
const pageTransport = '/transportadora/index.html'
const pageTableTransport = '/tableTransportes/index.html'
const pageTablePedidos = '/tablePedidos/index.html'

if(currentPath == pageLog){
    // LOGIN
    const buttonLogin = document.querySelector('.button-login')

    buttonLogin.addEventListener('click', event => {
        event.preventDefault()

        const email = document.querySelector('#idemail').value
        const password = document.querySelector('#idpassword').value
    
        if(email === "admin" && password === "admin"){
            window.location.href = "/transportadora/index.html"
        } else {
            alert('Unauthenticated user')
        }
    })
} else if (currentPath == pageTransport) {
    // TRANSPORT
    const buttonTransport = document.querySelector('.search-transport')

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const dateNow = formatDate(new Date())

    buttonTransport.addEventListener('click', event => {
        event.preventDefault()
        
        const transport = document.querySelector('#idtransport').value
        const date = document.querySelector('#iddate').value
        
        if(date == dateNow){
            window.location.href = `/tableTransportes/index.html?transport=${transport}`

        } else {
            alert('No orders found')
        }
    })
} else if (currentPath == pageTableTransport) {
    const buttonBack = document.querySelector('.back')
    buttonBack.onclick = () => { window.location.href = "/transportadora/index.html"}
    
    const url = window.location.search
    const array = url.split('=')
    const transport = array[1]
   
    const dateNow = formatDate(new Date())
    
    const h3 = document.querySelector('#name-transport').textContent = `${transport}`
    const date = document.querySelector('#date').textContent = dateNow
   
}
    












