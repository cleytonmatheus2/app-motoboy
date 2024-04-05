import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput, Image, TouchableHighlight, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import loginAPI from "../../apis/login";


export default function LoginPage(data) {

    
    const [ user, setUser] = useState("");
    const [ pass, setPass] = useState("");

    const [ loginStatus, setloginStatus] = useState(null);
    const [ isLoading, setisLoading] = useState(false);

    
    const login = () => {

        userData = {
            user: 'a',
            pass: 1
        };

        setisLoading(true)
        
        setTimeout( async () => {

            let res = await loginAPI(userData),
                 loginResponse = JSON.parse(res)

            if (loginResponse.status=="accepted"){
                data.updateloginState(true)
                setloginStatus(loginResponse.status)
            }else{
                setloginStatus(loginResponse.status)
                setisLoading(false)
            }


            console.log(loginResponse);

        }, 1000)


    }



    return (
        <SafeAreaView>

            <View style={styles.container}>
                <TextInput style={styles.input} value={user}
                onChangeText={text=> setUser(text)} placeholder="Usuário" placeholderTextColor={"#7B8794"}></TextInput>
                <Image style={styles.iconUser} source={require('../../assets/user.png')}/>
            </View>   

            <View style={styles.container}>                  
                <TextInput style={styles.input} value={pass}
                onChangeText={text=> setPass(text)} placeholder="Senha" placeholderTextColor={"#7B8794"}></TextInput>
                <Image style={styles.iconLock} source={require('../../assets/lock.png')}/>
            </View>    


            <TouchableHighlight 
                style={{ 
                height: 50,
                marginHorizontal: 20,
                borderRadius: 8,
                marginTop: 20, 
                backgroundColor: "#171626",
                justifyContent: "center",
                alignItems: "center"  
                }} 
                onPress={login}   
            >
                { isLoading ?
                    <ActivityIndicator size="small" color="#fff"/>
                    :
                    <Text style={{color: "white"}}>LOGAR</Text> 
                }
                   
            </TouchableHighlight>

           { loginStatus == "rejected" &&
            <View  style={{alignContent: "center", alignItems: "center"}}>
                <Text style={{position: "absolute", marginTop: 25, color: "#e0816e"}}>Usuário ou senha incorretos.</Text> 
            </View>
           }     

        </SafeAreaView>

    );
}


