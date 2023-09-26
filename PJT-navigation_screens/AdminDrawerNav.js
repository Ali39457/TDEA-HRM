import React,{useState,useEffect} from 'react';
import {StyleSheet,TouchableOpacity,Text,Image,View,Modal} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../PJT_main_screens/AdminDashboard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import RequestScreen from '../PJT_Drawer_Screens/RequestScreen';
import StatusScreen from '../PJT_Drawer_Screens/StatusScreen';
import ApprovalScreen from '../PJT_Drawer_Screens/ApprovalScreen';
import { ScrollView } from 'react-native-virtualized-view';
import DeclarationScreen from '../PJT_Drawer_Screens/DeclarationScreen';
import EmployeeScreen from '../PJT_Drawer_Screens/EmployeeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator();

export default function AdminDrawerNav({navigation}) {

  const [fullName,setFullName]=useState('');
  const [role,setRole]=useState('');
  const [HR_LeaveData,setHR_LeaveData]=useState([])

    //------------------------ useEffect-------------------------//
 useEffect(()=>{
  getData();
  getData1();
  },[])

//------------------------getData (dynamic data to be add in Profile icon) from Api-------------------------//

  const getData = async () => {
  
    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
       setFullName(user.data.username)
       setRole(user.data.role)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }
  }

    //------------------------getData1 Function (Notification For HR and ADMIN) -------------------------//
    const getData1 = async () => {
      try {
        axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_hrApproval.php`)
        .then(res =>{
          setHR_LeaveData(res.data.Leave_HR_Approval)
          // console.log(res.data.Leave_HR_Approval)
        })
      } catch (error) {
        console.log(error)
      }
    }
 
//------------------------notifications-------------------------//
  const [visible,setVisible]=useState(true);
  const [show,setShow]=useState(false);

  const notifications=()=>{
    return(
      <Modal 
      animationType="slide"
      visible={visible}
      transparent={true}
      >
      <View style={style.mainViewNotifications}>
        <View style={style.ViewNotifications}>
           <View style={{height:60,width:"100%",backgroundColor:"#0F75BA",alignItems:"center"}}>
                <TouchableOpacity style={style.icon1} onPress={HideModal} >
                <FontAwesome name="close" color="#fff" size={20} /> 
                </TouchableOpacity>
                <Text style={style.textNotifications}>Notifications</Text>
           </View>
        <View style={{marginTop:50,overflow:"hidden",width:"90%",}}>
             <ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
               <TouchableOpacity style={style.notificationsButton} onPress={()=>navigation.navigate("Approve Leave",setShow(false))}>
             <Text style={style.notificationsButtonText}>Leave Notification <Text style={style.iconLabel}>{ (HR_LeaveData.length!=0 && role==="SHR") || (HR_LeaveData.length!=0 && role==="Admin")   ? '  new  ':  null }</Text> </Text>
             </TouchableOpacity>
             </ScrollView>
        </View>
             
          </View>
        </View>

      </Modal>
    )
  }

  const ShowModal=()=>{
    setShow(true);
  }

  const HideModal=()=>{
    setShow(false);
  }
//--- CustomDrawerContent ---//

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView contentContainerStyle={{paddingTop: 110}}  
     {...props}>
        <DrawerItemList {...props} />
          <View style={style.Profile}>
          <TouchableOpacity 
          // onPress={()=>navigation.navigate('Profile')}
          >
          <Image source={require('../assets/user_image.png')} style={style.ProfileImage}></Image>
            <Text style={style.ProfileText}>{fullName}</Text>
          </TouchableOpacity> 
          { show ? notifications():null}
          </View>        
      </DrawerContentScrollView>
    );
  }

  return (
      <Drawer.Navigator initialRouteName="Home" 
      useLegacyImplementation
   
      drawerContent={(props) => <CustomDrawerContent {...props}  />}
       screenOptions={{

       headerStyle: { backgroundColor: "#0F75BA" },headerTintColor: 'white',headerTitleStyle: {fontFamily:"Montserrat-Medium"},headerTitleAlign: 'center',
       drawerItemStyle: {marginBottom:2,},drawerActiveBackgroundColor : "#0F75BA", drawerActiveTintColor: "white",
       drawerLabelStyle:{fontFamily:"Montserrat-Regular"},
       drawerStyle: { backgroundColor: 'white',width: 240},
     }}>

       <Drawer.Screen name="TDEA-HRM" component={AdminDashboard} options={{headerRight: () => 
         (
         <TouchableOpacity onPress={ShowModal} activeOpacity={0.6} > 
        
           {/* <FontAwesome name="bell" color="white" size={20} style={style.icon} />  */}
           {/* { (HR_LeaveData.length!=0 && role==="SHR") || (HR_LeaveData.length!=0 && role==="Admin")  ? <Text style={style.iconLabel}> 1+ </Text> :  null } */}
          
          </TouchableOpacity>
          ),
         drawerIcon: ({ color }) => (<FontAwesome name="home" color={color} size ={25} style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}} /> )  }} />

<Drawer.Screen name="Employee" component={EmployeeScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="user" color={color} size ={25} style={{right:-22,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}    /> )  }} />


<Drawer.Screen name="Requests" component={RequestScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="calendar" color={color} size ={25} style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}  /> )   }} />

<Drawer.Screen name="Status" component={StatusScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="list-ul" color={color} size ={25}  style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}} /> )  }} />

<Drawer.Screen name="Approvals" component={ApprovalScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="calendar-check-o" color={color} size ={25} style={{right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}   /> )  }} />

<Drawer.Screen name="Declarations" component={DeclarationScreen} options={{
         drawerIcon: ({ color }) => (<FontAwesome name="pencil-square-o" color={color} size ={25} style={{right:-21,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5}}  /> )  }} />


      </Drawer.Navigator>
  );
}


const style=StyleSheet.create({
  icon:{
    height:40,
    width:45,
    paddingHorizontal:1,
    paddingVertical:10,
    elevation:0,
  },
  icon_1:{
    right:-20,
    height:30,
    width:45,
    paddingHorizontal:10,
    paddingVertical:1.5,
  },
  iconLabel:{
    right:10,
    position:"absolute",
    borderRadius:20,
    fontSize:12,
    backgroundColor:"red",
    color:"#fff",
    paddingHorizontal:6,
    paddingVertical:1,
    fontFamily:"Montserrat-Regular",
  },
  icon1:{
    right:10,
    borderWidth:2,
    borderColor:"#fff",
    borderRadius:30,
    position:"absolute",
    top:15,
    paddingHorizontal:5,
    paddingVertical:2,
  },
  textNotifications:{
    elevation:0.25,
    position:"absolute",
    top:20,
    fontFamily:"Montserrat-Medium",
    fontSize:16,
    color:"#fff"
  },
  ViewNotifications:{
    flex:1,
    marginTop:60,
    alignItems:"center",
    elevation:5,
    borderRadius:7,
    backgroundColor:"#fff",
    overflow:"hidden",
  },
  mainViewNotifications:{
    padding:23,
    height:"56%",
    width:"100%",
    overflow:"hidden",
  },

  ProfileImage:{
    width: 60,
    height: 60,
    borderRadius: 360,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
    marginTop:15,
    },
    Profile:{
      paddingHorizontal:12,
      position:"absolute",
      backgroundColor:"#0F75BA",
      width:"100%",
      height:110,
    },
    ProfileText:{
      marginTop:80,
      position:"absolute",
      fontSize:13,
      fontFamily:"Montserrat-Regular",
      color:"white"
    },
    notificationsButton:{
      marginTop:2,
      height:40,
      backgroundColor:"#0F75BA",
      borderRadius:7,
      justifyContent:"center",
      elevation:0.45,
      borderWidth:0.45,
      borderColor:"#f2f2f4"
    },
    notificationsButtonText:{
      textAlign:"center",
      fontSize:15,
      fontFamily:"Montserrat-Regular",
      color:"#fff"
    }

})