import React, { useState,useEffect } from 'react';
import { Button, Text, View,TextInput,TouchableOpacity,ImageBackground,PermissionsAndroid,StyleSheet,Dimensions,Alert,KeyboardAvoidingView} from 'react-native';
import { Form, Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
// import mime from 'mime';

import axios from 'axios';

export default function ApplyLeave() {

  //------------------------ApplyLeaveArray State will send to Api-------------------------//

  const [ApplyLeaveArray,setApplyLeaveArray]=useState([]);
  const [emp_id,setEmp_id]=useState('');
  const [fullName,setFullName]=useState('');

  //------------------------ useEffect-------------------------//
  useEffect(()=>{
    getData();
    requestStoragePermission();
    },[])

      //------------------------ requestStoragePermission-------------------------//

    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'App needs access to your Storage ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

 //------------------------getData (dynamic data to be add in leave) from Api-------------------------//

    const getData = async () => {
    
      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)
         setEmp_id(user.data.emp_id)
         setFullName(user.data.fullName)
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    }

    const StoreData = async (values) => {
      try {
        const resp =await axios.request({
          method: 'POST',
          url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_request.php`,
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            emp_id:emp_id,
            emp_full_name:fullName,
            leave_start_date: values.myDate,
            leave_end_date: values.myDate1,
            leave_id:values.LeaveType.leave_id,
            leave_title:values.LeaveType.value,
            responsible_emp_id:values.Staff.resp_emp_id,
            responsible_emp_name:values.Staff.value,
            director_username:values.Director.director_username,
            director_name:values.Director.value,
            supervisor_id:values.Supervisor.supervisor_id,
            supervisor_name:values.Supervisor.value,
            no_of_days: values.Days.value,
            reason: values.Reason,
            document:values.documentURL,
            document_type:values.documentType,
          })
        })
        console.log(resp.data)
        Alert.alert(resp.data.message)
      } catch (error) {
        console.log(error.response.data)
      }
    };
   
  return (
<KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
    <ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.bgImage}>
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>

    <Formik initialValues={{ myDate: moment().format('YYYY-MM-DD'),myDate1: moment().format('YYYY-MM-DD'),LeaveType:'',Days:'',Staff:'',Director:'',Supervisor:'',Reason:'' }} 
    onSubmit={StoreData}>

      {({ handleSubmit, values, setFieldValue,handleChange }) => (
        <MyForm name={emp_id} data={ApplyLeaveArray} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </Formik>

</ScrollView>

    </ImageBackground>

    </KeyboardAvoidingView>
  );
}



  //------------------------MyForm handle by Formik-------------------------//

export const MyForm = props => {

  /////////////////////////////////////////////////////////
  /////////////////////--Sample Data Start--///////////////
  /////////////////////////////////////////////////////////

    //------------------------Store Data into Api-------------------------//
  

  const [LeaveData1,setLeaveData1]=useState([]);
  const [SupervisorData1,setSupervisorData1]=useState([]);
  const [StaffData1,setStaffData1]=useState([]);
  const [DirectorData1,setDirectorData1]=useState([]);

  
  /////////////////////////////////////////////////////////
  //------------------------ useEffect-------------------//
  /////////////////////////////////////////////////////////


      useEffect(()=>{
        getData1();
        },[])
    

      //------------------------getData (dynamic for apply leave) from Api-------------------------//
      const getData1 = async () => {
        try {
          axios.get(`https://hrm.tdea.pk/theme/actions/process/API/Leave_data_get.php?emp_id=`+ props.name)
          .then(res =>{
            setDirectorData1(res.data.Director)
            setSupervisorData1(res.data.Employees)
            setStaffData1(res.data.Employees)
            setLeaveData1(res.data.Leave_Types)
          })
        } catch (error) {
          console.log(error)
        }
      }
      // console.log(props.name)
  /////////////////////////////////////////////////////////
  //------------------------ Month Data States-------------------//
  /////////////////////////////////////////////////////////


const [MonthData1,setMonthData1]=useState([
  {label: '0.5', value: '0.5'},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
  {label: '24', value: '24'},
  {label: '25', value: '25'},
  {label: '26', value: '26'},
  {label: '27', value: '27'},
  {label: '28', value: '28'},
  {label: '29', value: '29'},
  {label: '30', value: '30'},
  {label: '1 Month', value: '1 Month'},
  {label: '2 Month', value: '2 Month'},
]);


  
  /////////////////////////////////////////////////////////
  /////////////////////--Sample Data End--/////////////////
  /////////////////////////////////////////////////////////

  const { handleSubmit, values, setFieldValue,handleChange } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [display,setDisplay]=useState(false);
  const [display1,setDisplay1]=useState(false);
  const [display2,setDisplay2]=useState(true);
  const [display3,setDisplay3]=useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(LeaveData1);

  const onOpen = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  }

  const onOpen1 = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  }

  const onOpen2 = () => {
    setOpen(false);
    setOpen1(false);
    setOpen3(false);
    setOpen4(false);
  }

  const onOpen3 = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen4(false);
  }

  const onOpen4 = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  }

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [items1, setItems1] = useState(MonthData1);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState([]);
  const [items2, setItems2] = useState(StaffData1);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState([]);
  const [items3, setItems3] = useState(DirectorData1);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [items4, setItems4] = useState(SupervisorData1);

 var validation=values.LeaveType.length!=0 && values.Days.length!=0 && display!=false &&  display1!=false &&
                values.Staff.length!=0 && values.Director.length!=0 && values.Supervisor.length!=0 && 
                values.Reason.length!=0;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDisplay(true);
    setDisplay2(false);
    setFieldValue('myDate', moment(date).format('YYYY-MM-DD'))
    hideDatePicker();
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);

  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date => {
    setFieldValue('myDate1', moment(date).format('YYYY-MM-DD'))
    hideDatePicker1();
    setDisplay1(true)
    setDisplay3(false)
  };
  
  /////////////////////////////////////////////////////////
  /////////////////////--pickDocument Start--//////////////
  /////////////////////////////////////////////////////////
  
  
