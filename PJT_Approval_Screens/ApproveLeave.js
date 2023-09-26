import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Alert,Modal,Linking,Button, TextInput,Dimensions,ScrollView } from 'react-native';
import React, { useState,useEffect,useRef } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("SCROLLVIEW");
const Height=Dimensions.get("screen").height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApproveLeave({navigation}) {  
  ///////////////////////////////////////////////////////
  /////------------------------States--------------//////
  //////////////////////////////////////////////////////

  const [show ,setShow]=useState(true);
  const [ApprovalStatus ,setApprovalStatus]=useState('Pending')
  const [Reject_reason ,setReject_reason]=useState('')
  const [role,setRole]=useState('');
  const [secondary_role,setSecondary_role]=useState('');
  const [email,setEmail]=useState('');
  const [record_id,setRecord_id]=useState('');
  const [emp_id,setEmp_id]=useState('');
  const [username,setUsername]=useState('');
  const [HR_LeaveData,setHR_LeaveData]=useState('');
  const [Sup_LeaveData,setSup_LeaveData]=useState('');
  const [Dir_LeaveData1,setDir_LeaveData1]=useState('');
  const [Dir1,setDir1]=useState('');
  const [Dir_LeaveData2,setDir_LeaveData2]=useState('');
  const [Dir2,setDir2]=useState('');
  const [Dir_LeaveData3,setDir_LeaveData3]=useState('');
  const [CEO_LeaveData,setCEO_LeaveData]=useState('');

  const [modalVisible1, setModalVisible1] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const openModal1 = (url) => {
    setCurrentUrl(url);
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  ///////////////////////////////////////////////////////
  /////--State & Functions Reject_reason Modal---Start----//////
  ///////////////////////////////////////////////////////

  const [openModalId, setOpenModalId] = useState(null);
    // Function to open a modal
    const openModal = (itemId) => {
      setOpenModalId(itemId);
    };
    // Function to close the modal
    const closeModal = () => {
      setOpenModalId(null);
    };
  ///////////////////////////////////////////////////////
  /////--State & Functions Reject_reason Modal---End----//////
  /////////////////////////////////////////////////////
  
    //------------------------useEffect function-------------------------//
   
  
    
   useEffect(()=>{
   getData0();
   getData1();
   getData2();
   getData3();
   getData4();
   getData5();
   getData6();

   },[getData2])

   
     //------------------------getData0 Function (get role from local Storage) -------------------------//   
     const getData0 = async () => {
  
      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)
          setRole(user.data.role)
          setSecondary_role(user.data.secondary_role)
          setEmp_id(user.data.emp_id)
          setUsername(user.data.username)
          setEmail(user.data.email)
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    }
  //------------------------getData1 Function (dynamic data for display leave record FOR ADMIN AND SHR) -------------------------//
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

    //------------------------getData2 Function (dynamic data for display leave record FOR SuperVisor) -------------------------//
    const getData2 = async () => {
      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)

          axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_SupApproval.php?emp_id=`+ user.data.emp_id)
          .then(res =>{
           setSup_LeaveData(res.data.Leave_SUP_Approval)
            // console.log(res.data.Leave_SUP_Approval)
          })

        }})
       
      } catch (error) {
        console.log(error)
      }
    }

        //------------------------getData3 Function (dynamic data for display leave record FOR Director) -------email='amjad.shah@tdea.pk'------------------//
        const getData3 = async () => {
          try {
            await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
              var user=JSON.parse(value)
    
              axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_DirApproval.php?emp_id=9502&email=amjad.shah@tdea.pk`)
              .then(res =>{
                // setDir_LeaveData1(res.data.Leave_DIR_Approval)
                setDir_LeaveData1(res.data.Leave_DIR_Approval.concat(axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_SupApproval.php?emp_id=`+ user.data.emp_id)
                .then(res =>{
                  setDir_LeaveData1(res.data.Leave_SUP_Approval)
                  // console.log(res.data.Leave_SUP_Approval)
                })))
              })
             
            }})
           
          } catch (error) {
            console.log(error)
          }
        }

       

         //------------------------getData4 Function (dynamic data for display leave record FOR Director) -------email='mud.rizvi@tdea.pk'------------------//
         const getData4 = async () => {
          try {
            await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
              var user=JSON.parse(value)

    
              axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_DirApproval.php?emp_id=9501&email=mud.rizvi@tdea.pk`)
              .then(res =>{
                // setDir_LeaveData2(res.data.Leave_DIR_Approval)
                setDir_LeaveData2(res.data.Leave_DIR_Approval.concat(axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_SupApproval.php?emp_id=`+ user.data.emp_id)
                .then(res =>{
                  setDir_LeaveData2(res.data.Leave_SUP_Approval)
                  // console.log(res.data.Leave_SUP_Approval)
                })))
              })
             
            }})
           
          } catch (error) {
            console.log(error)
          }
        }
             //------------------------getData4 Function (dynamic data for display leave record FOR Director) -------email='mud.rizvi@tdea.pk'------------------//
             const getData5 = async () => {
              try {
                await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
                  var user=JSON.parse(value)
        
                  axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_CEOApproval.php?emp_id=9500&email=ceo@tdea.pk`)
                  .then(res =>{
                     setCEO_LeaveData(res.data.Leave_CEO_Approval)
                     //  console.log(res.data.Leave_CEO_Approval)
                  })
                }})
               
              } catch (error) {
                console.log(error)
              }
            }

                 //------------------------getData6 Function (dynamic data for display leave record FOR Director) -------email='ceo@tdea.pk'------------------//
         const getData6 = async () => {
          try {
            await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
              var user=JSON.parse(value)
    
              axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_DirApproval.php?emp_id=9500&email=ceo@tdea.pk`)
              .then(res =>{
                  setDir_LeaveData3(res.data.Leave_DIR_Approval)
                  // console.log(res.data.Leave_DIR_Approval)
              })
            }})
           
          } catch (error) {
            console.log(error)
          }
        }


//----/////-----Function that Slip Extension------/////----//
 const PdfType=(url)=>{
  const parts = url.split('.');
  const extension = parts[parts.length - 1];
 return extension.toLowerCase()
 }

return (
<ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.BgImage}>

<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false} style={styles.container}>


<View style={styles.ViewFlat}>

{/*========================================================================================================
============================================ SHR && Admin ================================================
========================================================================================================== */}


  {
    role==="SHR" || role==="Admin" && HR_LeaveData.length!=0 ? 
   <FlatList
   data={HR_LeaveData} 
   style={styles.FlatList} 
   listKey="1"
   keyExtractor={(item) => item.id.toString()}
   renderItem={({item})=>(
         <View style={styles.innerViewFlat}>
           
           <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
           <Text style={styles.textFlat}>{item.employee_id}</Text>
           </View>

            {/* Item Separator */}
            <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
            {/* Item Separator */}

           <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
           
           {
            item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
            <TouchableOpacity style={styles.textFlat2}>
              <FontAwesome name="file" 
              onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
              size={25} color="#0F75BA" />
            </TouchableOpacity> :
            item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
            <TouchableOpacity style={styles.textFlat2}>
              <FontAwesome name="file" 
              onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
              size={25} color="#0F75BA" />
            </TouchableOpacity> :null
           }


           {
            item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
            <TouchableOpacity style={styles.textFlat2}>
              <FontAwesome name="file"
               onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
               size={25} color="#0F75BA" />
            </TouchableOpacity> :
             item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
             <TouchableOpacity style={styles.textFlat2}>
               <FontAwesome name="file" 
               onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
               size={25} color="#0F75BA" />
             </TouchableOpacity> :null
           }

           <View style={{flexDirection:"row"}}>
           <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
           </View>
           
           <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
           <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
           <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>

          {/* Reject Button & modal */}

<View style={{flexDirection:"row"}}>
<TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
       <Text style={styles.BtnLoginText}>Reject</Text>
</TouchableOpacity>

{openModalId === item.id && (
  <Modal
  animationType="slide"
  transparent={true}
  visible={true}
  onRequestClose={closeModal}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <Text style={styles.textReject_reason}>Reason</Text>
      <View style={styles.TextInput}>
      <TextInput
    //  value={String(item.name)}
     placeholder={`Write here...`}
     placeholderTextColor="#423cb5"
     multiline={true} 
     onChangeText={(text)=>setReject_reason(text)}
     style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
     />
      </View>
{/*========================================= Reject Button ================================================ */}  
      <TouchableOpacity 
        style={[styles.button, styles.buttonClose]}
        onPress={async()=>{
          try {
            const resp =await axios.request({
              method: 'POST',
              url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_shr.php`,
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                record_id:item.id,
                action_taker_role:role,
                action_taker_emp_id:emp_id,
                action_taker_username:username,
                supervisor_id:item.supervisor_id,
                status:'Rejected',
                rejection_reason:Reject_reason,
              }) 
             
            })
            console.log(resp.data)
            Alert.alert('', String(resp.data.message), [
              {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
            ]);
          } catch (error) {
            console.log(error.response.data)
          }

          closeModal();
        }}>
        <Text style={styles.textStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

)}

