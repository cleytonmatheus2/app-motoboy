import Geolocation from 'react-native-geolocation-service';

const getPosition = async () => {

  return new Promise((resolve, reject) => {


    Geolocation.getCurrentPosition(
      (position) => {

        let lat, lng, data;

        lat = position.coords.latitude;
        lng = position.coords.longitude;
        kmh = Number(position.coords.speed) * Number(1.609344);

        data = {
          lat: lat,
          lng: lng,
          kmh: parseInt(kmh)
        }

        resolve(data);
        

      },
      (error) => {

        console.log('getCurrentPosition background error', JSON.stringify(error))

        reject(error)

      },
      { enableHighAccuracy: true, maximumAge: 0 }

    )
  })


}


export default getPosition
