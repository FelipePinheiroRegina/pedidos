import { alertError } from "../../../error/alertError.js";
import { Load } from "./utils.js";
import { comunicationApi } from "./ApiTransportes.js"
import { TokenManager } from "../../../scripts-login/ApiAccessToken.js";

TokenManager.refreshToken()

const buttonTransport = document.querySelector('.search-transport') 

let transport = document.querySelector('#idtransport')
let date = document.querySelector('#iddate')
let filial = localStorage.getItem('@filial:')
let optionCarriers = []
let carriersNamesArray = []
let carriersIdNamesArray = []
const datalist = document.querySelector('#carriers')

document.getElementById("iddate").setAttribute("max", new Date().toISOString().split("T")[0]);

date.addEventListener('input', function() {
    carriersNamesArray = []
    datalist.innerHTML = ''
    buttonTransport.disabled = true
    Load.open()
    alertError.close()

    const token_type = sessionStorage.getItem('token_type')
    const accessToken = sessionStorage.getItem('accessToken')
   
    if(this.value){
        comunicationApi.search(filial, this.value, token_type, accessToken).then(optionCarriers => {
            if(optionCarriers.length === 0){
                return alertError.open('Não existe transportadora para esse dia até o momento...')
            }

            optionCarriers.forEach(carrier => {
                let option = document.createElement('option')
                option.value = carrier.name
                datalist.append(option)
                carriersNamesArray.push(carrier.name)
                carriersIdNamesArray.push(carrier)
            }) 
        })
        buttonTransport.disabled = false
        Load.remove()
    }   
})


buttonTransport.addEventListener('click', event => {
    event.preventDefault()
    
    transport = document.querySelector('#idtransport').value
    transport = transport.toUpperCase()
   
    const checkExistsTransp = carriersNamesArray.includes(transport)
    
    if(!checkExistsTransp){
        return alertError.open('Transporte inválido')
    }
    
    let id = 0

    carriersIdNamesArray.forEach(transp => {
        if(transp.name === transport){
            id = transp.id
        }
    })

   

    date = date.value
    
    localStorage.setItem('@id:', id)
    localStorage.setItem('@transport:', transport)
    localStorage.setItem('@date:', date)
    localStorage.setItem('@pedidos:', undefined)
    
    window.location.href = `tableTransportes/index.html`
})

transport.onfocus = () => alertError.close()
date.onfocus = () => alertError.close()

