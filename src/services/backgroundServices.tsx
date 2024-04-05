import BackgroundService from 'react-native-background-actions';   
import getPosition from './userPosition';
import Geolocation from '@react-native-community/geolocation';
//-- APIS
import {sendPositionStatus, sendUserStatus} from '../apis/sendStatus';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments) => {

  await new Promise( async (resolve) => {

    const { delay } = taskDataArguments;

    for (let i = 0; BackgroundService.isRunning(); i++) {

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
          };
  
          sendPositionStatus(data);
  
        },
        (error) => {
  
          console.log('getCurrentPosition background error', JSON.stringify(error))
         
  
        },
        { enableHighAccuracy: true, maximumAge: 0 }
  
      )

      await sleep(delay);
      
    };
    

  });
};


const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 5000,
  },
};



const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options)
    await BackgroundService.updateNotification({
      taskDesc: 'UDADE NOTIFICATION',
    });
  
  }
  
  const stopBackgroundService = async () => {
    await BackgroundService.stop();
  }




export {
    startBackgroundService,
    stopBackgroundService
 } ;