{/*========================================= Approve Button ================================================ */}

           <TouchableOpacity style={styles.Button} onPress={async()=>{
  try {
    const resp =await axios.request({
      method: 'POST',
      url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_shr.php`,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        record_id:item.id,
        action_taker_role:role,
        action_taker_emp_id:emp_id,
        action_taker_username:username,
        supervisor_id:item.supervisor_id,
        status:'Approved',
      }) 
     
    })
    console.log(resp.data)
    Alert.alert('', String(resp.data.message), [
      {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
    ]);
  } catch (error) {
    console.log(error.response.data)
  }
}} >
       <Text style={styles.BtnLoginText}>Approve</Text>
     </TouchableOpacity>

</View>

        </View>   
   )} />
    :
   null
  }

{
    (role==="SHR" && HR_LeaveData.length===0) || (role==="Admin" && HR_LeaveData.length===0)  ?
    <View style={{justifyContent:"center",alignItems:"center"}}>
    <Text style={styles.textFlat3}>Sorry no record found!</Text> 
    </View>
    :null
}

{/*========================================================================================================
======================================== SHR && Supervisor ================================================
========================================================================================================== */}


{
     (role==="SHR" && Sup_LeaveData.length!=0)  && (secondary_role==="Supervisor" && Sup_LeaveData.length!=0)  ?
     <FlatList
     data={Sup_LeaveData} 
     style={styles.FlatList0} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
 {/*========================================= Reject Button ================================================ */} 
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }

{/*========================================================================================================
====================================Employee && Supervisor================================================
========================================================================================================== */}

   {
     role==="Employee" && secondary_role==="Supervisor" && Sup_LeaveData.length!=0 && email!="ceo@tdea.pk" && email!="amjad.shah@tdea.pk" && email!="mud.rizvi@tdea.pk" ?
     <FlatList
     data={Sup_LeaveData} 
     style={styles.FlatList} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
      {/*========================================= Reject Button ================================================ */}    
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }

{
    role==="Employee" && secondary_role==="Supervisor" && Sup_LeaveData.length===0 && email!="ceo@tdea.pk" && email!="amjad.shah@tdea.pk" && email!="mud.rizvi@tdea.pk" ?
    <View style={{justifyContent:"center",alignItems:"center"}}>
    <Text style={styles.textFlat3}>Sorry no record found!</Text> 
    </View>
    :null
}


{/*========================================================================================================
==================================== Director ============= Email= 'amjad.shah@tdea.pk' ===================
========================================================================================================== */}

{
  email==="amjad.shah@tdea.pk" && Dir_LeaveData1.length!=0  ?
     <FlatList
     data={Dir_LeaveData1} 
     style={styles.FlatList} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
{/*========================================= Reject Button ================================================ */}
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }


{/*========================================================================================================
==================================== Director ============= Email= 'mud.rizvi@tdea.pk' ===================
========================================================================================================== */}

{
     email==="mud.rizvi@tdea.pk" && Dir_LeaveData2.length!=0  ?
     <FlatList
     data={Dir_LeaveData2} 
     style={styles.FlatList} 
     listKey="1"
     keyExtractor={(item,index)=>index.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
     {/*========================================= Reject Button ================================================ */}
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }


{/*========================================================================================================
==================================== CEO ============= Email= 'ceo@tdea.pk' ===================
========================================================================================================== */}

{
     email==="ceo@tdea.pk" && CEO_LeaveData.length!=0  ?
     <FlatList
     data={CEO_LeaveData} 
     style={styles.FlatList} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
     {/*========================================= Reject Button ================================================ */}
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_ceo.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_ceo.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }

{/*========================================================================================================
======================================== if CEO is also Supervisor ===================================
========================================================================================================== */}


{
     (email==="ceo@tdea.pk" && Sup_LeaveData.length!=0)  && (secondary_role==="Supervisor" && Sup_LeaveData.length!=0)  ?
     <FlatList
     data={Sup_LeaveData} 
     style={CEO_LeaveData.length===0 ? styles.FlatList :styles.FlatList0} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
 {/*========================================= Reject Button ================================================ */} 
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_sup.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }


  {/*========================================================================================================
======================================== if CEO is also Director ===========================================
========================================================================================================== */}

{
     (email==="ceo@tdea.pk")  && (secondary_role==="Supervisor") && Dir_LeaveData3.length!=0 ?
     <FlatList
     data={Dir_LeaveData3} 
     style={CEO_LeaveData.length===0 ? styles.FlatList : Sup_LeaveData.length===0 ? styles.FlatList: styles.FlatList0} 
     listKey="1"
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item})=>(
           <View style={styles.innerViewFlat}>
             
             <View style={{backgroundColor:"#0F75BA",width:"100.5%",borderRadius:1,height:35,justifyContent:"center"}}> 
             <Text style={styles.textFlat}>{item.employee_id}</Text>
             </View>
  
              {/* Item Separator */}
              <View style={{marginBottom:2,width:"100%",borderColor:"#f2f2f2",borderWidth:1}} />
              {/* Item Separator */}
  
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Leave Type:</Text> {item.leavetype_id}</Text>
             
             {
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)!='pdf' ? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :
              item.leavetype_id==="Sick Leave" && item.sickdoc!=null && PdfType(item.sickdoc)==='pdf'? 
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file" 
                onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.sickdoc)}}
                size={25} color="#0F75BA" />
              </TouchableOpacity> :null
             }
  
  
             {
              item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)!='pdf'  ?
              <TouchableOpacity style={styles.textFlat2}>
                <FontAwesome name="file"
                 onPress={() => {openModal1(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
              </TouchableOpacity> :
               item.leavetype_id==="Maternity/Paternity leave" && item.matpatdoc!=null && PdfType(item.matpatdoc)==='pdf'? 
               <TouchableOpacity style={styles.textFlat2}>
                 <FontAwesome name="file" 
                 onPress={() => {Linking.openURL(`https://hrm.tdea.pk/theme/tables/images/leaves/`+ item.matpatdoc)}}
                 size={25} color="#0F75BA" />
               </TouchableOpacity> :null
             }
  
             <View style={{flexDirection:"row"}}>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Days:</Text> {item.days}</Text>
             </View>
             
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Reason:</Text> {item.reason}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>Start Date:</Text> {item.startdate}</Text>
             <Text style={styles.textFlat1}><Text style={styles.textFlat0}>End Date:</Text> {item.enddate}</Text>
  
            {/* Reject Button & modal */}
  
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity style={styles.Button1} onPress={() => openModal(item.id)} >
         <Text style={styles.BtnLoginText}>Reject</Text>
  </TouchableOpacity>
  
  {openModalId === item.id && (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.textReject_reason}>Reason</Text>
        <View style={styles.TextInput}>
        <TextInput
      //  value={String(item.name)}
       placeholder={`Write here...`}
       placeholderTextColor="#423cb5"
       multiline={true} 
       onChangeText={(text)=>setReject_reason(text)}
       style={{left:6,height:"100%",fontFamily:"Montserrat-Regular"}}
       />
        </View>
 {/*========================================= Reject Button ================================================ */} 
        <TouchableOpacity 
          style={[styles.button, styles.buttonClose]}
          onPress={async()=>{
            try {
              const resp =await axios.request({
                method: 'POST',
                url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
                headers: {
                  'content-type': 'application/json',
                },
                data: JSON.stringify({
                  record_id:item.id,
                  action_taker_role:role,
                  action_taker_emp_id:emp_id,
                  action_taker_username:username,
                  supervisor_id:item.supervisor_id,
                  status:'Rejected',
                  rejection_reason:Reject_reason,
                }) 
               
              })
              console.log(resp.data)
              Alert.alert('', String(resp.data.message), [
                {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
              ]);
            } catch (error) {
              console.log(error.response.data)
            }
  
            closeModal();
          }}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  )}
  
  {/*========================================= Approve Button ================================================ */}
  
             <TouchableOpacity style={styles.Button} onPress={async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_submit_dir.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          record_id:item.id,
          action_taker_role:role,
          action_taker_emp_id:emp_id,
          action_taker_username:username,
          supervisor_id:item.supervisor_id,
          status:'Approved',
        }) 
       
      })
      console.log(resp.data)
      Alert.alert('', String(resp.data.message), [
        {text: 'OK', onPress: () => navigation.replace('Approve Leave')},
      ]);
    } catch (error) {
      console.log(error.response.data)
    }
  }} >
         <Text style={styles.BtnLoginText}>Approve</Text>
       </TouchableOpacity>
  
  </View>
  
          </View>   
     )} />
   :
   null
  }

