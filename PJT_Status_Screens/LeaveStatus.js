import React, { useState,useEffect } from 'react';
import {Text, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Image,FlatList,ScrollView} from 'react-native';
const {width, height} = Dimensions.get("window");

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LeaveStatus({navigation}) {

    //------------------------LeaveDataArray state-------------------------//
    const [emp_id,setEmp_id]=useState("");
    const [data,setData]=useState([{id:1}]);
    const [LeaveDataArray,setLeaveDataArray]=useState()
  
   
     //------------------------ useEffect-------------------------//

     useEffect(()=>{
                  getLeaveData();    
     },[])
     
     //------------------------getLeaveData(LeaveDataArray) from Api-------------------------//

     const getLeaveData = async () => { 
       try {
         await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
           var user=JSON.parse(value)
           axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_status.php?emp_id=`+ user.data.emp_id)
           .then(res =>{
             setLeaveDataArray(res.data.status_array)
           })
         }})
         
       } catch (e) {
         console.log('Failed to fetch the data from storage!', e)
       }
     
     }
     
//------------------------renderItem-------------------------//

const renderItem=({item})=>{
  return(
       <View style={{flexDirection:"row",paddingHorizontal:10}}>
        
        <View style={styles.ViewBox1}>
         <Text style={styles.textTitle3}>Emp Name</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>Leave Type</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>Start Date</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>End Date</Text>
        </View>


        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>HR Status</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>Supervisor Status</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>Director Status</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>CEO Status</Text>
        </View>

        <View style={styles.ViewBox1}>
        <Text style={styles.textTitle3}>Status</Text>
        </View>


        </View>   
  )
}

 //------------------------renderItem-1-------------------------//

  const renderItem1=({item})=>{
    return  (
      <View style={{flexDirection:"row",paddingHorizontal:10}}>
<View style={styles.ViewBox}>
<Text style={styles.textTitle1}>{item.name}</Text>
</View>

<View style={styles.ViewBox}>
<Text style={styles.textTitle1}>{item.LeaveType}</Text>
</View>

<View style={styles.ViewBox}>
<Text style={styles.textTitle1}>{item.start_date}</Text>
</View>

<View style={styles.ViewBox}>
<Text style={styles.textTitle1}>{item.end_date}</Text>
</View>

<View style={{borderRadius:5,flexDirection:"row",margin:3,height:40,width:130,
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.hr_status === 'Approved' ? '#356635' : item.hr_status === 'Pending' ? '#FFC300' :item.hr_status === 'Not Required' ? '#03A9F4': 'red'}}>
<Text style={styles.textTitle2}>{item.hr_status}</Text>
</View>

<View style={{borderRadius:5,flexDirection:"row",margin:3,height:40,width:130,
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.supervisor_status === 'Approved' ? '#356635' : item.supervisor_status === 'Pending' ? '#FFC300' :item.supervisor_status === 'Not Required' ? '#03A9F4': 'red'}}>
<Text style={styles.textTitle2}>{item.supervisor_status}</Text>
</View>

<View style={{borderRadius:5,flexDirection:"row",margin:3,height:40,width:130,
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.director_status === 'Approved' ? '#356635' : item.director_status === 'Pending' ? '#FFC300' :item.director_status === 'Not-Required' ? '#03A9F4': 'red'}}>
<Text style={styles.textTitle2}>{item.director_status}</Text>
</View>

<View style={{borderRadius:5,flexDirection:"row",margin:3,height:40,width:130,
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.ceo_status === 'Approved' ? '#356635' : item.ceo_status === 'Pending' ? '#FFC300' :item.ceo_status === 'Not Required' ? '#03A9F4': 'red'}}>
<Text style={styles.textTitle2}>{item.ceo_status}</Text>
</View>

<View style={{borderRadius:5,flexDirection:"row",margin:3,height:40,width:130,
        justifyContent:"center",alignItems:"center",backgroundColor:"#fff",elevation:2,
        backgroundColor: item.status === 'Approved' ? '#356635' : item.status === 'Pending' ? '#FFC300' :item.status === 'Not Required' ? '#03A9F4': 'red'}}>
<Text style={styles.textTitle2}>{item.status}</Text>
</View>

      </View>
    ) 
  }

     
   //------------------------main code-------------------------//

  return (
    
    <ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.bgImage}>

{/*--------------------OUTER SCROLL--------START------------------ */}
<ScrollView style={{height: height}}>
                
  {/*--------------------INNER SCROLL--------START------------------ */}
 <ScrollView horizontal={true} >
  <View style={{flexDirection:"column"}}>
       <FlatList listKey="1" style={{marginTop:122,}}
        data={data}
        renderItem={renderItem}
        />

        <FlatList listKey="2" style={{marginTop:1,}}
        data={LeaveDataArray}
        renderItem={renderItem1}
        />

        <View style={{marginBottom:15}}></View>

  </View>
    
   
</ScrollView>
  {/*--------------------INNER SCROLL--------END------------------ */}
</ScrollView>
{/*--------------------OUTER SCROLL-------END------------------ */}
    </ImageBackground>
  

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  bgImage:{
    height:"100%",
  },
  ViewBox:{
    width:130,
    height:40,
    backgroundColor:"#fff",
    elevation:3,
    borderWidth:0.5,
    borderColor:"#f2f2f2",
    borderRadius:5,
    margin:3,
    justifyContent:"center",
    alignItems:"center"
  },
  ViewBox1:{
    width:130,
    height:40,
    backgroundColor:"#0F75BA",
    elevation:3,
    borderWidth:0.5,
    borderColor:"#0F74AD",
    borderRadius:5,
    margin:3,
    justifyContent:"center",
    alignItems:"center"
  },
  
  textTitle1:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:11,
    textAlign:"center",
    color:"#423cb5",
  },
  textTitle2:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:11,
    textAlign:"center",
    color:"#fff",
  },
  textTitle3:{
    fontFamily:"Montserrat-Bold",
    paddingHorizontal:5,
    fontSize:11,
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