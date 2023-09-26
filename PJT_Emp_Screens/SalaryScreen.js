import React, { useState,useEffect } from 'react';
import {Text,Alert,NativeModules, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Image,FlatList,PermissionsAndroid,Platform,LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import RNFetchBlob from 'rn-fetch-blob';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");
const { DownloadService } = NativeModules;
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA=[
  {key:"emp_01",year:"23-May",emp_name:"Muhammad Ali",download:"Download"},
  {key:"emp_02",year:"23-May",emp_name:"Muhammad Imran",download:"Download"},
  {key:"emp_03",year:"23-May",emp_name:"Muzafar Shah",download:"Download"},
  {key:"emp_04",year:"23-May",emp_name:"Waleed Ijaz",download:"Download"},
  {key:"emp_05",year:"23-May",emp_name:"Rana Amir Qaqas",download:"Download"},

]

export default function SalaryScreen() {

  const [emp_id,setEmp_id]=useState('');
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
       setEmp_id(user.data.emp_id)
       setFullName(user.data.username)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }


  //------------------------getData from Api-------------------------//
  const [SalaryData,setSalaryData]=useState([]);
   {/*
    
   useEffect(()=>{
   getData();
   },[])
   
   const getData = async () => {
   
     try {
       await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
         var user=JSON.parse(value)
        setSalaryData((user.member_list))
       }})
       
     } catch (e) {
       console.log('Failed to fetch the data from storage!', e)
     }
   
   }
   
   */}


   
  //------------------------renderItem-------------------------//

  const renderItem=({item})=>{
    return  <View style={styles.maintitle1}>
      <View style={styles.title_01}>
       <Text style={styles.textTitle1}>{item.key}</Text>
      </View>

      <View style={styles.title_02}>
       <Text style={styles.textTitle1}>{item.year}</Text>
      </View>

      <View style={styles.title1}>
      <Text style={styles.textTitle1}>{item.emp_name}</Text>
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={handleDownloadFile}>
        <Text style={styles.textTitle2}>{item.download}</Text>
        </TouchableOpacity>
      </View>

      </View>  
    
    
  }


//------------------------Download file code-------------------------//

  const handleDownloadFile = () => {
    const downloadUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with the actual file URL
    const { dirs } = RNFetchBlob.fs;
    const fileDir = dirs.DocumentDir; // Choose the desired directory to save the file
    const fileName = 'file.pdf'; // Set the desired file name

    RNFetchBlob.config({
      fileCache: true,
      path: `${fileDir}/${fileName}`,
    })
      .fetch('GET', downloadUrl)
      .then((res) => {
        console.log('File downloaded at:', res.path());
        Alert.alert("File Downloaded!")
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };


  //------------------------Main code-------------------------//
  

  return (
    <ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.bgImage}>

{/* <View style={styles.ViewProfile}>
 <Image source={require('../assets/image.jpg')} style={styles.Image}></Image> 
 <View style={{alignItems:"center"}}>
    <Text style={styles.ProfileText}>Logged in as:</Text>
    <Text style={styles.ProfileText2}>{fullName}</Text>
</View>
 </View> */}

 <View style={styles.maintitle}>
       <View style={styles.title_0}>
         <Text style={styles.textTitle}>Emp ID</Text>
        </View>
        <View style={styles.title_1}>
         <Text style={styles.textTitle}>Month</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.textTitle}>Employee Name</Text>
        </View>

        <View style={styles.titleD}>
        <Text style={styles.textTitle}>Download</Text>
        </View>

        </View>  
 
 <ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
<View style={styles.mainView}>
    
        <FlatList listKey="1" style={styles.FlatList}
        data={DATA}
        renderItem={renderItem}
        />

</View>

</ScrollView>
    </ImageBackground>
  );
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
 padding:23,
 },
 FlatList:{
marginTop:-25,
 },
  maintitle:{
    flexDirection:"row",
    marginTop:110,
    marginBottom:-20,
    justifyContent:"center",
    alignItems:"center",
    padding:23,
  },
  maintitle1:{
    flexDirection:"row",
    marginTop:10,
    marginBottom:-10,
    justifyContent:"center",
    alignItems:"center",
  },
  title:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"32%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  title_0:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  title_1:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  titleD:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"25%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  textTitle:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:12,
    color:"#fff",
    textAlign:"center",
  },
  title1:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"32%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  title_01:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  title_02:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  btnView:{
    borderRadius:5,
    flexDirection:"row",
    margin:2,
    height:40,
    width:"25%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  textTitle1:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:12,
    textAlign:"center",
    color:"#423cb5",
  },
  textTitle2:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:12,
    textAlign:"center",
    textDecorationLine: 'underline',
    color:"#423cb5",
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
  paddingHorizontal:23
  },
  ProfileText:{
  fontSize:16,
  color:"lightgrey",
  fontFamily:"Montserrat-Medium",
  marginBottom:10,
  marginTop:10,
  paddingHorizontal:20
  },
  ProfileText2:{
  fontSize:15,
  color:"#fff",
  fontFamily:"Montserrat-Regular",
  marginTop:-10,
  },
  
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    justifyContent:"center",
    alignItems:"center",
  },
  btn:{
    borderRadius: 5,
    height:25,
    justifyContent:"center",
    alignItems:"center",
  },
  icon:{
    paddingHorizontal:8,
  },
  Textline:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:22,
    textAlign:"center",
    color:"#423cb5",
  },

});