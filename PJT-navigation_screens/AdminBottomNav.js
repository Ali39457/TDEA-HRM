import React from 'react'
import {StyleSheet,TouchableOpacity} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AdminDrawerNav from './AdminDrawerNav';
import LogOut from '../PJT_main_screens/LogOut';
import Profile from '../PJT_main_screens/Profile';

const Tab = createBottomTabNavigator();

export default function AdminBottomNav({navigation}) {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { position: 'relative',height:40,backgroundColor:"#fff",padding:5,fontFamily:"Montserrat-Regular", },
    }}>


      <Tab.Screen  name="Home" component={AdminDrawerNav} 
          options={{ headerShown:false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={20} onPress={()=>{navigation.navigate('TDEA-HRM')}} />
          ),
        }} />

      {/* <Tab.Screen name="Profile" component={Profile} 
       options={{headerStyle: { backgroundColor: "#0F75BA" },headerTintColor: 'white',headerTitleStyle: {   fontFamily:"Montserrat-Medium", },
       headerTitleAlign: 'center',headerLeft: () => (  
       <TouchableOpacity style={style.backButton}  activeOpacity={0.6} onPress={()=>{navigation.navigate('TDEA-HRM')}}>
       <FontAwesome name="arrow-left" color="white" size={18} style={style.icon} />
       </TouchableOpacity>), 
       tabBarIcon: ({ color }) => (<FontAwesome name="user-circle-o" color={color} size ={20} />
        )
      }}
      /> */}

      <Tab.Screen name="LogOut" component={LogOut}
       options={{headerStyle: { backgroundColor: "#0F75BA" },headerTintColor: 'white',headerTitleStyle: {   fontFamily:"Montserrat-Medium", },
       headerTitleAlign: 'center', tabBarIcon: ({ color }) => (<FontAwesome name="sign-out" color={color} size ={20} />
        )
      }}
      />

    </Tab.Navigator>
  );
}



const style=StyleSheet.create({
  icon:{
    left:21,
    fontWeight:"100",
  },
  backButton:{
    height:50,
    width:50,
    position:"absolute",
    top:18,
  }
})