{
    email==="ceo@tdea.pk" && CEO_LeaveData.length===0 && Dir_LeaveData3.length===0 && Sup_LeaveData.length===0  ?
    <View style={{justifyContent:"center",alignItems:"center"}}>
    <Text style={styles.textFlat3}>Sorry no record found!</Text> 
    </View>
    :null
}


  </View>
</ScrollView>

<Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View style={{ flex: 1,padding:0 }}>
          <WebView source={{ uri: currentUrl }} />
          <Button title="Close" onPress={closeModal1} />
</View>

</Modal>

</ImageBackground>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  BgImage:{
height:"100%",
width:"100%",
  },
  TextInput:{
    backgroundColor:'#fff',
    borderRadius:8,
    height:80,
    marginBottom:5,
    borderWidth:1,
    borderColor:"#f2f2f4",
    elevation:0.45,
    marginHorizontal:0.5,
  },
ViewFlat:{
  padding:23,
},
innerViewFlat:{
  borderWidth:2.5,
  borderRadius:1,
  borderColor:"#f2f2f4",
  marginBottom:15,
  width:"100%",
  alignItems:"center",
  backgroundColor:"#fff",
  elevation:3,
},
FlatList:{
  marginTop:110,
  marginBottom:100,
},
FlatList0:{
  marginTop:-100,
  marginBottom:100,
},
textFlat:{
  fontFamily:"Montserrat-Medium",
  paddingHorizontal:16,
  width:"100%",
  fontSize:15,
  marginTop:3,
  color:"#fff"
},
textFlat1View:{
  width:"25%",
  height:50,
  backgroundColor:"#0F75BA",
  borderBottomStartRadius:5,
  borderTopStartRadius:5,
  justifyContent:"center",
  alignItems:"center"
},
textFlat0:{
  fontFamily:"Montserrat-Medium",
  paddingHorizontal:16,
  width:"100%",
  fontSize:15,
  marginBottom:3,
  color:"#0F75BA",
},
textFlat1:{
  fontFamily:"Montserrat-Regular",
  paddingHorizontal:16,
  width:"100%",
  fontSize:15,
  marginBottom:3,
  color:"#0F75BA"
},
textFlat2:{
  fontFamily:"Montserrat-Regular",
  paddingHorizontal:16,
  width:"100%",
  fontSize:15,
  marginTop:5,
  marginBottom:8,
},
textFlat3:{
  fontFamily:"Montserrat-Regular",
  textAlign:"center",
  marginTop:150,
  fontSize:15,
  color:"#0F75BA"
},
textReject_reason:{
  fontFamily:"Montserrat-Medium",
  paddingHorizontal:1,
  width:"100%",
  fontSize:15,
  marginTop:5,
  marginBottom:8,
},
textFlatColon:{
  fontFamily:"Montserrat-Medium",
  position:"absolute",
  left:90,
  width:"90%",
},
Button:{
  borderRadius:7,
  height:40,
  width:100,
  justifyContent:"center",
  backgroundColor:"#356635",
  marginTop:20,
  marginBottom:10,
  marginLeft:15
},
Button1:{
  borderRadius:7,
  height:40,
  width:100,
  justifyContent:"center",
  backgroundColor:"red",
  marginTop:20,
  marginBottom:10,
  marginRight:15
},
BtnLoginText:{
  fontSize:14,
  color:"white",
  textAlign:"center",
  fontFamily:"Montserrat-Medium"
},
centeredView: {
  flex: 1,
  marginTop: 18,
  justifyContent:"center",
  padding:2,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  justifyContent:"center",
  padding: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.8,
  shadowRadius: 5,
  elevation: 10,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#0F75BA',
},
buttonClose: {
  marginTop:20,
  backgroundColor: '#0F75BA',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
})
