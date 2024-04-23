//import { TableView } from "./table.js"
//import "./modal.js"

const buttonBack = document.querySelector('.back')
buttonBack.onclick = () => {window.history.back()}

const transport = localStorage.getItem('@transport:')
const dateUser = localStorage.getItem('@date:')
console.log(typeof dateUser)


const h3 = document.querySelector('#name-transport').textContent = `${transport}`.toUpperCase()
const date = document.querySelector('#date').textContent = dateUser

//new TableView('#app')


