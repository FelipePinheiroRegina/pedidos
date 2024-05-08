export class communicationApiPedidos {
        static search(filial, date, id, token_type, accessToken){
            const options = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token_type + " " + accessToken
                }
              };
              
            return fetch(`http://192.168.10.112:8401/rest/zWsTransport/get_sales?company_id=${filial}&date_ref=${date}&id=${id}`, options)
                .then(data => data.json())
                .then(data => data.objects.map(pedido => {
                    return {
                      sale_id: pedido.sale_id,
                      customer_name: pedido.customer_name,
                      box_qty: pedido.box_qty,
                      box_qty_checked: pedido.box_qty_checked,
                      box_checked_ids: pedido.box_checked_ids
                    }
                }))
                .catch(err => console.error(err));
        }   
    } 