export class comunicationApi {
    static search(filial, date, token_type, accessToken){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token_type + " " + accessToken
            }
          }
          
          return fetch(`http://192.168.10.112:8401/rest/zWsTransport/get_list?company_id=${filial}&date_ref=${date}`, options)
            .then(response => response.json())
            .then(response => response.objects.map(object => object))  
            .catch(error => {
              console.error('erro na requisição', error)
              return []
            })
    }   
} 