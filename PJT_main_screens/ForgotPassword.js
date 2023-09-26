import React,{useState} from 'react';
import {View,Text,StyleSheet, SafeAreaView,TextInput,Dimensions,TouchableOpacity,Image,Alert,ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';


export default function ForgotPassword({navigation}) {


    //------------------------username State will send request to Api-------------------------//

    const[username,setUsername]=useState('');

    //------------------------Store Data into Api-------------------------//
  
    {/*
  
    const StoreData=async()=>{
      try {
          const resp =await axios.post('https://geniepanel.herokuapp.com/users/login',{username:username})
      } catch (error) {
        console.log(error)
      }
    }
  
  */}

  
  return (
    <ImageBackground source={require('../assets/bgImage.png')} resizeMode="cover" style={style.bgImage}>
    <View  style={style.container}>

    <View style={style.ImageView}>
    <Image source={require('../assets/logo.png')} style={style.Image} />
    <Text style={style.TextHRM}>HRM</Text>

    <View style={style.InputView}>
<Text style={style.ResetPasswordText}>Request Password Reset</Text>
<TextInput style={style.TextInput1} placeholder='Username / Email'  placeholderTextColor="lightgrey" 
      onChangeText={(value)=>setUsername(value)} />
</View>


<TouchableOpacity style={style.Button}>
    <LinearGradient colors={['#009ffd', '#2a2a72']} style={style.linearGradient}>
       <Text style={style.BtnLoginText}>Submit</Text>
       </LinearGradient>
    </TouchableOpacity>

    </View>
    </View>
    </ImageBackground>
  )
}

const style= StyleSheet.create({
    container:{
      flex:1,
      width:Width,

    },
    bgImage:{
      height:"100%",
      width:Width,
      position:'absolute',
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
    InputView:{
      width:Width-70,
      justifyContent:"space-around",
      marginTop:Height-390,
      position:"absolute",
      padding:23,
    },
    TextInput1:{
      width:'100%',
      height:36,
      paddingVertical:0.5,
      fontSize:14.5,
      marginBottom:6,
      borderRadius:5,
      borderColor:"#f2f2f4", 
      borderWidth:0.5,
      justifyContent:"center",
      elevation:1,
      backgroundColor:"white",
      fontFamily:"Montserrat-Regular"
  },
  Button:{
    borderRadius:10,
    height:38,
    alignItems:"center",
    top:Height-400,
    marginTop:30,
  },
  BtnLoginText:{
    fontSize:15,
    color:"white",
    fontFamily:"Montserrat-Medium"
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    width:Width-250,
    justifyContent:"center",
    alignItems:"center",
  },
  ResetPasswordText:{
    textAlign:"center",
    marginBottom:10,
    fontSize:16,
    fontFamily:"Montserrat-Medium"
  }

})
