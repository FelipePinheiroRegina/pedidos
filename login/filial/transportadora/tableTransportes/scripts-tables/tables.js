import { alertError } from "../../../../error/alertError.js"
import { alertSuccess } from '../../../../success/alertSuccess.js'
import { communicationApiPedidos } from './ApiPedidos.js'
import { communicationApiSaveBoxes } from "./ApiSaveBoxes.js"
import { communicationApiBoxesAnalytics } from "./ApiBoxesAnalytics.js"
import { RemoveBoxes } from "./ApiRemoveBoxes.js"

// Getting the Information to request in localStorage
const id = localStorage.getItem('@id:')
const date = localStorage.getItem('@date:')
const filial = localStorage.getItem('@filial:')

// Getting the information to request in sessionStorage
const token_Type = sessionStorage.getItem('token_type')
const accessToken = sessionStorage.getItem('accessToken')
const user = sessionStorage.getItem('userId')


export class TableData {
    constructor(root){
        this.root = document.querySelector(root)
        this.tableAnalytics = document.querySelector('.modal-analytics table tbody')
        
        this.load()
    }

    save(id){
        communicationApiSaveBoxes.save(filial, id, user, token_Type, accessToken)
        .then(response => {
            if(response.solution) {
                console.log(response)
                alertError.open(`${response.solution}`)
            } else {
                alertSuccess.open(`${response.info}`)
                this.updateWhenLoaded()
            }
        })
    }

    async load(){
            this.pedidos = await communicationApiPedidos.search(filial, date, id, token_Type, accessToken)
    }

    async updateWhenLoaded() {
        await this.load()
        this.update()
    }
    
    onaddBox(idpedido){
        let id = idpedido.split('-')

        const pedido = this.pedidos.filter(pedido => pedido.sale_id == id[0])
        
        if(pedido.length == 0) {
            return alertError.open('Pedido não encontrado')
        }

        if(id[1] > pedido[0]['box_qty'] || id[1] === '0') {
            return alertError.open('Está caixa não existe')
        }
        
        this.save(idpedido)
    }

    delete(pedido){
        RemoveBoxes.remove(filial, pedido.sale_id, token_Type, accessToken)
            .then(response => {
                if(response.solution) {
                    alertError.open(`${response.solution}`)
                } else {
                    alertSuccess.open(`${response.info}`)
                    this.updateWhenLoaded()
                }
            })  
    }

    formatHours(){
        const data = new Date()
        let hours = data.getHours()
        let minutes = data.getMinutes()
        
        if(hours < 10){
            hours = '0' + hours  
        }

        if(minutes < 10){
            minutes = '0' + minutes
        }
        
        return hours = `${hours}:${minutes}`
    }

}

export class TableView extends TableData {
    constructor(root){
        super(root)
       
        this.tbody = this.root.querySelector('tbody')
        
        this.update()
        this.addBox()
    }
    
    addBox(){
        const confirmRequest = document.querySelector('#confirm-request')
        let idpedido = this.root.querySelector('#idpedido')
        
        idpedido.onfocus = () => this.close()

        confirmRequest.addEventListener('click', event => {
            idpedido = this.root.querySelector('#idpedido').value
            
            this.onaddBox(idpedido)
            
            idpedido = this.root.querySelector('#idpedido').value = ''
        })    
    }

    update(){
        // if this.pedidos already load
        if(this.pedidos){
                this.removeAlltr()
            
                this.pedidos.forEach(pedido => {
                    
                    const row = this.createRow()
                    row.querySelector('.sale_id').textContent = pedido.sale_id
                    row.querySelector('.box_qty').textContent = pedido.box_qty
                    row.querySelector('.box_qty_checked').textContent = pedido.box_qty_checked
                    
                    row.querySelector('.details').onclick = () => {
                        this.removeAltrAnalytics()
                        this.close()
                        
                        if(pedido.box_qty_checked > 0){
                            communicationApiBoxesAnalytics.search(filial, pedido.sale_id, token_Type, accessToken).then(boxes => boxes.map(box => {
                                const row = this.createRowAnalytics()
                                
                                let boxx = box.box_id.slice(7)
                                row.querySelector('.boxes').textContent = boxx

                                row.querySelector('.hours').textContent = box.checked_time
                                row.querySelector('.user').textContent = box.user_name

                                this.tableAnalytics.append(row)
                            }))

                            document.querySelector('#name-pedido').innerHTML = pedido.customer_name
                            document.querySelector('#cod-pedido').innerHTML = pedido.sale_id
                            
                            document.documentElement.classList.add('open')
                        } else {
                            return alertError.open(`O pedido ${pedido.sale_id} não contém caixas beepadas`)
                        }
                        
                    }

                    row.querySelector('.remove').onclick = () => {
                        const isOk = confirm('Deseja zerar a contagem?')
                    
                        if(isOk){
                            this.delete(pedido)
                        }
                    }

                    this.tbody.append(row)
            })
        } else {
            this.updateWhenLoaded()
        }
    } 

    createRow(){
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
            <td class="details"><i class="ph ph-magnifying-glass"></i></td>
            <td class="sale_id">00054563</td>
            <td class="box_qty">4</td>
            <td class="box_qty_checked">2</td>
            <td class="remove">
                <p>&times;</p>
            </td>
        `
        return tr
    }

    createRowAnalytics(){
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
            <td class="boxes"></td>
            <td class="hours"></td>
            <td class="user">4</td>
        `
        return tr
    }

    removeAlltr(){
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        })
    }

    removeAltrAnalytics(){
        this.tableAnalytics.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        })
    }  

    close(){
        alertError.close() 
        alertSuccess.close()
    }
}