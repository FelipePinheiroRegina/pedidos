import { TableView } from "./table.js"
import "./modal.js"

// if click button back, back page
const buttonBack = document.querySelector('.back')
buttonBack.onclick = () => {window.history.back()}

// treatment of first lyrics 
export let transport = localStorage.getItem('@transport:')
transport = transport.charAt(0).toUpperCase() + transport.slice(1)

// Formatting of date
const dateUser = localStorage.getItem('@date:')
function FormatDate(date){
    let dateInformed = date.split('-')

    let day     = dateInformed[2]
    let month   = dateInformed[1]
    let year    = dateInformed[0]
    
    dateInformed = [day, month, year].join('/')
    
    return dateInformed
}

// Manipulation Document Object Model
const h3 = document.querySelector('#name-transport').textContent = `${transport}`
const date = document.querySelector('#date').textContent = FormatDate(dateUser)

new TableView('#app')


