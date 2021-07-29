/**
*
*@brief
* Encodes a user username and password with AES_GCM with the key stored in a cookie
*
*@return 
* doesnt return but redirects a user to home and stores username,password,id,hash in context
*
*/


export function SendEncodedDetails(values,params,route,setValidRequests,history) {
    var enc = new TextEncoder();
    var iv = enc.encode(values.Username);
    var message = enc.encode(values.Password);
    crypto.subtle
      .importKey("jwk", params.cookie.key, { name: "AES-GCM" }, true, [
        "encrypt",
      ])
      .then((data) => {
        console.log(data);
        crypto.subtle
          .encrypt(
            {
              name: "AES-GCM",
              iv: iv,
            },
            data,
            message
          )
          .then((ciphertext) => {
            var array = new Uint8Array(ciphertext, 0, 5);
            params.setHash(Buffer.from(array).toString('hex'))
              fetch('http://localhost:8080/'+route.link+"/", {
              method: 'POST',
              body:JSON.stringify({"hash":Buffer.from(array).toString('hex')}),
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              }
            }).then((response)=>{
              return response.json()
            }).then(result => {
                    params.setId(result.number)
                    if(result.end){
                      params.setPassword(values.Password);
                      params.setUsername(values.Username);
                      
                      setValidRequests(result.end)
                      history.push("/")
                    }
                  }
                )
          });
      });
  }