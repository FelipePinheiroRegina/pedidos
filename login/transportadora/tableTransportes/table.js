import { Pedidos } from './pedidos.js'
import { transport } from "./main.js"
import { alertError } from "../../error/alertError.js"

export class TableData {
    constructor(root){
        this.root = document.querySelector(root)
        
        this.tableAnalytics = document.querySelector('.analytics table tbody')

        this.load()
    }

    save(){
        localStorage.setItem('@pedidos:', JSON.stringify(this.pedidos))
    }

    load(){
        this.pedidos = new Pedidos()

        if(localStorage.getItem('@pedidos:') == 'undefined'){
            this.pedidos =  new Pedidos()
            this.pedidos = this.pedidos[transport]
        } else {
            this.pedidos = JSON.parse(localStorage.getItem('@pedidos:'))
        }
    }
    
    onaddBox(idpedido){
        const codAndBox = idpedido.split('-')
       
        this.pedidos.forEach(pedido => {
            if(pedido.id == codAndBox[0]){
                const checkBoxExists = pedido.cxs.includes(codAndBox[1])
                console.log(checkBoxExists)
                if(checkBoxExists){
                    return alertError.open('Esta caixa já foi beepada')
                }

                if(pedido.contado < pedido.qtdCx){
                    pedido.contado += 1
                } else {
                    return alertError.open('Este pedido atingiu o limite total de caixas')
                }

                pedido.cxs += codAndBox[1] + ';'
                pedido.horas += this.formatHours() + ';'
            
                this.update()
                this.save()
            } 
        })  
    }

    delete(pedido){
        pedido.contado = 0
        pedido.cxs = []
        pedido.horas = []
        this.update()
        this.save()
    }

    formatHours(){
        const data = new Date()
        let horas = data.getHours()
        let minutes = data.getMinutes()
        
        if(horas < 10){
            horas = '0' + horas  
        }

        if(minutes < 10){
            minutes = '0' + minutes
        }
        
        return horas = `${horas}:${minutes}`
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
        
        idpedido.oninput = () => alertError.close()
        idpedido.onfocus = () => alertError.close()

        confirmRequest.addEventListener('click', event => {
            idpedido = this.root.querySelector('#idpedido').value
            
            this.onaddBox(idpedido)
        })
        
    }

    update(){
        this.removeAlltr()

        this.pedidos.forEach(pedido => {
            const row = this.createRow()
            row.querySelector('.pedido').textContent = pedido.id
            row.querySelector('.qtd-cx').textContent = pedido.qtdCx
            row.querySelector('.contado').textContent = pedido.contado
            
            row.querySelector('.detalhes').onclick = () => {
                this.removeAltrAnalytics()
                alertError.close()

                if(pedido.cxs.length > 0){
                    document.querySelector('#cod-pedido').innerHTML = pedido.id
                    let caixa = pedido.cxs.split(';')
                    let horas = pedido.horas.split(';')
                    caixa.pop()
                    horas.pop()
                    
                    for(let i = 0; i < caixa.length; i++){
                        const row = this.createRowAnalytics()
                        row.querySelector('.caixas').textContent = caixa[i]
                        row.querySelector('.horas').textContent = horas[i]
                        row.querySelector('.conferente').textContent = 'Tiago'

                        this.tableAnalytics.append(row)
                    }
                    
                    document.querySelector('.analytics').classList.add('open')
                } else {
                    return alertError.open('Este pedido não contem caixas beepadas')
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
    } 

    createRow(){
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
            <td class="detalhes"><i class="ph ph-magnifying-glass"></i></td>
            <td class="pedido">00054563</td>
            <td class="qtd-cx">4</td>
            <td class="contado">2</td>
            <td class="remove">
                <p>&times;</p>
            </td>
        `
        return tr
    }

    createRowAnalytics(){
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
            <td class="caixas"></td>
            <td class="horas"></td>
            <td class="conferente">4</td>
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
}