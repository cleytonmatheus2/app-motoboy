import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, AppState, TouchableHighlight, Animated, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
//-- SERIVCES
//import getPosition from './services/userPosition';
import Geolocation from 'react-native-geolocation-service';
import requireLocationPermission from '../../services/userPermissions';
import { startBackgroundService, stopBackgroundService } from '../../services/backgroundServices';

//-- APIS
import { sendPositionStatus, sendUserStatus } from '../../apis/sendStatus';
//import getRoute from '../../apis/routingStreets';
//-- STYLES
import { standardModeMap, darkModeMap } from './mapStyles';

import ListItens from './listItens';



const { width, height } = Dimensions.get('screen');




export default function Mapa( info ) {

  const pedido = info.route.params?.item
  const pgt = pedido?.pagamento.valor.replace('.', ',')
  
  // MODAL & ANIMATION 

  const [modalItensPedido, setModalItensPedido] = useState<boolean>(false)

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [ bottomPosition, setModalPosition ] = useState(new Animated.Value(-300))

  const showModal = ()=> {

    Animated.sequence([
      Animated.timing(
          bottomPosition, 
          {
              toValue: 0,
              duration: 650,
              useNativeDriver: false
          }
      ),
      Animated.timing(
          bottomPosition, 
          {
              toValue: -50,
              duration: 350,
              useNativeDriver: false
          }
      ),
      Animated.timing(
        bottomPosition, 
        {
            toValue: -10,
            duration: 350,
            useNativeDriver: false
        }
    )
  ]).start()

  }


  const hideModal = () => {
      
    Animated.sequence([
    Animated.timing(
        bottomPosition, 
        { 
            toValue: -5,
            duration: 350,
            useNativeDriver: false
        }
    ),
    Animated.timing(
        bottomPosition, 
        {
            toValue: -300,
            duration: 500,
            useNativeDriver: false
        }
    ),
    
    ]).start()
} 


 // ROUTES & POSITIONS 

  const [ currentRout, setCurrentRout ] = useState<object | null>(null)
  const [position, setPosition] = useState<object | null>(null);
  const [homeState, setHomeState] = useState<boolean>(false);



  const appState = useRef(AppState.currentState);
  const userLocationPermission = useRef(false);
  const mapRef = useRef<MapView>(null);




  const currentPostion = () => {

    Geolocation.getCurrentPosition((position) => {

      setPosition(position);
      sendPositionStatus()

      /*mapRef.current?.animateCamera({
        pitch: 0,
        center: position.coords,    
      })*/

    },
      (error) => {

      }, { enableHighAccuracy: true, maximumAge: 0 }
    )
  };







  useEffect(() => {

    if (pedido) {
      
      setModalStatus(true)

      const usetLat = position.coords.latitude;
      const usetLng = position.coords.longitude;
      const latPedido = pedido.latlng.lat;
      const lngPedido = pedido.latlng.lng;
      fetch(`https://router.project-osrm.org/route/v1/driving/${usetLng},${usetLat};${lngPedido},${latPedido}?geometries=geojson&overview=full`, {
      }).then( function(response) {
         return response.json();
      }).then( function(res) {
console.log(res.routes[0].duration);

        let destinationRoute = res.routes[0].geometry.coordinates

        let pos = []
        destinationRoute.forEach((a)=>{
            let lat = a[1]
            let lng = a[0]
            let latlng = {
              latitude: lat,
              longitude: lng
            }
            pos.push(latlng)
        })
        
        mapRef.current?.fitToCoordinates(pos, {
            edgePadding: {
              top: 70,
              bottom: 350,
              left: 70,
              right: 70
            }
        })

        setCurrentRout(pos)

      }).catch(err => {
       
      })
      
      showModal() 

    }

  }, [pedido]);



  useEffect(() => {

    async function checkLocationPermission() {
        requireLocationPermission().then(() => {
          userLocationPermission.current = true
          setHomeState(true)
        }).catch(() => {
          checkLocationPermission()
        })
    }

    checkLocationPermission()
    currentPostion()

  }, []);




  useEffect(() => {

    if (userLocationPermission.current) {


      let positionIterval = setInterval(() => { 
        sendPositionStatus()
        currentPostion()
      
      }, 5000)

      // DESABLED FOR A WHILE
      /*
      let watch = Geolocation.watchPosition((position) => {
          
        setPosition(position);
        console.log(position);
  
        mapRef.current?.animateCamera({
          pitch: 0,
          center: position.coords,
          
        }) 
        
      
        },
        (error) => {
        
        },
        { enableHighAccuracy: true, distanceFilter: 1, fastestInterval: 50 }
      
      )*/


      const subscription = AppState.addEventListener('change', (nextAppState) => {

        if (nextAppState.match(/inactive|background/)) {

          // API USER STATUS
          sendUserStatus('background');


          clearInterval(positionIterval);

          startBackgroundService();

          // DESABLED FOR A WHILE
          // Geolocation.clearWatch(watch)


        } else {

          // APIS
          sendUserStatus('foreground')

          stopBackgroundService()

          positionIterval = setInterval(() => sendPositionStatus(), 5000)

          // DESABLED FOR A WHILE
          //watch

        }

        appState.current = nextAppState;
      });


      return () => {
        subscription.remove();
        clearInterval(positionIterval)
        // DESABLED FOR A WHILE
        // Geolocation.clearWatch(watch)
      };

    }

  }, [homeState])





  return (
    <View style={styles.container}>

        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: -19.9412382,
              longitude: -44.9511627,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation
            customMapStyle={darkModeMap}
          >{ currentRout && 
            <View>
              <Polyline
              coordinates={currentRout}
              strokeColor="#0f97f2"
              strokeWidth={6}
              fillColor="rgba(255,0,0,0.5)"
              />
              <Marker coordinate={{
                latitude: pedido.latlng.lat,
                longitude: pedido.latlng.lng
              }}>
              </Marker>
            </View>
          }
          </MapView>
      

      { modalStatus &&


        <Animated.View style={{ bottom: bottomPosition, position: "absolute", width: '100%', alignItems: 'center' }}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.title}>{pedido.endereco?.rua}, Nº {pedido.endereco.numero} - {pedido.endereco.bairro}</Text>
            <Text>Distância: 1.6 km</Text>

                <View style={{flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'}}> 
                  <Text style={modalStyles.nome}>{pedido.nome}   |   </Text>
                  <TouchableOpacity onPress={()=> setModalItensPedido(true)
                  }>  
                      <Text>VER ITENS</Text>
                  </TouchableOpacity>
                </View> 
           
            <View style={modalStyles.pagamento.container}>
              <Text style={modalStyles.pagamento.total}>R$ {pgt}  |  </Text>
              <Text style={modalStyles.pagamento.metodo}>{pedido.pagamento.metodo}</Text>
              {pedido.pagamento.status ?
                <View style={modalStyles.pagamento.status.pago}>
                  <Text style={modalStyles.pagamento.status.pago.text}>PAGO</Text>
                </View>
                :
                <View style={modalStyles.pagamento.status.pendente}>
                  <Text style={modalStyles.pagamento.status.pendente.text}>PENDENTE</Text>
                </View>
              }

                
                
           </View>

            <TouchableHighlight style={modalStyles.entregue} onPress={() => hideModal()}>
              <Text style={modalStyles.entregue.btnText}>ENTREGUE</Text>
            </TouchableHighlight>

            <TouchableOpacity style={modalStyles.cancelado} >
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 18, height: 18, marginRight: 4}}  source={require('../../assets/back_red.png')}/>
                <Text style={modalStyles.cancelado.btnText}>DEVOLVER</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Animated.View>


      }

      { modalItensPedido &&
        <ListItens data={{pedido}}  callback={(e)=>setModalItensPedido(e)}/>
      }
      
    </View>
  );

}


