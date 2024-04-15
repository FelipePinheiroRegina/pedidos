import { Braspress, Rodonaves } from "./pedidos"

export class TableData {
    constructor(root){
        console.log(root)
        this.root = document.querySelector(root)
        
    }
}

export class TableView extends TableData {
    constructor(root){
        super(root)
        console.log(root)
        this.tbody = this.root.querySelector('tbody')
        console.log(this.tbody)
    }
    
    removeAlltr(){
        tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
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
    
    update(){
        removeAlltr()

        pedidos.forEach(pedido => {
        
            const row = createRow()
            row.querySelector('.pedido').textContent = pedido.id
            row.querySelector('.qtd-cx').textContent = pedido.qtdCx
            row.querySelector('.contado').textContent = pedido.contado
    
            tbody.append(row)
        })
    } 
}