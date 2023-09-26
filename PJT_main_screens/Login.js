import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet, SafeAreaView,TextInput,Dimensions,TouchableOpacity,Image,Alert,ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import NetInfo from "@react-native-community/netinfo";

export default function Login({navigation}) {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');

  const [show, setShow] = useState(false);
  const [Visible, setVisible] = useState(true);

//--------------------------------States------------------------------------//
const URL=`https://hrm.tdea.pk/theme/actions/process/API/login.php?username=${username}&password=${password}`

const Login = async () => {
  try {
    const resp = await axios.post(URL, {username:username,password:password}, {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
    );

      if(resp.data.data!=null){
        setTimeout(()=>{

           if (resp.data!= null && resp.data.data.username==="ceo@tdea.pk") {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('AdminBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data))
            }

           else if (resp.data!= null && resp.data.data.username==="mud.rizvi@tdea.pk") {
              AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
              navigation.navigate('AdminBottomNav')
              Alert.alert(resp.data.message)
              // console.log(JSON.stringify(resp.data))
              }

              
           else if (resp.data!= null && resp.data.data.username==="amjad.shah@tdea.pk") {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('AdminBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data))
            }

          else if (resp.data!= null && resp.data.data.role==="Admin") {
          AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
          navigation.navigate('AdminBottomNav')
          Alert.alert(resp.data.message)
          // console.log(JSON.stringify(resp.data))
          }

          else if (resp.data!= null  && (resp.data.data.role==="Employee" && resp.data.data.secondary_role==="Supervisor"))
          {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('AdminBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data.data.status))
          }

          else if (resp.data!= null && resp.data.data.role==="SHR")
          {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('AdminBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data.data.status))
          }

          else if (resp.data!= null && resp.data.data.role==="Employee")
          {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('StaffBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data.data.status))
          }

          else if (resp.data!= null && resp.data.data.role==="Consultant")
          {
            AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
            navigation.navigate('StaffBottomNav')
            Alert.alert(resp.data.message)
            // console.log(JSON.stringify(resp.data.data.status))
          }
          else
          {
            console.log("Error")
          }
          
          },200)
      }
      else{
        Alert.alert("Invalid Credentials!")
      }
    

  } catch (error) {
    // Handle any errors
    if (error.response) {
      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
};

  return (
    <ImageBackground source={require('../assets/bgImage.png')} resizeMode="cover" style={style.bgImage}>
    <View  style={style.container}>

    <View style={style.ImageView}>
    <Image source={require('../assets/logo.png')} style={style.Image} />
    <Text style={style.TextHRM}>HRM</Text>

    <View style={style.InputView}>
<TextInput style={style.TextInput1} placeholder='Username / Email'  placeholderTextColor="grey" 
      onChangeText={(value)=>setUsername(value)} />
   
   <View>
<TextInput style={style.TextInput2} placeholder='Password' placeholderTextColor="grey" 
     secureTextEntry={Visible}  onChangeText={(value)=>setPassword(value)} />
  
    
    {/* ---EYE BUTTON--- */}

    <TouchableOpacity style={style.BtnEye}   onPress={()=>{
      setShow(!show);
      setVisible(!Visible);
    }}>  
         <MaterialCommunityIcons
          name={show===false ? "eye-outline" : "eye-off-outline"} 
          color={show===false ? "grey" : "#000"} 
          size={20}
           />    
    </TouchableOpacity>
</View>
    {/* ---EYE BUTTON--- */}
</View>


<TouchableOpacity style={style.Button} onPress={Login}>
      <LinearGradient colors={['#009ffd', '#2a2a72']} style={style.linearGradient}>
       <Text style={style.BtnLoginText}>LOGIN</Text>
       </LinearGradient>
    </TouchableOpacity>

<TouchableOpacity style={style.TextForgotBtn} activeOpacity={0.5} onPress={()=>navigation.navigate('Forgot Password')}>
    <Text style={style.TextForgot}>Forgot Password?</Text>
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
      marginBottom:10,
      borderRadius:7,
      borderColor:"grey", 
      borderWidth:0.5,
      justifyContent:"center",
      elevation:3,
      backgroundColor:"white",
      fontFamily:"Montserrat-Regular"
  },
  TextInput2:{
    width:'100%',
    height:36,
    paddingVertical:0.5,
    fontSize:14.5,
    borderRadius:7,
    borderColor:"grey",  
    borderWidth:0.5,
    justifyContent:"center",
    elevation:3,
    backgroundColor:"white",
    fontFamily:"Montserrat-Regular",
  },
  BtnEye:{
    position:'absolute',
    right:-3,
    width:45,
    height:45,
    elevation:5,
    justifyContent:"center",
    alignItems:"center",
    top:-5
  },
  
  Button:{
    borderRadius:10,
    height:38,
    alignItems:"center",
    top:Height-360,
    marginTop:30,
  },
  BtnLoginText:{
    fontSize:15,
    color:"white",
    fontFamily:"Montserrat-Medium"
  },
  TextForgotBtn:{
    top:Height-295,
    marginTop:20,
    position:'absolute',
  },
  TextForgot:{
    fontSize:14,
    color:"#000A",
    fontFamily:"Montserrat-Regular"
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    width:Width-250,
    justifyContent:"center",
    alignItems:"center",
  },

})