import React, { useState } from 'react';
import {Text, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Image,FlatList,SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");


export default function TeamScreen() {
      
     
 //------------------------App main code-------------------------//

  return (
   
   <ImageBackground source={require('../assets/bgImage1.jpg')} resizeMode="cover" style={styles.bgImage}>
<View style={styles.ViewProfile}>
 <Image source={require('../assets/image2.png')} style={styles.Image}></Image> 
 <View >
    <Text style={styles.ProfileText}>Muhammad Muzafar Shah</Text>
    <Text style={styles.ProfileText4}>Supervisor-Senior Program officer</Text>
    <Text style={styles.ProfileText3}>(Application Development)</Text>
</View>
</View>
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
<View style={styles.mainView}>
<TeamList/>    
</View>

</ScrollView>
    </ImageBackground>
  );
};

     //////////////////////////////////////////////////////////////////////
    //------------------------TeamList component-------------------------//
    //////////////////////////////////////////////////////////////////////

export const TeamList=()=>{

    //------------------------TeamDataArray state-------------------------//

    const [TeamDataArray,setTeamDataArray]=useState([
      {key:"1",image:require('../assets/image.jpg'),name:"Raja Muhammad Ali",position:"Consultant",dept:"(Mobile App Development)"},
      {key:"2",image:require('../assets/image3.png'),name:"Muhammad Nadeem Khan",position:"Senior Program officer",dept:"(Digital & Social Media)"},
      {key:"3",image:require('../assets/image1.png'),name:"Rana Amir Waqas",position:"Senior Program officer",dept:"(Application Development)"},
      {key:"4",image:require('../assets/user.jpg'),name:"User Employee",position:"Senior Program officer",dept:"(Digital & Social Media)"},  
        ])
      

           //------------------------getData(TeamDataArray) from Api-------------------------//
         
         {/*
          
         useEffect(()=>{
         getData();
         },[])
         
         const getData = async () => {
         
           try {
             await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
               var user=JSON.parse(value)
               setTeamDataArray((user[0].member_list))
             }})
             
           } catch (e) {
             console.log('Failed to fetch the data from storage!', e)
           }
         
         }
         
         */}
    


       //------------------------renderItem-------------------------//

  const renderItem=({item})=>{
    return  (
      <SafeAreaView>
      <View style={styles.mainViewProfile}>
      <View style={styles.ViewProfile1}>
      <Image source={item.image} style={styles.Image}></Image> 
      <View>
         <Text style={styles.ProfileText1}>{item.name}</Text>
         <Text style={styles.ProfileText2}>{item.position}</Text>
         <Text style={styles.ProfileText3}>{item.dept}</Text>
     </View>
      </View>
      </View>
      </SafeAreaView>
    )
    
  }

    //------------------------TeamList component main code-------------------------//

  return(
   
    <FlatList listKey="1" style={styles.FlatList}
    data={TeamDataArray}
    renderItem={renderItem}
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
 marginTop:10,
 },
  Image:{
    width:70,
    height:70,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgrey",
    marginTop:35,
    marginLeft:40,
    borderRadius:5,
    },
   mainViewProfile:{
    borderTopWidth:1,
    marginTop:5,
    borderColor:"#f2f2f2",
    width:"100%",
    borderRadius:5,
    
   }, 
  ViewProfile:{
  flexDirection:"row",
  marginBottom:172,
  },
  ViewProfile1:{
    flexDirection:"row", 
    marginTop:-30,
    marginBottom:5,
    },
  ProfileText:{
  fontSize:14,
  color:"#fff",
  fontFamily:"Montserrat-Medium",
  marginBottom:2,
  marginTop:45,
  paddingHorizontal:10
  },
  ProfileText1:{
    fontSize:14,
    color:"black",
    fontFamily:"Montserrat-Medium",
    marginBottom:5,
    marginTop:45,
    paddingHorizontal:10
    },
  ProfileText2:{
  fontSize:14,
  fontFamily:"Montserrat-Regular",
  marginTop:-10,
  paddingHorizontal:10
  },
  ProfileText3:{
    fontSize:13,
    fontFamily:"Montserrat-Regular",
    color:"lightgrey",
    marginTop:-5,
    paddingHorizontal:10
    },
    ProfileText4:{
      fontSize:13,
      fontFamily:"Montserrat-Regular",
      color:"#fff",
      marginTop:-5,
      paddingHorizontal:10
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
  FlatList:{
    marginTop:-10,
  }

});