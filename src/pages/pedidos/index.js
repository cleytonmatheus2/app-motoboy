import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import ListPedidos from './list';


const dadosPedido = [
  { id: 7, 
    status: '3', 
    endereco: {
      rua: 'Rua Retiro dos Franciscanos', 
      numero: '188', 
      bairro: 'Retiro', 
    }, 
    nome: 'Roberto',
    taxa: 5, 
    pagamento: {
      valor: '49.50',
      metodo: 'Pix',
      status: true
    },
    latlng: { 
      lat: -19.858381, 
      lng: -44.134040 
    }, 
    itens: [
      { id:1,
        prod: 'Abobora',
        qtd: 1
      },
      { id: 6,
        prod: 'Pepino',
        qtd: 3
      },
    
    ]
  },
  { id: 3, 
    status: '1', 
    endereco: {
      rua: 'Av Santo Antonio', 
      numero: '256', 
      bairro: 'Guanabara', 
    }, 
    nome: 'Márcia Nogueira',
    taxa: 3, 
    pagamento: {
      valor: '19.8',
      metodo: 'Dinheiro',
      pago: false
    },
    latlng: { 
      lat: -19.858381, 
      lng: -44.134040 
    } 
  },


  { id: 1, 
    status: '2', 
    endereco: {
      rua: 'Rua Bueno Brandão', 
      numero: '55', 
      bairro: 'Floresta', 
    }, 
    nome: 'José Roberto',
    taxa: 5, 
    pagamento: {
      valor: '47.78',
      metodo: 'Débito',
      pago: false
    },
    latlng: { 
      lat: -19.916131,
      lng: -43.925986  
    } 
  }
]


export default function Pedidos({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text>Pedidos</Text>
          <Image style={{width: 25, height: 25, position: 'relative'}} source={require('../../assets/filter.png')}/>
      </View>
      <FlatList
        data={dadosPedido}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={()=> Alert.alert(`Pedido número ${item.id}`, 'Deseja iniciar esta rota?',[{
            text: 'ok',
            onPress: ()=> {navigation.navigate('Mapa', { item })},
            style: 'cancel'
            }])}>
            <View style={styles.lisContainer}>

                <View  style={styles.pedido.infos}>
                    <Text style={styles.pedido.name}>{item.nome}</Text>
                    <Text style={styles.pedido.adrees}>{item.endereco?.rua}, Nº {item.endereco?.numero} - {item.endereco?.bairro}</Text>
                </View>

                <View style={styles.pedido.actions}>
                    <Text style={styles.pedido.earnings}>R$ {item.taxa}</Text>

                { item.status == '1' &&
                    <View style={styles.finishedStatus}>
                        <Text style={styles.finishedStatus.text}>Finalizado</Text> 
                    </View>   
                }
                { item.status == '2' &&
                    <View style={styles.waitingStatus}>
                        <Text style={styles.waitingStatus.text}>Aguardando</Text> 
                    </View>
                }
                { item.status == '3' &&
                    <View style={styles.failStatus}>
                        <Text style={styles.failStatus.text}>Não entregue</Text> 
                    </View>
                }

                </View>

                
            
            </View>

        </TouchableOpacity>
          


        )}
      />


    </View>
  );

}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  lisContainer: {
    backgroundColor: 'white',
    width: "97%",
    height: 100,
    padding: 10,
    paddingLeft: 15,
    margin: 5,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
},
pedido: {
    adrees: {
        fontSize: 14,
        flexWrap: 'nowrap'
    },
    name: {
        fontSize: 15,
        color: '#171626',
        fontWeight: '500'
    },
    order: {
        color: '#8b80f8'
    },
    infos: {
        width: "70%"
    },
    actions: {
        width: '30%',
        height: 75,
        alignItems: 'flex-end',
        
    },       
    earnings: {
        fontSize: 19,
        fontWeight: '500', 
        color: '#478778'
    }
},
finishedStatus: {
    backgroundColor: '#d9fff6',
    borderColor: '#478778',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 21,
    text: {
        color: '#478778',
        fontWeight: '600'
    }
},

waitingStatus: {
    backgroundColor: '#ffeadb',
    borderColor: '#fc6a03',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 21,
    text: {
        color: '#fc6a03',
        fontWeight: '500'
    }
},
failStatus: {
    backgroundColor: '#ffd9d9',
    borderColor: '#b22222',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 21,
    text: {
        color: '#b22222',
        fontWeight: '500',
    }
}

});
