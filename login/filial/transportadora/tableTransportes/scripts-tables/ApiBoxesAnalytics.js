export class communicationApiBoxesAnalytics {
    static search(filial, idpedido, token_type, accessToken){
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token_type + " " + accessToken
            }
          };
          
          return fetch(`http://192.168.10.112:8401/rest/zWsTransport/get_checks?company_id=${filial}&id=${idpedido}`, options)
            .then(data => data.json())
            .then(data => data.objects.map(pedido => {
                return {
                  user_name: pedido.user_name,
                  box_id: pedido.box_id,
                  checked_date: pedido.checked_date,
                  checked_time: pedido.checked_time
                }
            }))
            .catch(err => console.error(err));
    }   
} 