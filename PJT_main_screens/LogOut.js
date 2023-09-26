import React,{useEffect} from 'react'
import {View,Text,StyleSheet,Image,Dimensions,ImageBackground,Alert} from 'react-native';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogOut({navigation}) {

    ////-----useEffect------/////
  useEffect(()=>{
        Alert.alert( 'LOG OUT', 'Session Expired !', 
        [ {text: 'OK', 
        onPress: () =>
        {
          removeToken();
          navigation.replace('Login')
        } }, 
        ]);  
    },[])
  
    ////-----Remove Token------/////
    const removeToken = async () => {
      try {
        const userToken = await AsyncStorage.removeItem('@ApiData')
        
          if (userToken == null) {
              console.log('Token successfully removed!')
            }
      } catch (e) {
          console.log('Failed to remove the Token from the storage!')
      }
  };

  return (
    <ImageBackground source={require('../assets/bgImage.png')} resizeMode="cover" style={style.bgImage}>
    <View style={style.container}>
 
    <View style={style.ImageView}>
    <Image source={require('../assets/logo.png')} style={style.Image} />
    <Text style={style.TextHRM}>HRM</Text>
    </View>
</View>

    </ImageBackground>
  )
}

 
  const style= StyleSheet.create({
    container:{
      flex:1,
    },
    bgImage:{
      height:"100%",
      width:Width,
      position:'relative',
    },
    Image:{
      height:180,
        width:180,
        top:10,
        resizeMode:"contain",
        position:'absolute',    
    },
    ImageView:{
      alignItems:"center",
      padding:75,
    },
    TextHRM:{
    fontSize:50,
    color:"white",
    marginTop:180,
    position:"absolute",
    fontFamily:"Montserrat-SemiBold"
    },
  footer:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:Height-500
  },
  footerText:{
    fontSize:12,
    fontFamily:"Montserrat-Regular",
  }
  
  })