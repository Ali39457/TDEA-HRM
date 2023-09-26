import React, { useState } from 'react';
import {Text, View,TouchableOpacity,ImageBackground,StyleSheet,Dimensions,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const Width=Dimensions.get("screen").width;
const Height=Dimensions.get("screen").height;
import { ScrollView } from 'react-native-virtualized-view';
DropDownPicker.setListMode("SCROLLVIEW");

export default function AttendanceScreen() {

  const DATA=[
    {key:"1",month:"January",date:"January 01,2022",check_in:"9:29",check_out:"17:29"},
    {key:"2",month:"January",date:"January 02,2022",check_in:"9:30",check_out:"17:29"},
    {key:"3",month:"January",date:"January 03,2022",check_in:"9:31",check_out:"17:29"},
    {key:"4",month:"January",date:"January 04,2022",check_in:"9:32",check_out:"17:29"},
    {key:"5",month:"February",date:"January 01,2022",check_in:"9:32",check_out:"17:29"},
    {key:"6",month:"February",date:"January 02,2022",check_in:"9:32",check_out:"17:29"},
  ]

    //------------------------getData from Api-------------------------//
    const [SalaryData,setSalaryData]=useState([]);
    const [AttendanceData,setAttendanceData]=useState('');
    {/*
     
    useEffect(()=>{
    getData();
    },[])
    
    const getData = async () => {
    
      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)
         setSalaryData((user.member_list))
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    
    }
    
    */}

//-------------------------------DropDown States --------------------------------//
    
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    {label: 'January', value:'January'},
    {label: 'February', value:'February'},
    {label: 'March', value:'March'},
    {label: 'April', value:'April'},
    {label: 'May', value:'May'},
    {label: 'June', value:'June'},
    {label: 'July', value:'July'},
    {label: 'August', value:'August'},
    {label: 'September', value:'September'},
    {label: 'October', value:'October'},
    {label: 'November', value:'November'},
    {label: 'December', value:'December'},
    {label: '', value:''},
  ]);

  const renderItem=({item})=>{ if(item.month==AttendanceData){
    return  (
      <View style={styles.maintitle1}>
        <View style={styles.title1}>
          <Text style={styles.textTitle1}>{item.date}</Text>
        </View>
        <View style={styles.title1}>
          <Text style={styles.textTitle1}>{item.check_in}</Text>
        </View>
        <View style={styles.title1}>
          <Text style={styles.textTitle1}>{item.check_out}</Text>
        </View>
      </View>
    )
  }
    
  }



  return (
    <ImageBackground source={require('../assets/bgImage3.jpeg')} resizeMode="cover" style={styles.bgImage}>
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
<View style={styles.mainView}>
    <DropDownPicker style={{borderWidth:1.2,borderColor:"#f2f2f4",}} 
      dropDownContainerStyle={{ borderColor:"#f2f2f4",elevation:5,borderRadius:null,width:"99.4%",left:1,backgroundColor:"#f2f2f4",paddingVertical:15}}
      listItemLabelStyle={{fontFamily:"Montserrat-Regular",}}
      selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
      arrowIconStyle={{width: 15,height: 15}}
      onSelectItem={(item)=>{setAttendanceData(item.value)}}
      placeholder="MONTH" 
      color="#fff"
      placeholderStyle={{color:"#423cb5",fontFamily:"Montserrat-Regular",}}
      open={open}
      value={value} 
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={500}
    />
  
        <View style={styles.maintitle}>
        <View style={styles.title}>
         <Text style={styles.textTitle}>Date</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.textTitle}>Check_in Time</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.textTitle}>Check_out Time</Text>
        </View>

        </View>  
        
        <View style={{marginTop:20}}>
        <FlatList listKey="1" style={styles.FlatList}
        data={DATA}
        renderItem={renderItem}
        />
        </View>
       

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
 marginTop:110,
 padding:23,
 justifyContent:"center",
 alignItems:"center",
 },

  maintitle:{
    flexDirection:"row",
    marginTop:20,
    justifyContent:"center",
    alignItems:"center",
  },
  maintitle1:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  title:{
    borderRadius:5,
    margin:2,
    height:40,
    width:"32%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0F75BA",
    elevation:2,
  },
  textTitle:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:12,
    color:"#fff",
    textAlign:"center",
 
  },
  title1:{
    borderRadius:5,
    marginTop:5,
    margin:2,
    height:40,
    width:"32%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    elevation:2,
  },
  textTitle1:{
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:5,
    fontSize:12,
    textAlign:"center",
    color:"#423cb5",
  }
});