const [fname,setFname]=useState('');
const pickDocument = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    setFname(res[0].name)

    const mimeType=(res[0].type)
    const extension = mimeType.split('/').pop();
    setFieldValue('documentType',extension)

    // Handle the base64 data
    const base64Data = await convertToBase64(res[0].uri);
    setFieldValue('documentURL',base64Data)
    Alert.alert('File attached!')
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User canceled the document selection
      console.log('Canceled');
    } else {
      // An error occurred during document selection
      console.log('Error:', err);
    }
  }
};

/////////////////////--convertToBase64--//////////////

const convertToBase64 = async (uri) => {
  const fileData = await RNFetchBlob.fs.readFile(uri, 'base64');
  return fileData;
};

  
  /////////////////////////////////////////////////////////
  /////////////////////--pickDocument End--//////////////
  /////////////////////////////////////////////////////////

  return (
    <View style={styles.mainView}>
      
      <DateTimePickerModal 
        isVisible={isDatePickerVisible}
        mode="date"
        display='spinner'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.myDate).toDate()}
      />

<DateTimePickerModal 
        isVisible={isDatePickerVisible1}
        mode="date"
        display='spinner'
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
        date={moment(values.myDate1).toDate()}
      />


    <DropDownPicker style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}} 
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      arrowIconStyle={{width: 15,height: 15}}
      onSelectItem={handleChange('LeaveType')}
      placeholder="Leave Type" 
      color="#fff"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular",}}
      open={open}
      onOpen={onOpen}
      value={value}
      items={LeaveData1.map((item) => ({  // JSON data will be placed here (inside LeaveData)
        label: item.title,
        value: item.title,
        leave_id:item.id,
      }))}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

    <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      maxHeight={200} 
      arrowIconStyle={{width: 15,height: 15}}
      onSelectItem={handleChange('Days')}
      placeholder="No of Days"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      open={open1}
      onOpen={onOpen1}
      value={value1}
      items={MonthData1.map((item) => ({
        label: item.label,
        value: item.value,
      }))}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems1}
      zIndex={3500}
    />

