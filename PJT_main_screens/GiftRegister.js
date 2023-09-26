import React, { useState,useEffect } from 'react';
import { Button, Text, View,TextInput,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,Alert,KeyboardAvoidingView} from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");

export default function GiftRegister() {

    //------------------------GiftRegister State will send to Api-------------------------//

    const [GiftRegister,setGiftRegister]=useState([]);
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

//-------------------------------------------------//
//-----------------StoreData--------Start-----------//
//-------------------------------------------------//

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
              gift_given_by:values.GivenBy,
              gift_received_by:values.ReceivedBy,
              date_of_receiving:values.myDate,
              Value_of_gift:values.GiftValue,
              disposal_of_gift:values.GiftDisposal,
              description_of_gift:values.Description,
            })
          })
          console.log(resp.data)
          Alert.alert("Record successfully saved!")
        } catch (error) {
          console.log(error.response.data)
        }
      };

//-------------------------------------------------//
//-----------------StoreData--------End-----------//
//-------------------------------------------------//

  return (

    <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
    <ImageBackground source={require('../assets/bgImage3.jpeg')}  resizeMode="cover" style={styles.bgImage}>
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
    <Formik initialValues={{ myDate: moment().format('YYYY-MM-DD'),myDate1: moment().format('YYYY-MM-DD'),Type:'',Director:'',Supervisor:'',Task:'',Reason:'' }} 
    onSubmit={StoreData}>

      {({ handleSubmit, values, setFieldValue,handleChange }) => (
        <MyForm name={emp_id} data={GiftRegister} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </Formik>
</ScrollView>
    </ImageBackground>

    </KeyboardAvoidingView>

  );
}

export const MyForm = props => {


  const { handleSubmit, values, setFieldValue,handleChange } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [display,setDisplay]=useState(false);
  const [display2,setDisplay2]=useState(true);


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




 var validation= display!=false ; 
                


  return (
    <View style={styles.mainView}>


<View style={styles.TextInput1}>
<TextInput 
placeholder='Gift Given By'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('GivenBy')}
value={values.GivenBy}
placeholderTextColor="#423cb5" />
</View>

<View style={styles.TextInput1}>
<TextInput 
placeholder='Gift Received By'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('ReceivedBy')}
value={values.ReceivedBy}
placeholderTextColor="#423cb5" />
</View>

      
<DateTimePickerModal 
        isVisible={isDatePickerVisible}
        mode="date"
        display='spinner'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.myDate).toDate()}
/>

<TouchableOpacity style={styles.DateTime} onPress={showDatePicker}>
    <Text style={styles.DateTimeText}>{display ? moment(values.myDate).format('YYYY-MM-DD'): null}</Text>
    <Text style={styles.DateTimeText1}>{display2 ? 'Date of Receiving':null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender}/>
</TouchableOpacity>



<View style={styles.TextInput1}>
<TextInput 
placeholder='Value of Gift(s)'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('GiftValue')}
value={values.GiftValue}
placeholderTextColor="#423cb5" />
</View>

<View style={styles.TextInput1}>
<TextInput 
placeholder='Disposal of Gift(s)'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('GiftDisposal')}
value={values.GiftDisposal}
placeholderTextColor="#423cb5" />
</View>

<View style={styles.TextInput2}>
<TextInput 
placeholder='Description of Gift(s)'  
multiline={true} 
style={{left:6,paddingVertical:-20,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('Description')}
value={values.Description}
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
  height:45,
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  marginHorizontal:0.5,
  paddingVertical:-20,
  elevation:0.45,
  justifyContent:"center",
  marginBottom:2,
  fontSize:14,
},
TextInput2:{
  backgroundColor:'#fff',
  borderRadius:8,
  height:80,
  marginBottom:2,
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  elevation:0.45,
  marginHorizontal:0.5,
  fontSize:14,
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