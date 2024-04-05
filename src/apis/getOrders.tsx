
const GetOrders = () => {

    let dados = {
        "api": "test"
     }

   fetch('https://map.srmenu.app/api/api.php', {
         method: "POST",
         headers: {
                "Content-Type": "application/json; charset=utf-8"
         },
         body: JSON.stringify(dados)

     }).then( function(response) {

        return response.text();

     }).then( function(res) {

        console.log(res);

     }).catch(err => {
             console.log(err);
     })

   

}

export default GetOrders

