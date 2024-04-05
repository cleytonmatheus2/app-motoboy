import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ModalPedidos from '../pedidos/modal';



export default function ListPedidos({ data, nav }) {

/*
useEffect(()=>{

    if(!data.id){
        Alert.alert('Não foi possível acessar as informações',  data [{
            text: 'ok',
            onPress: ()=> {nav.navigate('Mapa', { data } )},
            style: 'cancel'
        }])
    }
    

},[])*/


    return (
        <TouchableOpacity onPress={()=> Alert.alert(`Pedido número ${data.id}`, 'Deseja iniciar esta rota?',[{
            text: 'ok',
            onPress: ()=> {nav.navigate('Mapa', { data },  )},
            style: 'cancel'
        }])}>
            <View style={styles.container}>

                <View  style={styles.pedido.infos}>
                    <Text style={styles.pedido.name}>{data.nome}</Text>
                    <Text style={styles.pedido.adrees}>{data.endereco?.rua}, Nº {data.endereco?.numero} - {data.endereco?.bairro}</Text>
                </View>

                <View style={styles.pedido.actions}>
                    <Text style={styles.pedido.earnings}>R$ {data.taxa}</Text>

                { data.status == '1' &&
                    <View style={styles.finishedStatus}>
                        <Text style={styles.finishedStatus.text}>Finalizado</Text> 
                    </View>   
                }
                { data.status == '2' &&
                    <View style={styles.waitingStatus}>
                        <Text style={styles.waitingStatus.text}>Aguardando</Text> 
                    </View>
                }
                { data.status == '3' &&
                    <View style={styles.failStatus}>
                        <Text style={styles.failStatus.text}>Não entregue</Text> 
                    </View>
                }

                </View>
            
            </View>

        </TouchableOpacity>

    )
}




const styles = StyleSheet.create({
    container: {
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
