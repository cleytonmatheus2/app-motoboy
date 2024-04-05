
const errorLogAPI = (service, log ) => {

    let data = {
        service: service,
        error: log
    }

    fetch('https://api.srmenu.app/app/services/log.php', {
          method: "POST",
          headers: {
                 "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(data)
   
      }).then( function(response) {
   
         return response.text();
   
      }).then( function(res) {
   
         console.log('ErrorLOG: ', res);
   
      }).catch(err => {
         
              console.log(err);
      })
   
    
   
   }


   export default errorLogAPI