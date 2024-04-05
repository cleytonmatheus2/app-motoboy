//useState, Posicao, kmh 
const loginAPI = async ( userData ) => {

    return new Promise((resolve, reject)=>{

        fetch('https://api.srmenu.app/app/account/login.php', {
            method: "POST",
            headers: {
                    "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(userData)
    
        }).then( function(response) {

           return resolve(response.json());
           
        }).catch(err => {
            reject(err);
        })

        })
    
}


export default loginAPI
