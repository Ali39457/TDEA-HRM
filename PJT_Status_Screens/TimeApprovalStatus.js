import React, { useState } from 'react';
import {Text, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Image,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");


export default function TimeApprovalStatus() {

  //------------------------TimeApprovalStatusData state-------------------------//

  const [TimeApprovalStatusData,setTimeApprovalStatusData]=useState([
    {key:"1",Name:"Muhammad Ali",Applied_Date:"05-July-2023",Supervisor:"Muhammad Imran",status:"Approved"},
    {key:"2",Name:"Muhammad Ali",Applied_Date:"05-July-2023",Supervisor:"Muhammad Imran",status:"Pending"},
    {key:"3",Name:"Muhammad Ali",Applied_Date:"05-July-2023",Supervisor:"Muhammad Imran",status:"Rejected"},
    {key:"4",Name:"Muhammad Ali",Applied_Date:"05-July-2023",Supervisor:"Muhammad Imran",status:"Approved"},
  ])


  //------------------------getData(TimeApprovalStatusData) from Api-------------------------//
   
   {/*
    
   useEffect(()=>{
   getData();
   },[])
   
   const getData = async () => {
   
     try {
       await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
         var user=JSON.parse(value)
         setTimeApprovalStatusData((user[0].member_list))
       }})
       
     } catch (e) {
       console.log('Failed to fetch the data from storage!', e)
     }
   
   }
   
   */}


    //------------------------renderItem-------------------------//

  const renderItem=({item})=>{
    return  <View style={styles.maintitle1}>
      <View style={styles.title2}>
       <Text style={styles.textTitle1}>{item.Name}</Text>
      </View>

      <View style={styles.title1}>
      <Text style={styles.textTitle1}>{item.Applied_Date}</Text>
      </View>


      <View style={styles.title1}>
      <Text style={styles.textTitle1}>{item.Supervisor}</Text>
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity style={{borderRadius:5,flexDirection:"row",margin:2,height:40,width:"100%",
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.status === 'Approved' ? '#53A65E' : item.status === 'Pending' ? '#FFC300' : 'red'}}>
        <Text style={styles.textTitle2}>{item.status}</Text>
        </TouchableOpacity>
      </View>

      </View>  
  }


     //------------------------main code -------------------------//


  return (
    <ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.bgImage}>

{/* <View style={styles.ViewProfile}>
 <Image source={require('../assets/image.jpg')} style={styles.Image}></Image> 
 <View style={{alignItems:"center"}}>
    <Text style={styles.ProfileText}>RAJA MUHAMMAD ALI</Text>
    <Text style={styles.ProfileText2}>IT INTERN</Text>
</View>
</View> */}

 <View style={styles.maintitle}>
        <View style={styles.title0}>
         <Text style={styles.textTitle}>Name</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.textTitle}>Applied_Date</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.textTitle}>Supervisor</Text>
        </View>


        <View style={styles.titlebtn}>
        <Text style={styles.textTitle}>Status</Text>
        </View>

        </View>  
 
 <ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
<View style={styles.mainView}>
    
        <FlatList listKey="1" style={styles.FlatList}
        data={TimeApprovalStatusData}
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
    width:"25%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  titlebtn:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"19%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },

  title0:{
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
    fontSize:9,
    color:"#fff",
    textAlign:"center",
  },
  title1:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"25%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  title2:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"25%",
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
    width:"19%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  textTitle1:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:9.5,
    textAlign:"center",
    color:"#423cb5",
  },
  textTitle2:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:9.5,
    textAlign:"center",
    color:"#fff",
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
  marginBottom:100,
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
  color:"lightgrey",
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