<TouchableOpacity style={styles.DateTime} onPress={showDatePicker}>
    <Text style={styles.DateTimeText}>{display ? moment(values.myDate).format('YYYY-MM-DD'): null}</Text>
    <Text style={styles.DateTimeText1}>{display2 ? 'Leave Start Date':null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.DateTime} onPress={showDatePicker1}>
    <Text style={styles.DateTimeText2}>{display1 ? moment(values.myDate1).format('YYYY-MM-DD'): null}</Text>
    <Text style={styles.DateTimeText3}>{display3 ? "Leave End Date": null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender1}/>
    </TouchableOpacity>

  <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Staff who will cover"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      onSelectItem={handleChange('Staff')}
      arrowIconStyle={{width: 15,height: 15}}
      open={open2}
      onOpen={onOpen2}
      value={value2}
      items={StaffData1.map((item) => ({
        label: item.fullName,
        value: item.fullName,
        resp_emp_id:item.emp_id
      }))}
      setOpen={setOpen2}
      setValue={setValue2}
      setItems={setItems2}
      zIndex={2000}
  />

  <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Relevant Director"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      onSelectItem={handleChange('Director')}
      arrowIconStyle={{width: 15,height: 15}}
      open={open3}
      onOpen={onOpen3}
      value={value3}
      items={DirectorData1.map((item) => ({
        label: item.fullName,
        value: item.fullName,
        director_username:item.username
      }))}
      setOpen={setOpen3}
      setValue={setValue3}
      setItems={setItems3}
      zIndex={1700}
  />

  <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Supervisor/Manager Reporting Line"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      onSelectItem={handleChange('Supervisor')}
      arrowIconStyle={{width: 15,height: 15}}
      open={open4}
      onOpen={onOpen4}
      value={value4}
      items={SupervisorData1.map((item) => ({
        label: item.fullName,
        value: item.fullName,
        supervisor_id:item.emp_id
      }))}
      setOpen={setOpen4}
      setValue={setValue4}
      setItems={setItems4}
      zIndex={1500}
  />

<View style={styles.TextInput}>
<TextInput 
placeholder='Reason'  
multiline={true} 
style={{left:6,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('Reason')}
value={values.Reason}
placeholderTextColor="#423cb5" />
</View>

{
  value==="Sick Leave" || value==="Maternity/Paternity leave" ? <View style={{flexDirection:'row'}}>
  <View style={{height:45,}}>
  <TouchableOpacity style={styles.Button1} onPress={pickDocument}>
  <Text style={styles.Btn1Text}>Choose File</Text>
  </TouchableOpacity>
  </View>
  </View>
  :null
}

{
  fname.length==0 ?null :<View>
  <TouchableOpacity style={styles.Button2}>
  <Text style={styles.Btn1Text}>{fname}</Text>
  </TouchableOpacity>
  </View>
}

      
<LinearGradient
colors={['#009ffd', '#2a2a72']} 
style={styles.linearGradient}>


<TouchableOpacity style={styles.Button} onPress={()=>{
  if(validation){
    handleSubmit()
    // StoreData()
    // Alert.alert("Leave Applied Successfully!")
  } else{
    Alert.alert("All Fields Are Mandatory!")
  }
}} >
       <Text style={styles.BtnLoginText}>Submit</Text>
</TouchableOpacity>

</LinearGradient>

    </View>
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
 marginTop:110,
 },
 Button1:{
  borderRadius:8,
  height:40,
  width:"110%",
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:'#fff',
  paddingHorizontal:7,
  borderColor:"#f2f2f4",
  borderWidth:0.45,
  elevation:0.45
},
Button2:{
  borderRadius:8,
  height:40,
  alignItems:"center",
  justifyContent:"center",
  // backgroundColor:'#fff',
  paddingHorizontal:7,
  borderColor:"#f2f2f4",
  borderWidth:0.45,
  elevation:0.25
},

Btn1Text:{
  textAlign:"center",
  fontFamily:"Montserrat-Regular",
  color:"#423cb5",
},
TextInput:{
  backgroundColor:'#fff',
  borderRadius:8,
  height:80,
  marginBottom:5,
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  marginHorizontal:0.5,
  elevation:0.45
},
Button:{
  borderRadius:5,
  height:40,
  alignItems:"center",
  justifyContent:"center",
},
BtnLoginText:{
  fontSize:15,
  color:"white",
  textAlign:"center",
  fontFamily:"Montserrat-Medium"
},
linearGradient: {
  borderRadius: 5,
  justifyContent:"center",
  marginTop:11,
  marginHorizontal:105,
},
  DateTime:{
    borderRadius:8,
    backgroundColor:"#fff",
    height:50,
    justifyContent:"center",
    marginHorizontal:0.5,
    borderWidth:0.45,
    borderColor:"#f2f2f4",
    paddingHorizontal:9,
    elevation:0.45,
    marginBottom:2,
  },
  DateTimeText:{
  color:"black",
  fontSize:14,
  fontFamily:"Montserrat-Regular"
  },
  DateTimeText1:{
    color:"#423cb5",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    position:"absolute",
    left:10,
    },

  DateTimeText2:{
      color:"black",
      fontSize:14,
      fontFamily:"Montserrat-Regular",
      },
  DateTimeText3:{
        color:"#423cb5",
        fontSize:14,
        fontFamily:"Montserrat-Regular",
        position:"absolute",
        left:10,
        },
    calender:{
      position:"absolute",
      right:9,
    },
    calender1:{
      position:"absolute",
      right:9,
    },
  
})