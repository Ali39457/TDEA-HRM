import React, { useState,useEffect } from 'react';
import {Text, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Image,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA=[

  {id:"1",icon:"address-card-o",title:"Attendance",press:""},
  {id:"2",icon:"clipboard",title:"Salary Slip",press:""},
  {id:"3",icon:"file-o",title:"Employee TORs",press:""},
]

export default function EmployeeScreen({navigation}) {

  const [emp_id,setEmp_id]=useState('');
  const [fullName,setFullName]=useState('');
  const [role,setRole]=useState('');

    //------------------------ useEffect-------------------------//
 useEffect(()=>{
  getData();
  },[])

//------------------------getData (dynamic data to be add in leave) from Api-------------------------//

  const getData = async () => {
  
    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
       setEmp_id(user.data.emp_id)
       setFullName(user.data.username)
       setRole(user.data.role)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }



  return (
   
   <ImageBackground source={require('../assets/bgImage1.jpg')} resizeMode="cover" style={styles.bgImage}>
 <View style={styles.ViewProfile}>
 {/* <Image source={require('../assets/image.jpg')} style={styles.Image}></Image>  */}
 <View style={{alignItems:"center"}}>
 <Text style={styles.ProfileText}>Logged in as:</Text>
    <Text style={styles.ProfileText2}>{fullName}</Text>
</View>
 </View>
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
<View style={styles.mainView}>
<Request/>    
</View>

</ScrollView>
    </ImageBackground>
  );
};

export const Request=()=>{

  const navigation = useNavigation();
  const [Role,setRole]=useState('');

    //------------------------ useEffect-------------------------//
 useEffect(()=>{
  getData();
  },[])

//------------------------getData (dynamic data to be add in leave) from Api-------------------------//

  const getData = async () => {
  
    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
       setRole(user.data.role)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }

 
  const renderItem1=({item})=>{ 
    if(item.id<=2)
  {
    return  (
      <View style={styles.mainView}>
       <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(item.press)}>
     <LinearGradient colors={['#009ffd', '#2a2a72']} style={styles.linearGradient}>
      <View style={{flexDirection:"row"}}>
      <FontAwesome name={item.icon} size={20} color="white" style={styles.icon}/>
         <Text style={styles.btnText}>{item.title}</Text>
     </View>
     </LinearGradient>
     </TouchableOpacity> 
      </View>
    )
  }
  }

  const renderItem2=({item})=>{ 
 
    return  (
      <View style={styles.mainView}>
       <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(item.press)}>
     <LinearGradient colors={['#009ffd', '#2a2a72']} style={styles.linearGradient}>
      <View style={{flexDirection:"row"}}>
      <FontAwesome name={item.icon} size={20} color="white" style={styles.icon}/>
         <Text style={styles.btnText}>{item.title}</Text>
     </View>
     </LinearGradient>
     </TouchableOpacity> 
      </View>
    )
  }
   

  return(
   
    <FlatList listKey="1" style={styles.FlatList}
    data={DATA}
    renderItem={renderItem2}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  bgImage:{
    width:Width,
    height:"100%",
  },
  mainView:{
 marginTop:-15,
 padding:13,
 },
 Image:{
  width:80,
  height:80,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: "lightgrey",
  marginTop:35,
  marginLeft:40,
  borderRadius:5,
  },
ViewProfile:{
flexDirection:"row",
justifyContent:"center",
marginBottom:25,

},
ProfileText:{
fontSize:16,
color:"#fff",
fontFamily:"Montserrat-Medium",
marginBottom:5,
marginTop:45,
paddingHorizontal:20
},
ProfileText2:{
fontSize:15,
fontFamily:"Montserrat-Regular",
color:"#fff",
marginTop:-10,
},
  
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    justifyContent:"center",
  },
  btnText:{
    fontSize:15,
    fontFamily:"Montserrat-Regular",
    color:"#fff",
  },
  btn:{
    borderRadius:5,
    height:50,
  },
  FlatList:{
    marginTop:135,
  },
  icon:{
    paddingHorizontal:10,
    top:1
  },
});