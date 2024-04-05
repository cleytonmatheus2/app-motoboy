import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Image } from 'react-native';

import Mapa from '../pages/mapa/index'
import Pedidos from '../pages/pedidos/index'
import Carteira from '../pages/carteira/index'
import Perfil from '../pages/perfil/index'


const Tab = createBottomTabNavigator();

export default function TabRoutes() {

    return (

        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
            //  backgroundColor: '#171626',
                borderTopWidth: 0
            }

        }}>

            <Tab.Screen
                name="Mapa"
                component={Mapa}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused})=>{
                        if (focused) {
                            return <Image source={require('../assets/standard/map_fill.png')} style={{width: 26, height: 26}}/>
                        }
                        return <Image source={require('../assets/map.png')} style={{width: 27, height: 27}}/>
                    }

                }}
            />

            <Tab.Screen
                name="Pedidos"
                component={Pedidos}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused})=>{
                        if (focused) {
                            return <Image source={require('../assets/standard/invoice_fill.png')} style={{width: 23, height: 23}}/>
                        }
                        return <Image source={require('../assets/invoice.png')} style={{width: 23, height: 23}}/>
                    }

                }}
            />

            <Tab.Screen
                name="Carteira"
                component={Carteira}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused})=>{
                        if (focused) {
                            return <Image source={require('../assets/standard/wallet_fill.png')} style={{width: 25, height: 25}}/>
                        }
                        return <Image source={require('../assets/wallet.png')} style={{width: 25, height: 25}}/>
                    }

                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused})=>{
                        if (focused) {
                            return <Image source={require('../assets/standard/user_fill.png')} style={{width: 25, height: 25}}/>
                        }
                        return <Image source={require('../assets/standard/user.png')} style={{width: 25, height: 25}}/>
                    }

                }}
            />

        </Tab.Navigator>

    )

}