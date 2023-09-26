import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ImageBackground} from 'react-native';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  
  //--------------------------------useEffect------------------------------------//

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      retrieveData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

  }, [navigation]);

    //--------------------------------retrieveData------------------------------------//

  const retrieveData = async () => {

    try {
       const Token = await AsyncStorage.getItem("@ApiData");
       const user=JSON.parse(Token)
      //  console.log(user.data.role)

       //  IF User is already logged in
     if(user!=null){
      setTimeout(()=>{
        if (Token != null && user.data.username==="ceo@tdea.pk") {
          navigation.navigate('AdminBottomNav')
        }

        else if (Token != null && user.data.username==="mud.rizvi@tdea.pk") {
          navigation.navigate('AdminBottomNav')
        }

        else if (Token != null && user.data.username==="amjad.shah@tdea.pk") {
          navigation.navigate('AdminBottomNav')
        }

        else if (Token != null && user.data.role==='Admin') {
          navigation.navigate('AdminBottomNav')
        }

        else if(Token != null && (user.data.role==='Employee' && user.data.secondary_role==='Supervisor')){
          navigation.navigate('AdminBottomNav')
        }

        else if(Token != null && user.data.role==='SHR'){
          navigation.navigate('AdminBottomNav')
        }

        else if(Token != null && user.data.role==='Employee'){
          navigation.navigate('StaffBottomNav')
        }

        else if(Token != null && user.data.role==='Consultant'){
          navigation.navigate('StaffBottomNav')
        }
       
        },300)
     }
      //  IF User is not logged in
     else {
      navigation.navigate('Login')
    }
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  };


  return (
    <ImageBackground source={require('../assets/bgImage.png')} resizeMode="cover" style={style.bgImage}>
    
    <View style={style.container}>
    <View style={style.ImageView}>
    <Image source={require('../assets/logo.png')} style={style.Image} />
    <Text style={style.TextHRM}>HRM</Text>
    </View>
<View style={style.footer}>
<Text style={style.footerText}>Trust for Democratic Education & Accountability - TDEA</Text>
<Text style={style.footerText}>Copyright © 2022 TDEA</Text>
</View>
    
</View>
    </ImageBackground>
      
  )
};


const style= StyleSheet.create({
  container:{
    flex:1,
    padding:20,
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
    padding:95,
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