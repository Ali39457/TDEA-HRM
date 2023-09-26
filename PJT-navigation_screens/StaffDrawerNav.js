import React,{useState,useEffect} from 'react';
import {StyleSheet,TouchableOpacity,Text,Image,View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmpDashboard from '../PJT_main_screens/EmpDashboard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import RequestScreen from '../PJT_Drawer_Screens/RequestScreen';
import StatusScreen from '../PJT_Drawer_Screens/StatusScreen';
import DeclarationScreen from '../PJT_Drawer_Screens/DeclarationScreen';
import EmployeeScreen from '../PJT_Drawer_Screens/EmployeeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
export default function StaffDrawerNav({navigation}) {

  const [fullName,setFullName]=useState('');

  //------------------------ useEffect-------------------------//
useEffect(()=>{
getData();
},[])

//------------------------getData (dynamic data to be add in leave) from Api-------------------------//

const getData = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
     setFullName(user.data.username)
    
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
}

  //--- CustomDrawerContent ---//

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView contentContainerStyle={{paddingTop: 110 }}
     {...props}>
        <DrawerItemList {...props} />
          <View style={style.Profile}>
          <TouchableOpacity 
          // onPress={()=>navigation.navigate('Profile')}
          >
          <Image source={require('../assets/user_image.png')} style={style.ProfileImage}></Image>
            <Text style={style.ProfileText}>{fullName}</Text>
          </TouchableOpacity> 
          
          </View>        
      </DrawerContentScrollView>
    );
  }
 //--- CustomDrawerContent ---//

  return (
      <Drawer.Navigator initialRouteName="Home" 
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
       screenOptions={{
       headerStyle: { backgroundColor:"#0F75BA" },headerTintColor: 'white',headerTitleStyle: { fontFamily:"Montserrat-Medium", },headerTitleAlign: 'center',
       drawerItemStyle: {marginBottom:2,},drawerActiveBackgroundColor : "#0F75BA", drawerActiveTintColor: "white",
       drawerLabelStyle:{fontFamily:"Montserrat-Regular"},
       drawerStyle: { backgroundColor: 'white',width: 240,},
     }}>

<Drawer.Screen name="TDEA-HRM" component={EmpDashboard} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="home" color={color} size ={23} style={{right:-20,
          height:30,
          width:45,
          paddingHorizontal:10,
          paddingVertical:1.5}}  /> )  }} />


<Drawer.Screen name="Employee" component={EmployeeScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="user" color={color} size ={25} style={{right:-22,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}    /> )  }} />


<Drawer.Screen name="Requests" component={RequestScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="calendar" color={color} size ={25} style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}  /> )   }} />

<Drawer.Screen name="Status" component={StatusScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="list-ul" color={color} size ={25}  style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}} /> )  }} />

<Drawer.Screen name="Declarations" component={DeclarationScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="pencil-square-o" color={color} size ={25} style={{right:-21,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}  /> )  }} />

      </Drawer.Navigator>
  );
}


const style=StyleSheet.create({
  icon:{
    right:20,
  },
  ProfileImage:{
    width: 60,
    height: 60,
    borderRadius: 360,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
    marginTop:15,
    },
    Profile:{
      paddingHorizontal:12,
      position:"absolute",
      backgroundColor:"#0F75BA",
      width:"100%",
      height:110,
    },
    ProfileText:{
      marginTop:80,
      position:"absolute",
      fontSize:13,
      fontFamily:"Montserrat-Regular",
      color:"white"
    },


})