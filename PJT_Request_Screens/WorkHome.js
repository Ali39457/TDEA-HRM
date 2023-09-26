import React, { useState,useEffect } from 'react';
import { Button, Text, View,TextInput,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Alert,KeyboardAvoidingView} from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkHome() {

    //------------------------WorkHome State will send to Api-------------------------//

    const [WorkHome,setWorkHome]=useState([]);
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
         setFullName(user.data.fullName)
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    }
    //------------------------Store Data into Api-------------------------//

      //------------------------Store Data into Api-------------------------//

  const StoreData = async (values) => {
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `https://hrm.tdea.pk/theme/actions/process/API/Leave_request.php`, //Link will be replaced here
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          emp_id:emp_id,
          emp_full_name:fullName,
          type:values.Type.value, 
          start_date:values.myDate,
          end_date:values.myDate1,
          director_username:values.Director.director_username,
          director_name:values.Director.value,
          supervisor_id:values.Supervisor.supervisor_id,
          supervisor_name:values.Supervisor.value,
          task_performed:values.Task,
          reason:values.Reason
        })
      })
      console.log(resp.data)
      Alert.alert("Work From Home Applied Successfully!")
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
    <Formik initialValues={{ myDate: moment().format('YYYY-MM-DD'),myDate1: moment().format('YYYY-MM-DD'),Type:'',Director:'',Supervisor:'',Task:'',Reason:'' }} 
     onSubmit={StoreData}>

      {({ handleSubmit, values, setFieldValue,handleChange }) => (
        <MyForm name={emp_id} data={WorkHome} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </Formik>
</ScrollView>
    </ImageBackground>

    </KeyboardAvoidingView>

  );
}

export const MyForm = props => {


  /////////////////////////////////////////////////////////
  /////////////////////--Sample Data Start--///////////////
  /////////////////////////////////////////////////////////
  
  
  const [TypeData1,setTypeData1]=useState([
    {label: 'Work From Home', value: 'Work From Home'},
    {label: 'Field Visit', value: 'Field Visit'},
  ]);
  
  const [DirectorData1,setDirectorData1]=useState([]);
  const [SupervisorData1,setSupervisorData1]=useState([]);


    /////////////////////////////////////////////////////////
  //--------------------- useEffect--------START-----------//
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
      })
    } catch (error) {
      console.log(error)
    }
  }
  //  console.log(props.name)

  /////////////////////////////////////////////////////////
  //---------------------- useEffect---END----------------//
  /////////////////////////////////////////////////////////
  
  
    /////////////////////////////////////////////////////////
    /////////////////////--States for Form --/////////////////
    /////////////////////////////////////////////////////////

  const { handleSubmit, values, setFieldValue,handleChange } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [display,setDisplay]=useState(false);
  const [display1,setDisplay1]=useState(false);
  const [display2,setDisplay2]=useState(true);
  const [display3,setDisplay3]=useState(true);

    /////////////////////////////////////////////////////////
    ////////////--States for TypeData1 DropDown --///////////
    /////////////////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(TypeData1);

    /////////////////////////////////////////////////////////
    /////////--States for DirectorData1 DropDown --///////////
    /////////////////////////////////////////////////////////

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [items1, setItems1] = useState(DirectorData1);

      /////////////////////////////////////////////////////////
    /////////--States for SupervisorData1 DropDown --///////////
    /////////////////////////////////////////////////////////

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState([]);
  const [items2, setItems2] = useState(SupervisorData1);

  const onOpen = () => {
    setOpen1(false);
    setOpen2(false);
  }

  const onOpen1 = () => {
    setOpen(false);
    setOpen2(false);
  }

  const onOpen2 = () => {
    setOpen(false);
    setOpen1(false);
  }

 var validation=values.Type.length!=0 && display!=false &&  display1!=false &&  
                values.Director.length!=0 && values.Supervisor.length!=0 && 
                values.Reason.length!=0 && values.Task.length!=0;

    /////////////////////////////////////////////////////////
    /////////--Functions for Start Date --///////////
    /////////////////////////////////////////////////////////
            

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

     /////////////////////////////////////////////////////////
    /////////--Functions for End Date --///////////
    /////////////////////////////////////////////////////////

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
      onSelectItem={handleChange('Type')}
      placeholder="Type" 
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular",}}
      open={open}
      onOpen={onOpen}
      value={value}
      items={TypeData1.map((item) => ({         
        label: item.label,
        value: item.value,
      }))}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

<TouchableOpacity style={styles.DateTime} onPress={showDatePicker}>
    <Text style={styles.DateTimeText}>{display ? moment(values.myDate).format('YYYY-MM-DD'): null}</Text>
    <Text style={styles.DateTimeText1}>{display2 ? 'Start Date':null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.DateTime} onPress={showDatePicker1}>
    <Text style={styles.DateTimeText2}>{display1 ? moment(values.myDate1).format('YYYY-MM-DD'): null}</Text>
    <Text style={styles.DateTimeText3}>{display3 ? "End Date": null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender1}/>
    </TouchableOpacity>

    <DropDownPicker style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}} 
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      arrowIconStyle={{width: 15,height: 15}}
      onSelectItem={handleChange('Supervisor')}
      placeholder="Supervisor" 
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular",}}
      open={open2}
      onOpen={onOpen2}
      value={value2}
      items={SupervisorData1.map((item) => ({         
        label: item.fullName,
        value: item.fullName,
        supervisor_id:item.emp_id
      }))}
      setOpen={setOpen2}
      setValue={setValue2}
      setItems={setItems2}
    />

    <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Director"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      onSelectItem={handleChange('Director')}
      arrowIconStyle={{width: 15,height: 15}}
      open={open1}
      onOpen={onOpen1}
      value={value1}
      items={DirectorData1.map((item) => ({         
        label: item.fullName,
        value: item.fullName,
        director_username:item.username
      }))}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems1}
      zIndex={1500}
  />





<View style={styles.TextInput1}>
<TextInput 
placeholder='Task to be Performed'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('Task')}
value={values.Task}
placeholderTextColor="#423cb5" />
</View>


<View style={styles.TextInput2}>
<TextInput 
placeholder='Write a Reason'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('Reason')}
value={values.Reason}
placeholderTextColor="#423cb5" />
</View>

<LinearGradient
colors={['#009ffd', '#2a2a72']} 
style={styles.linearGradient}>

<TouchableOpacity style={styles.Button} onPress={()=>{
  if(validation){
    handleSubmit()
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
TextInput1:{
  backgroundColor:'#fff',
  borderRadius:8,
  height:80,
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  marginHorizontal:0.5,
  paddingVertical:-20,
  elevation:0.45,
  marginBottom:2,
},
TextInput2:{
  backgroundColor:'#fff',
  borderRadius:8,
  height:80,
  marginBottom:5,
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  elevation:0.45,
  marginHorizontal:0.5,
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
  fontSize:13,
  fontFamily:"Montserrat-Regular"
  },
  DateTimeText1:{
    color:"#423cb5",
    fontSize:13,
    fontFamily:"Montserrat-Regular",
    position:"absolute",
    left:10,
    },

  DateTimeText2:{
      color:"black",
      fontSize:13,
      fontFamily:"Montserrat-Regular",
      },
  DateTimeText3:{
        color:"#423cb5",
        fontSize:13,
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