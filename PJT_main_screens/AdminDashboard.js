import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,FlatList,ImageBackground,Image} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Width=Dimensions.get("screen").width;

const DATA = [
  {id: "1",title:"Attendance",press:"",icon:"address-card-o"},
  {id: "2",title:"Apply For Leave",press:"Apply Leave",icon:"list-alt"},
  {id: "3",title:"Employee TORs",press:"",icon:"file-o"},
  {id: "4",title:"Leave Status",press:"Leave Status",icon:"newspaper-o"},
  {id: "5",title:"Salary Slips",press:"",icon:"clipboard"},
  {id: "6",title:"Work From Home",press:"",icon:"desktop"},
  ];

export default function AdminDashboard({navigation}) {

  const [emp_id,setEmp_id]=useState('');
  const [fullName,setFullName]=useState('');
  const [Dashboard_Data,setDashboard_Data]=useState([]);

    //------------------------ useEffect-------------------------//
 useEffect(()=>{
  getData();
  },[])

  //------------------------getData (dynamic data) from Api-------------------------//

  const getData = async () => {
  
    try {

        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setEmp_id(user.data.emp_id)
        setFullName(user.data.username)
      
        axios.get(`https://hrm.tdea.pk/theme/actions/process/API/dashboard_data.php?emp_id=`+ user.data.emp_id)
       .then(res=>{
        setDashboard_Data([res.data.Dashboard_Data])
        console.log(res.data.Dashboard_Data)
       })
      
      }})

    
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }


//------------------------States-------------------------//

  const [Emp_Supervisor,SetEmp_Supervisor]=useState('Supervisor');

  const [CausalLeave,SetCausalLeave]=useState('1')
  const [MedicalLeave,SetMedicalLeave]=useState('2')
  const [CompensatoryLeave,SetCompensatoryLeave]=useState('3')
  const [AnnualLeave,SetAnnualLeave]=useState('4')
  const [MaternityLeave,SetMaternityLeave]=useState('5')
  const [WithoutPayLeave,SetWithoutPayLeave]=useState('6')
  const [AdministrativeLeave,SetAdministrativeLeave]=useState('7')
  const [AdvanceAnnualLeave,SetAdvanceAnnualLeave]=useState('8')
  const [ProlongedSickLeave,SetProlongedSickLeave]=useState('9')
  const [ConsultantLeave,SetConsultantLeave]=useState('10')


  const renderItem =({item,index})=>(
    <LinearGradient colors={['#009ffd', '#2a2a72']} style={style.linearGradient}>
    <TouchableOpacity onPress={()=>{navigation.navigate(item.press)}} 
style={{ height:100, width:100, borderRadius:5,marginBottom:10,justifyContent:"center", }}>
<View style={style.icons}>  
        <FontAwesome name={item.icon} size={35} color="white"/>
        <Text style={style.CardText}>{item.title}</Text>
</View>
</TouchableOpacity>    
</LinearGradient>
  )

  return (
    <ImageBackground source={require('../assets/bgImage.png')} resizeMode="cover" style={style.bgImage}>
    <ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false} style={style.container}>

 <View style={style.ViewProfile}>
 {/* <Image source={require('../assets/image.jpg')} style={style.Image}></Image>  */}
 <View style={{alignItems:"center"}}>
 <Text style={style.ProfileText2}>Logged in as: <Text style={style.ProfileText}> {fullName}</Text></Text>
    
</View>
 </View>
 
 <FlatList style={style.FlatList}   listKey="FlatList0" 
        data={Dashboard_Data}
        renderItem={({item})=>{
return(
  <View>
    
 <View style={style.ViewSuperVisor}>
 <Text style={style.TextSuperVisor1}>{Emp_Supervisor}</Text>
 <Text style={style.TextSuperVisor2}>{item.Supervisor}</Text>
 </View>  

<View style={style.mainViewBorder}>
 {/* DASHBOARD VIEW */}
 <View style={style.ViewBorder}> 
 <Text style={style.outerTextDashboard}>DASHBOARD</Text>     

 <View style={style.ViewDashboard}>
   <Text style={style.innerTextDashboard}>Timesheet Status</Text>
   <Text style={style.innerTextDashboard}>Deficit Time-{item.Deficit_Time_Month}</Text>
 </View>

 <View style={style.ViewDashboard}>
   <Text style={style.innerTextDashboard1}>{item.Deficit_Time_Month}</Text>
   <Text style={item.Deficit_Time==="00 : 00" ? style.TextDashboard_def: style.TextDashboard1}>{item.Deficit_Time}</Text>
 </View>

 <View style={style.ViewDashboard}>
   <Text style={item.Time_Sheet_August==="Approved" ? style.TextDashboard2 : style.TextDashboard_p}>({item.Time_Sheet_August})</Text>
   <Text style={style.TextDashboard2}></Text>
 </View>

 <View style={style.ViewDashboard}>
   <Text style={style.Divider}>|</Text>
 </View>


 <View style={{marginBottom:5,marginTop:5}}>
   <Text style={style.leaveTextDashboard}>Leave Tracker</Text>
 </View>


{
  item.Consultant!=null ? 
  <View>
  <Text style={style.leaveInnerText}>Consultant</Text>
  <Text style={style.leaveInnerText0}>{item.Consultant}</Text>
  </View> 
   :

     <ScrollView horizontal={true}>
     <View style={style.ViewDashboard}>

     <View>
     <Text style={style.leaveInnerText}>Casual</Text>
     <Text style={style.leaveInnerText1}>{item.Casual}</Text>
     </View>
    
     <View style={style.ViewDashboard}>
       <Text style={style.smallDivider}>|</Text>
     </View>
    
     <View>
     <Text style={style.leaveInnerText}>Medical</Text>
     <Text style={style.leaveInnerText1}>{item.Medical}</Text>
     </View>
    
     <View style={style.ViewDashboard}>
       <Text style={style.smallDivider}>|</Text>
     </View>
    
     <View>
     <Text style={style.leaveInnerText}>Annual</Text>
     <Text style={style.leaveInnerText2}>{item.Annual}</Text>
     </View> 
  
     <View style={style.ViewDashboard}>
       <Text style={style.smallDivider}>|</Text>
     </View>

     <View>
     <Text style={style.leaveInnerText}>Compensatory</Text>
     <Text style={style.leaveInnerText2}>{item.Compensatory}</Text>
     </View>

  
    
     </View> 
  </ScrollView>
}      
 </View>

{/* DASHBOARD VIEW */}
</View>
   

  </View>
)
        }}
     /> 

                                                                   
