import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../PJT_main_screens/Login';
import AdminBottomNav from './AdminBottomNav';
import StaffBottomNav from './StaffBottomNav';
import SplashScreen from '../PJT_main_screens/SplashScreen';

import SalaryScreen from '../PJT_Emp_Screens/SalaryScreen';
import AttendanceScreen from '../PJT_Emp_Screens/AttendanceScreen';

import ApplyLeave from '../PJT_Request_Screens/ApplyLeave';
import TimeApprovalApply from '../PJT_Request_Screens/TimeApprovalApply';
import WorkHome from '../PJT_Request_Screens/WorkHome';

import LeaveStatus from '../PJT_Status_Screens/LeaveStatus';
import TimeApprovalStatus from '../PJT_Status_Screens/TimeApprovalStatus';

import ApproveLeave from '../PJT_Approval_Screens/ApproveLeave';
import TeamScreen from '../PJT_Status_Screens/TeamScreen';
import ForgotPassword from '../PJT_main_screens/ForgotPassword';
import WorkFromHomeStatus from '../PJT_Status_Screens/WorkFromHomeStatus';
import GiftRegister from '../PJT_main_screens/GiftRegister';
import Sample from '../PJT_main_screens/Sample';
import EmployeeTors from '../PJT_Emp_Screens/EmployeeTors';

const Stack = createNativeStackNavigator();

function MyStack({navigation}) {

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerTintColor:"white",
        headerStyle:{backgroundColor: "#0F75BA"},
        headerTitleAlign:"center",
        headerTitleStyle: {fontFamily:"Montserrat-Medium"}
      }}
      >           
      
         {/* <Stack.Screen name="Sample" component={Sample} options={{ headerShown: false }} /> */}
      
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false,}} />  
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false,}} />
        <Stack.Screen name="StaffBottomNav" component={StaffBottomNav} options={{ headerShown: false }} />
        <Stack.Screen name="AdminBottomNav" component={AdminBottomNav} options={{ headerShown: false }} />

        <Stack.Screen name="Salary Slip" component={SalaryScreen}  />
        <Stack.Screen name="Attendance" component={AttendanceScreen}  />
        <Stack.Screen name="Download TORs" component={EmployeeTors} />

        <Stack.Screen name="Apply Leave" component={ApplyLeave}  />
        <Stack.Screen name="Apply Time Approval" component={TimeApprovalApply}  />
        <Stack.Screen name="Work From Home" component={WorkHome}  />

        <Stack.Screen name="Time Approval Status" component={TimeApprovalStatus}  />
        <Stack.Screen name="Leave Status" component={LeaveStatus}  />
        <Stack.Screen name="Work from Home/Field Status" component={WorkFromHomeStatus}  />
        <Stack.Screen name="Teams" component={TeamScreen}  />

        <Stack.Screen name="Gift Register" component={GiftRegister}  />
        <Stack.Screen name="Forgot Password" component={ForgotPassword}/>

        <Stack.Screen name="Approve Leave" component={ApproveLeave}  />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
