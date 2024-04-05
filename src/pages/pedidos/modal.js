import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';

export default function ModalPedidos({infos} , setModal) {


  console.log('ModalPedidos: ', infos);


    const pgt = infos.pagamento.valor.replace('.', ',')

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





useEffect(()=>{
  if(setModal)
    showModal()  
})




  return (
    <Animated.View style={{bottom: bottomPosition, position: "absolute", width: '100%', alignItems: 'center'}}>
        <View style={modalStyles.container}>
            <Text style={modalStyles.title}>{infos.endereco.rua}, Nº {infos.endereco.numero} - {infos.endereco.bairro}</Text>
            <Text style={modalStyles.nome}>{infos.nome}</Text>

            <View style={modalStyles.pagamento.container}>
              <Text style={modalStyles.pagamento.total}>R$ {pgt}  |  </Text>
              <Text style={modalStyles.pagamento.metodo}>{infos.pagamento.metodo}</Text>
              { infos.pagamento.status ?
                <View style={modalStyles.pagamento.status.pago}>
                    <Text style={modalStyles.pagamento.status.pago.text}>PAGO</Text>
                </View> 
                :
                <View style={modalStyles.pagamento.status.pendente}>
                    <Text style={modalStyles.pagamento.status.pendente.text}>PENDENTE</Text>
                </View>   
              }
            </View>
            
            <TouchableHighlight style={modalStyles.entregue} onPress={()=> hideModal()}>
                <Text style={modalStyles.entregue.btnText}>ENTREGUE</Text>
            </TouchableHighlight>

        </View>
        
    </Animated.View>
  );

}

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
    fontWeight: '500',
    fontSize: 19
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

