import React, { useState} from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default function Perfil() {

  const [ darkMode, setDarkMode ] = useState(false)

  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.title}>Estilo do Mapa</Text>
      </Text>
      <Switch
        trackColor={{false: '#777', true: '#8bf'}}
        thumbColor={darkMode ? '#00f' : '#444'}
        value={darkMode}
        onValueChange={()=> setDarkMode(!darkMode)}
      />
      <Text style={styles.title}>{ darkMode ? 'Dark' : 'Light' }</Text>
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

