export function whichTransport() {
    const buttonTransport = document.querySelector('.search-transport')
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const dateNow = formatDate(new Date())
    
    buttonTransport.addEventListener('click', event => {
        event.preventDefault()
        
        const transport = document.querySelector('#idtransport').value
        const date = document.querySelector('#iddate').value
        const dateFormat = new Date(date).toLocaleDateString('pt-BR')
        console.log(dateFormat)
        /*
        if(date == dateNow){
            window.location.href = `/tableTransportes/index.html?transport=${transport}`

        } else {
            alert('No orders found')
        }*/
    })
}