<FlatList style={style.FlatList1}   listKey="FlatList1"  numColumns={3}
        data={DATA}
        renderItem={renderItem}
     /> 
                  {/* mainBorder end for Team CardView*/}


    </ScrollView>
    </ImageBackground>
  )
}

const style= StyleSheet.create({
  container:{
    flex:1,
      height:"100%",
    width:Width,
  },
  bgImage:{
    height:"100%",
    width:Width,
    position:'relative',
  },
ViewSuperVisor:{
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20
},
TextSuperVisor1:{
fontSize:15,
fontFamily:"Montserrat-Regular",
color:"lightgrey",
},
TextSuperVisor2:{
fontSize:16,
fontFamily:"Montserrat-Medium",
color:"#fff"

},
FlatList:{
  marginTop:0,
  marginBottom:15,
  paddingHorizontal:20,
},
FlatList1:{
    marginTop:-5,
    marginBottom:10,
    paddingHorizontal:20,
  },
CardText:{
    fontSize:11,
    marginTop:15,
    textAlign:"center",
    justifyContent:"center",
    color:"#fff",
    fontFamily:"Montserrat-Regular",
  },
ViewBorder:{
    marginTop:-15,
    borderRadius:5,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white",
    elevation:5,
    height:190,
  },
mainViewBorder:{
   padding:3.1,
  },
icons:{
   justifyContent:"center",
   alignItems:"center",
   marginTop:30,
 },
ViewDashboard:{
   flexDirection:"row",
 },
outerTextDashboard:{
  marginBottom:8,
  marginTop:4,
  fontFamily:"Montserrat-Regular",
  color:"#423cb5",
  fontSize:18,
  },
  innerTextDashboard:{
    paddingHorizontal:26,
    fontFamily:"Montserrat-Medium",
    color:"#423cb5",
    fontSize:13,
    },
innerTextDashboard1:{
      paddingHorizontal:50,
      fontFamily:"Montserrat-Regular",
      color:"black",
      fontSize:16,
      },
TextDashboard1:{
  paddingHorizontal:65,
  fontFamily:"Montserrat-Regular",
  color:"red",
  fontSize:16,
},
TextDashboard_def:{
  paddingHorizontal:65,
  fontFamily:"Montserrat-Regular",
  fontSize:16,
  color:"black",
},
TextDashboard2:{
  paddingHorizontal:92,
  fontFamily:"Montserrat-Regular",
  color:"#16A085",
  fontSize:12,
},
TextDashboard_p:{
  paddingHorizontal:92,
  fontFamily:"Montserrat-Regular",
  color:"orange",
  fontSize:12,
},
leaveTextDashboard:{
fontFamily:"Montserrat-Medium",
color:"#423cb5",
fontSize:13,
marginTop:8,
marginBottom:3,
},
leaveInnerText:{
  fontFamily:"Montserrat-Regular",
  fontSize:13,
  paddingHorizontal:10,
  textAlign:"center",
  marginTop:-2,
  marginBottom:10,
},
leaveInnerText0:{
  fontFamily:"Montserrat-Regular",
   fontSize:15,
   color:"black",
   marginTop:-15,
   paddingHorizontal:45,
 },
leaveInnerText1:{
 fontFamily:"Montserrat-Regular",
  fontSize:15,
  color:"black",
  marginTop:-15,
  paddingHorizontal:24,
},
leaveInnerText2:{
  fontFamily:"Montserrat-Regular",
   fontSize:15,
   color:"black",
   marginTop:-15,
   paddingHorizontal:25,
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
    marginBottom:25,
    justifyContent:"center",
    alignItems:"center"
    },
    ProfileText:{
      fontSize:16,
      color:"#fff",
      fontFamily:"Montserrat-Medium",
      marginBottom:10,
      marginTop:45,
      paddingHorizontal:20
      },
      ProfileText2:{
      fontSize:15,
      color:"#fff",
      fontFamily:"Montserrat-Regular",
      marginTop:25,
      },
linearGradient: {
flex: 1,
margin:3,
alignItems:"center",
borderRadius:5,
},
Divider:{
flex:1,
fontSize:60,
position:"absolute",
fontFamily:"Montserrat-Thin",
bottom:-8,
right:0,
color:"#f2f2f4"
},
smallDivider:{
flex:1,
fontSize:40,
position:"absolute",
fontFamily:"Montserrat-Thin",
bottom:-9,
left:-3,
color:"#f2f2f4",
}


})