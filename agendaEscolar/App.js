import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './Login';
import DailyTasks from './DailyTasks';
import InfoTask from './InfoTask';
import loginAdmin from './loginAdmin';
import loginEducator from './loginEducator';
import admin_main from './admin_main';
import EducatorMain from './EducatorMain';
import CreateNormalTask from './CreateNormalTask';
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';
import AssignTask from "./AssignTask";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="Login"
            component={login}
        />
        <Stack.Screen
            name="DailyTasks"
            component={DailyTasks}
        />
        <Stack.Screen
            name="InfoTask"
            component={InfoTask}
        />
        <Stack.Screen
          name="LoginAdmin"
          component={loginAdmin}
        />
        <Stack.Screen
          name="LoginEducator"
          component={loginEducator}
        />
        <Stack.Screen
          name="admin_main"
          component={admin_main}
        />
        <Stack.Screen
          name="EducatorMain"
          component={EducatorMain}
        />
        <Stack.Screen
          name="CreateNormalTask"
          component={CreateNormalTask}
        />
        <Stack.Screen
          name="AddTeacher"
          component={AddTeacher}
        />
        <Stack.Screen
          name="AddStudent"
          component={AddStudent}
        />
        <Stack.Screen
          name="AssignTask"
          component={AssignTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;