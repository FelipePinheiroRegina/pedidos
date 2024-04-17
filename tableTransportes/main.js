import { TableView } from "./table.js"
import "./modal.js"

const buttonBack = document.querySelector('.back')
buttonBack.onclick = () => { window.location.href = "https://felipepinheiroregina.github.io/pedidos/tableTransportes/index.html"}

const url = window.location.search
const array = url.split('=')
export const transport = array[1]

const dateNow = new Date().toLocaleDateString('GMT-0300')

const h3 = document.querySelector('#name-transport').textContent = `${transport}`
const date = document.querySelector('#date').textContent = dateNow

new TableView('#app')


