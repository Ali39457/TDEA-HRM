import React, { useState,useCallback,useEffect } from 'react';
import { Button, Text, View,TextInput,TouchableOpacity,ImageBackground,StyleSheet,PermissionsAndroid,Dimensions,Alert,KeyboardAvoidingView} from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
DropDownPicker.setListMode("SCROLLVIEW");
// import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

export default function TimeApprovalApply() {

   //------------------------TimeApprovalApply State will send to Api-------------------------//
   const [TimeApprovalApply,setTimeApprovalApply]=useState([]);
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
          date:values.myDate,
          director_username:values.Director.director_username,
          director_name:values.Director.value,
          supervisor_id:values.Supervisor.supervisor_id,
          supervisor_name:values.Supervisor.value,
          reason: values.Reason,
          document:values.documentURL
        })
      })
      console.log(resp.data)
      Alert.alert("Time Approval Applied Successfully!")
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

    <Formik initialValues={{ myDate: moment().format('YYYY-MM-DD'),myTime1:moment().format('YYYY-MM-DD HH:mm'),myTime2: moment().format('YYYY-MM-DD HH:mm'),Director:'',Supervisor:'',Reason:'',Document:'' }} 
    onSubmit={StoreData}>

      {({ handleSubmit, values, setFieldValue,handleChange}) => (
        <MyForm name={emp_id} data={TimeApprovalApply} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </Formik>

</ScrollView>

    </ImageBackground>

    </KeyboardAvoidingView>
  );
}

export const MyForm = props => {

  /////////////////////////////////////////////////////////
  /////////////////////-- Data State--///////////////
  /////////////////////////////////////////////////////////


  const [TypeData1,setTypeData1]=useState([
    {label: 'Late sitting Approval', value: 'Late sitting Approval'},
    {label: 'Work on weekends Approval', value: 'Work on weekends Approval'},
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

  const { handleSubmit, values, setFieldValue,handleChange} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [display,setDisplay]=useState(false);
  const [display1,setDisplay1]=useState(false);
  const [display2,setDisplay2]=useState(true);
  const [display3,setDisplay3]=useState(true);
  const [display4,setDisplay4]=useState(false);
  const [display5,setDisplay5]=useState(true);

    /////////////////////////////////////////////////////////
  /////////////////////--Sample Data End--/////////////////
  /////////////////////////////////////////////////////////


// // Document Picker //
// const [SelectedImages1, setSelectedImages1] = useState([]);
// const FileSelect1 = async () => {
//   try {
//     const images = await ImagePicker.openPicker({
//       multiple: true,
//       mediaType: 'photo',
//       includeBase64:true,
//       cropping:true
//     });
//     setFieldValue('PicURL', images[0].data)
//     Alert.alert('File Selected!')
//     // create formData object and append data into formData//
//   //   const formData = new FormData();
//   //   images.forEach((image, index) => {
//   //    formData.append(`image_${index}`, {
//   //      image_uri: image.data,
//   //      image_name: image.path.substring(image.path.lastIndexOf('/') + 1),
//   //      image_type: image.mime,
//   //    });
//   //  });
        
//   } catch (error) {
//     console.log(error);
//   }
// };
// // Document Picker//


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

  const onOpen3 = () => {
    setOpen2(false);
    setOpen4(false);
  }

  const onOpen4 = () => {
    setOpen3(false);
    setOpen2(false);
  }

  const onOpen2 = () => {
    setOpen3(false);
    setOpen4(false);
  }

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState([]);
  const [items2, setItems2] = useState(TypeData1);


  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState([]);
  const [items3, setItems3] = useState(DirectorData1);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [items4, setItems4] = useState(SupervisorData1);


  var validation= display!=false &&  values.Director.length!=0 && 
 values.Supervisor.length!=0 

  //--- date time picker---//

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



  return (
    <View style={styles.mainView}>

<DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Type"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular"}}
      onSelectItem={handleChange('Type')}
      arrowIconStyle={{width: 15,height: 15}}
      open={open2}
      onOpen={onOpen2}
      value={value2}
      items={TypeData1.map((item) => ({             // JSON data will be placed here (inside TypeData)
        label: item.label,
        value: item.value,
      }))}
      setOpen={setOpen2}
      setValue={setValue2}
      setItems={setItems2}
      zIndex={2000}
  />
      
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
    <Text style={styles.DateTimeText1}>{display2 ? 'Date':null}</Text> 
    <FontAwesome name="calendar"  size ={18} color="lightgrey" style={styles.calender}/>
    </TouchableOpacity>


  <DropDownPicker  style={{borderWidth:0.45,borderColor:"#f2f2f4",elevation:0.45,marginBottom:2,}}
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:1,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4"}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      placeholder="Director"
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
      placeholder="Supervisor"
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
placeholder='Notes if any'  
multiline={true} 
style={{left:6,fontFamily:"Montserrat-Regular",}}
onChangeText={handleChange('Reason')}
value={values.Reason}
placeholderTextColor="#423cb5" />
</View>

<View style={{flexDirection:'row'}}>
<View style={{height:45,}}>
<TouchableOpacity style={styles.Button1} onPress={pickDocument}>
<Text style={styles.Btn1Text}>Choose File</Text>
</TouchableOpacity>
</View>
</View>


{
  fname.length==0 ?null :<View>
  <TouchableOpacity style={styles.Button2}>
  <Text style={styles.Btn1Text}>{fname}</Text>
  </TouchableOpacity>
  </View>
}
     
<LinearGradient colors={['#009ffd', '#2a2a72']} style={styles.linearGradient}>
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


BtnLoginText:{
  fontSize:15,
  color:"white",
  textAlign:"center",
  fontFamily:"Montserrat-Medium"
},
linearGradient: {
  borderRadius: 5,
  justifyContent:"center",
  marginTop:20,
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
    Image:{
      height:40,
      width:50,
      borderRadius:5,
      marginLeft:20,
        },
  
})