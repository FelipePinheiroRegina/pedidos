import { alertError } from "../error/alertError.js";

const optionsCarriers = ['braspress', 'rodonaves', 'sedex']

optionsCarriers.forEach(carrier => {
    const datalist = document.querySelector('#carriers')

    let option = document.createElement('option')
    option.value = carrier
    datalist.append(option)
})

document.getElementById("iddate").setAttribute("max", new Date().toISOString().split("T")[0]);

let transport = document.querySelector('#idtransport')
let date = document.querySelector('#iddate')

const buttonTransport = document.querySelector('.search-transport')    

buttonTransport.addEventListener('click', event => {
    event.preventDefault()
    
    transport = document.querySelector('#idtransport').value
    transport = transport.toLowerCase()

    const checkExistsTransp = optionsCarriers.includes(transport)
    
    if(!checkExistsTransp){
        return alertError.open('Transporte inválido')
    }

    date = document.querySelector('#iddate').value
        
    if(date == ''){
        return alertError.open('Data inválida')
    }

    localStorage.clear()
    localStorage.setItem('@transport:', transport)
    localStorage.setItem('@date:', date)
    localStorage.setItem('@pedidos:', undefined)
    window.location.href = `tableTransportes/index.html`
})

transport.oninput = () => alertError.close()
date.oninput = () => alertError.close()

