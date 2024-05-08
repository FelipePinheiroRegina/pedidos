export class RemoveBoxes {
    static remove(filial, id, token_type, accessToken){
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token_type + " " + accessToken
            }
          };
          
          return fetch(`http://192.168.10.112:8401/rest/zWsTransport/delete_checks?company_id=${filial}&id=${id}`, options)
            .then(response => response.json())
            .then(response => {
              return response
            })
            .catch(err => console.error(err));
    }   
} 