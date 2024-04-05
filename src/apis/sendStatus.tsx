import Geolocation from "react-native-geolocation-service";
//import Geolocation from "@react-native-community/geolocation";
//useState, Posicao, kmh 

const sendPositionStatus = () => {

      Geolocation.getCurrentPosition((position) => {
           
          let data = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                heading: position.coords.heading,
                kmh: position.coords.speed
              }
       
              fetch('https://api.srmenu.app/app/services/live_location.php', {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json; charset=utf-8"
                  },
                  body: JSON.stringify(data)

               }).then( function(response) {

                  return response.text();

               }).then( function(res) {

                  console.log("PositionStatus: ",res);

               }).catch(err => {
                  
                     console.log(err);
               })

        },
        (error) => {
        
         
        },
        { enableHighAccuracy: true, maximumAge: 0 }
  
      )
    


 

 

}

const sendUserStatus = ( state ) => {

   fetch('https://api.srmenu.app/api/api2.php', {
         method: "POST",
         headers: {
                "Content-Type": "application/json; charset=utf-8"
         },
         body: JSON.stringify(state)
  
     }).then( function(response) {
  
        return response.text();
  
     }).then( function(res) {
  
        //console.log(res);
  
     }).catch(err => {
             console.log(err);
     })
  
   
  
  }



export {
         sendPositionStatus,
         sendUserStatus
      }