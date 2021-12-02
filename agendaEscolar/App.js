import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import AddStockTask from './AddStockTask';
import AddStudent from './AddStudent';
import AddTeacher from './AddTeacher';
import AdminMain from './AdminMain';
import AssignTask from './AssignTask';
import AssignTaskList1 from './AssignTaskList1';
import AssignTaskList2 from './AssignTaskList2';
import CreateNormalTask from './CreateNormalTask';
import CreateCommandTask from './CreateCommandTask';
import CompletedMenu from './CompletedMenu';
import CompletedMenuList from './CompletedMenuList';
import DailyTasks from './DailyTasks';
import EducatorMain from './EducatorMain';
import EducatorCompletedTasks from './EducatorCompletedTasks';
import EducatorAssignedTasks from './EducatorAssignedTasks';
import InfoTask from './InfoTask';
import LoginAdmin from './LoginAdmin';
import LoginEducator from './LoginEducator';
import ModifyStudent from './ModifyStudent';
import ModifyNormalTask from './ModifyNormalTask';
import ModifyStudentList from './ModifyStudentList';
import ModifyTeacher from './ModifyTeacher';
import ModifyTeacherList from './ModifyTeacherList';
import PictogramTask from './PictogramTask';
import StudentSubmenu from './StudentSubmenu';
import StudentList from './StudentList';
import TaskSubmenu from './TaskSubmenu';
import TeacherMain from './TeacherMain';
import ModifyNormalTaskList from "./ModifyNormalTaskList";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CreateCommandTask"
          component={CreateCommandTask}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="PictogramTask"
          component={PictogramTask}
        />
        <Stack.Screen
          name="DailyTasks"
          component={DailyTasks}
        />
        <Stack.Screen
          name="EducatorMain"
          component={EducatorMain}
        />
        <Stack.Screen
          name="TaskSubmenu"
          component={TaskSubmenu}
        />
        <Stack.Screen
          name="ModifyNormalTask"
          component={ModifyNormalTask}
        />
        <Stack.Screen
          name="ModifyNormalTaskList"
          component={ModifyNormalTaskList}
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
          name="AdminMain"
          component={AdminMain}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
        />
        <Stack.Screen
          name="EducatorAssignedTasks"
          component={EducatorAssignedTasks}
        />
        <Stack.Screen
          name="EducatorCompletedTasks"
          component={EducatorCompletedTasks}
        />
        <Stack.Screen
          name="AddStockTask"
          component={AddStockTask}
        />
        <Stack.Screen
          name="AssignTask"
          component={AssignTask}
        />
        <Stack.Screen
          name="AssignTaskList1"
          component={AssignTaskList1}
        />
        <Stack.Screen
          name="AssignTaskList2"
          component={AssignTaskList2}
        />
        <Stack.Screen
          name="CreateNormalTask"
          component={CreateNormalTask}
        />
        <Stack.Screen
          name="InfoTask"
          component={InfoTask}
        />
        <Stack.Screen
          name="LoginAdmin"
          component={LoginAdmin}
        />
        <Stack.Screen
          name="LoginEducator"
          component={LoginEducator}
        />
        <Stack.Screen
          name="ModifyStudent"
          component={ModifyStudent}
        />
        <Stack.Screen
          name="ModifyStudentList"
          component={ModifyStudentList}
        />
        <Stack.Screen
          name="ModifyTeacher"
          component={ModifyTeacher}
        />
        <Stack.Screen
          name="ModifyTeacherList"
          component={ModifyTeacherList}
        />
        <Stack.Screen
          name="StudentSubmenu"
          component={StudentSubmenu}
        />
        <Stack.Screen
          name="TeacherMain"
          component={TeacherMain}
        />

      <Stack.Screen
          name="CompletedMenuList"
          component={CompletedMenuList}
        />

      <Stack.Screen
          name="CompletedMenu"
          component={CompletedMenu}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;