const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: width,
    height: height,

  }

});





const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '95%',
    minHeight: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    shadowColor: 'black',
    shadowOpacity: 500,
    shadowOffset: 50,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#d0d4d9',
  },
  title: {
    color: '#616161',
    fontWeight: '500',
    fontSize: 19,
    paddingBottom: 3
  },
  nome: {
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 7,
    paddingBottom: 7
  },
  entregue: { 
    height: 50,
    borderRadius: 8,
    marginTop: 20, 
    backgroundColor: "#171626",
    justifyContent: "center",
    alignItems: "center",
    btnText: {
      color: 'white'
      }
    },
    cancelado: { 
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      btnText: {
        fontWeight: '600',
        color: '#d14141'
        }
      },
    pagamento: {
      container: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      total: {
        fontSize: 18,
        fontWeight: '600',
        paddingRight: 5,
        color: '#478778'
      },
      metodo: {
        fontSize: 15,
        fontWeight: '500',
        paddingRight: 5
      },
      status: {
        pendente: {
          marginLeft: 10,
          backgroundColor: '#ffeadb',
          borderColor: '#fc6a03',
          borderWidth: 1,
          borderRadius: 15,
          paddingRight: 10,
          paddingLeft: 10,
          text: {
            color: '#fc6a03',
            fontWeight: '600'
          }
        },
        pago:{
          marginLeft: 10,
          backgroundColor: '#d9fff6',
          borderColor: '#478778',
          borderWidth: 1,
          borderRadius: 15,
          paddingRight: 10,
          paddingLeft: 10,
          text: {
            color: '#478778',
            fontWeight: '600'
          }
        }
      }
    }

});
