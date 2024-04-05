
const getRoute = () => {

    return new Promise( (resolve, reject) => {
    
       fetch('https://router.project-osrm.org/route/v1/driving/-44.148216,-19.833875;-44.156756,-19.861041?geometries=geojson&overview=full', {
         }).then( function(response) {
    
            return response.json();

         }).then( function(res) {

            console.log(  res);
            
            return resolve(res)
            
         }).catch(err => {
            reject(err)
         })


    })
}

export default getRoute

