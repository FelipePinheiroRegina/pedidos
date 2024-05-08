export class communicationApiSaveBoxes {
    static save(filial, id, user, token_type, accessToken){
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token_type + " " + accessToken
            }
          };
          
          return fetch(`http://192.168.10.112:8401/rest/zWsTransport/new_check?company_id=${filial}&id=${id}&user_login=${user}`, options)
            .then(response => response.json())
            .then(response => {
              return response
            })
            .catch(err => console.error(err));
    }   
} 