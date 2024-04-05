import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import MapView, { Polyline } from 'react-native-maps';


export default function Carteira() {

  return (
    <View style={map.container}>
      <MapView
            style={map.map}
            initialRegion={{
              latitude: -19.9412382,
              longitude: -43.9511627,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation
          ><Polyline
          coordinates={[
            {latitude: -19.833907, longitude: -44.148269},
            {latitude: -19.845063, longitude: -44.150818}, 
            {latitude: -19.861086, longitude: -44.156752}
          ]}
          strokeColor="#c23a25"
          strokeWidth={6}
          />
          </MapView><Text>
        <Text style={map.title}>Carteira</Text>
      </Text>
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
  }

});



// TESTE

const map = StyleSheet.create({
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
    width: '100%',
    height: '100%',

  }

});

