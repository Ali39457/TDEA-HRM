import { StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity,FlatList,Pressable,TextInput } from 'react-native';
import React, { useState,useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-virtualized-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
  {id: "1",icon:"bank",title:"Information Management & IT"},
  {id: "2",icon:"format-list-checkbox",title:"MONITORING EVALUATION & LEARNING"},
  {id: "3",icon:"email",title:"muhammad.ali@tdea.pk"},
  {id: "4",icon:"phone",title:"03035659856"},
  {id: "5",icon:"skype",title:"Ali39457"},
  {id: "6",icon:"qrcode",title:"236-9618"},
];

const DATA1 = [
  {id: "1",icon:"id-card",title:"37405-8397683-8"},
  {id: "2",icon:"venus-mars",title:"Male"},
  {id: "3",icon:"calendar-o",title1:"06-01-1998"},
  {id: "4",icon:"address-book",title1:"Mohalla Eidgah,Street-2b,Rafaqat hussain shaheed stop, chakri road Rwp"},
];



export default function Profile({navigation}) {

  //------------------------States-------------------------//
  const [fullName,setFullName]=useState('');
  const [username,setUsername]=useState('');
  const [Emp_jobTitle,SetEmp_jobTitle]=useState('Consultant');
  const [Emp_About,SetEmp_About]=useState(``);
  // FlatList States
  // const [Emp_OfficialDetails,SetEmp_OfficialDetails]=useState(Emp_OfficialDetails);
  // const [Emp_PersonalDetails,SetEmp_PersonalDetails]=useState(Emp_PersonalDetails);
  const [OfficialDetails ,setOfficialDetails]=useState(true);
  const [PersonalDetails ,setPersonalDetails]=useState(false);
  const [selected, setSelected] = useState(false);

//------------------------ useEffect-------------------------//
useEffect(()=>{
  getData();
  },[])

//------------------------getData (dynamic data to be add in leave) from Api-------------------------//

  const getData = async () => {
  
    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
       setFullName(user.data.fullName)
      //  setUsername(user.data.username)
       SetEmp_About(user.data.fullName + ' is a software engineer working with TDEA Secretariat as a (React Native developer). He is responsible for developing the backend and implementing user interface components using React.js and React Native concepts and workflows, profiling and improving front-end performance')
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }

  
  const Official_Details=()=>{
  return <View style={styles.ViewFlat}>
    <FlatList data={DATA} style={styles.FlatList} listKey="1"
    renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
           <MaterialCommunityIcons name={item.icon} size={24} color="#0f73c9" style={styles.icon} />
           <Text style={styles.textFlat}>{item.title}</Text>
           </View>
    )} />
  </View>
}


const Personal_Details=()=>{
  return <View style={styles.ViewFlat}>
    <FlatList data={DATA1} style={styles.FlatList} listKey="2"
    renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
           <FontAwesome name={item.icon} size={22} color="#0f73c9" style={styles.icon} />
           <Text style={styles.textFlat}>{item.title}</Text>
           <Text style={styles.textFlat1}>{item.title1}</Text>
           </View>
    )} />
  </View>
}

const hideDetails=()=>{
  setOfficialDetails(false)
  setPersonalDetails(true)
}

const showDetails=()=>{
  setOfficialDetails(true)
  setPersonalDetails(false)
}

const showSelected=()=>{
  setSelected(false)
}

