const buttonTransport = document.querySelector('.search-transport')
    
function formatDateTransport(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const dateNow = formatDateTransport(new Date())

buttonTransport.addEventListener('click', event => {
    event.preventDefault()
    
    const transport = document.querySelector('#idtransport').value
    const date = document.querySelector('#iddate').value
    
    if(date == dateNow){
        localStorage.clear()
        window.location.href = `https://felipepinheiroregina.github.io/pedidos/tableTransportes/index.html?transport=${transport}`
    } else {
        alert('No orders found')
    }
})

