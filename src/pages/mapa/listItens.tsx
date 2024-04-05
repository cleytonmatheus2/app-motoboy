import React  from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";

export default function ListItens({data, callback}) {

    const itens = data.pedido.itens
    console.log(itens);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Itens do Pedido</Text>
            <FlatList
                data={itens}
                keyExtractor={ item => item.id}
                renderItem={ ({item})=> (
                    <View>
                        <Text style={styles.listItens}>{item.qtd}x - {item.prod}</Text>
                    </View>
                )}
                style={{paddingTop: 10}}
            />
            <TouchableOpacity onPress={()=> callback(false)} style={{alignItems: 'flex-end'}}>
                <Text style={styles.btnFechar}>FECHAR</Text>
            </TouchableOpacity>
        </View>
    )
    
}



const styles = StyleSheet.create({
    container: {
        width: '70%',
        minHeight: 300,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderBlockColor: '#ebebeb',
    }, 
    title: {
        paddingTop: 10,
        paddingLeft: 15,
        fontWeight: '600'
    },
    listItens: {
        paddingLeft: 15
    },
    btnFechar: {
        paddingBottom: 15,
        paddingRight: 20,
        fontWeight: '600',
        color: '#0783db'
    }

})