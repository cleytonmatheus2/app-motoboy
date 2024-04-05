import { Platform, PermissionsAndroid, Linking, Alert, } from 'react-native';

const requireBackgroundLocationPermission = async () => {

      const backRes = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);

      if(backRes){
         return true
      }else{

          const a = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Permita a localização o tempo todo.',
            message:
              'ACCESS_BACKGROUND_LOCATION Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
          );
  
        if (a=="granted") {
          return true
        }else{
          requireBackgroundLocationPermission()
          return false
        }

      }



}




 

const requireLocationPermission =  () => {

  return new Promise( async (resolve, reject) => {

      const checkCorse = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

      if(checkCorse){

          const checkFine = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    
          if (checkFine) {
              return resolve(true);
          }else{
    
              const resFine = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      
              if (resFine) {
                requireBackgroundLocationPermission()
                return resolve(true);
              }else{
                return reject(false);
              }
    
          }

      }else{

        Alert.alert('Seja bem-vindor(a)',
          "Permita a localização para que o aplicativo funcione corretamente.",
          [
            {
              text: 'Configurar',
              onPress: ()=> { requirePermission() },
              style: 'cancel',
            }
          ]);

          const requirePermission = async()=>{  

            await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

            return reject(false);
            
        } 

      }  
     
  })

}

export default  requireLocationPermission