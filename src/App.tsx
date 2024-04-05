import React, {  useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

//pages
import Routes from './routes';
import LoginPage from './pages/login';

//ENVIANDO STATUS DO USUARIO

function App(): React.JSX.Element {

  const [ loginState, setloginState ] = useState(false);


  return (
    <SafeAreaView style={styles.safeArea}>
    
      { loginState ?
       <Routes />
        : 
        <View>
          <LoginPage data={null} updateloginState={(res) => setloginState(res)}/>
  
        </View>
      }

    </SafeAreaView>

    
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
  safeArea: {
    flex: 1,
    justifyContent: 'center'
  }
});


export default App;
