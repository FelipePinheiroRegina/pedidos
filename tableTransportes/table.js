import { Pedidos } from "./pedidos.js"
import { transport } from "./main.js"

export class TableData {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    save(){
        localStorage.setItem('@pedidos:', JSON.stringify(this.pedidos))
    }

    load(){
        if(localStorage.getItem('@pedidos:') == 'undefined' || localStorage.length == 0){
            this.pedidos =  new Pedidos()
            this.pedidos = this.pedidos[transport]
        } else {
            this.pedidos = JSON.parse(localStorage.getItem('@pedidos:'))
        }
    }

    onaddBox(value){
        const codAndBox = value.split('-')
        console.log(codAndBox)

        this.pedidos.forEach(pedido => {
            if(pedido.id == codAndBox[0]){
                pedido.contado += 1
                this.update()
                this.save()
            } 
        })
    }

    delete(pedido){
        pedido.contado = 0
        this.update()
        this.save()
    }

    openModal(pedido){
        document.querySelector('.analytics').classList.add('open')
    }

    requestAndBox(){
        this.requestAndBox = []
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
        
        confirmRequest.addEventListener('click', event => {
            const { value } = this.root.querySelector('#idpedido')
            
            this.onaddBox(value)
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
                this.openModal(pedido)
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

    removeAlltr(){
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        })
    }
}