const hideSelected=()=>{
  setSelected(true)
}


  return (
<ImageBackground source={require('../assets/bgImage2.png')} resizeMode="cover" style={styles.BgImage}>
   
      
 <View style={styles.ProfileView}>
        <Image source={require('../assets/user_image.png')} resizeMode="cover" style={styles.Image}></Image>
        <View style={{alignItems:"center"}} >
        <Text style={styles.ProfileText}>{fullName}</Text>
        <Text style={styles.ProfileText2}>{Emp_jobTitle}</Text>
        </View>
</View>

<View style={styles.mainEmpContainer}>
      <View style={styles.EmpContainer}>
        <Text style={styles.AboutText}>ABOUT EMPLOYEE</Text>
        <TextInput style={styles.innerAboutText}
         multiline={true} 
         editable={false}
         selectTextOnFocus={false}
         value={String(Emp_About)} /> 
      </View>
</View>

<View style={styles.btn}>

<Pressable onPress={showDetails}  onPressIn={showSelected} 
style={{height:40,width:"40.75%",justifyContent:"center",borderRadius:5,elevation:2,backgroundColor: selected ? "#fff" : "#0f73c9" }}>
        {({ pressed }) => (
          <Text style={{fontFamily:"Montserrat-Medium",fontSize:13,textAlign:"center", paddingHorizontal:20,color:selected ? null : "#fff" }}>
            {pressed ? 'Official Details' : 'Official Details'}
          </Text>
        )}
      </Pressable>
  
<View style={{width:20}}></View>

<Pressable onPress={hideDetails} onPressIn={hideSelected}  
style={{height:40,width:"40.75%",justifyContent:"center",borderRadius:5,elevation:2,backgroundColor: selected ?  "#0f73c9" : "#fff" }}>
        {({ pressed }) => (
          <Text style={{fontFamily:"Montserrat-Medium",fontSize:13,textAlign:"center", paddingHorizontal:20,color:selected ? "#fff" : null }}>
            {pressed ? 'Personal Details' : 'Personal Details'}
          </Text>
        )}
      </Pressable>

</View>

<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

{OfficialDetails ? Official_Details() : null}
{PersonalDetails ? Personal_Details() : null}

</ScrollView>

</ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  BgImage:{
height:"100%",
width:"100%",

  },
  ProfileView:{
flexDirection:"row"
  },

  Image:{
height:80,
width:80,
borderWidth:3,
borderColor:"lightgrey",
overflow:"hidden",
marginTop:35,
marginLeft:40,
borderRadius:5,
  },
  ProfileText:{
    fontSize:15,
    color:"#fff",
    fontFamily:"Montserrat-Medium",
    marginBottom:5,
    marginTop:45,
    paddingHorizontal:20
  },
  ProfileText2:{
  fontSize:14,
  fontFamily:"Montserrat-Regular",
  color:"lightgrey",
  marginTop:-10,
  },
  EmpContainer:{
    height:170,
    backgroundColor:"#fff",
    borderRadius:5,
    width:"100%",
    justifyContent:"center",
    paddingTop:15,
    paddingHorizontal:10,
    elevation:5,
    marginTop:-10,
  },
  mainEmpContainer:{
    padding:23,
  },
  AboutText:{
    fontFamily:"Montserrat-Regular",
    color:"#423cb5",
    fontSize:16,
    marginTop:-10,
    position:"absolute",
    top:15,
    paddingHorizontal:12,
  },
  innerAboutText:{
    marginTop:-10,
    fontFamily:"Montserrat-Regular",
    position:"absolute",
    top:25,
    paddingRight:12,
    color:"grey",
    paddingHorizontal:12,
    fontSize:14,
    height:"106%",
    width:"106%"
  },
  btn:{
    flexDirection:"row",
    justifyContent:"center",
    marginTop:-10,
  },

ViewFlat:{
  padding:23,
},
innerViewFlat:{
  flexDirection:"row",
  borderWidth:1,
  borderRadius:5,
  borderColor:"#f2f2f4",
  marginBottom:2,
  height:40,
  width:"100%",
  alignItems:"center",
  backgroundColor:"#fff",
  elevation:1,
 
},
FlatList:{
  marginTop:-8,
},
icon:{
  paddingHorizontal:8,
},
textFlat:{
  fontFamily:"Montserrat-Regular",
  paddingHorizontal:5,
  width:"90%",
},
textFlat1:{
  fontFamily:"Montserrat-Regular",
  position:"absolute",
  left:46,
  width:"90%",
}


})
