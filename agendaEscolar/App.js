import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import AddStockTask from './AddStockTask';
import AddStudent from './AddStudent';
import AddTeacher from './AddTeacher';
import AdminMain from './AdminMain';
import AssignStockTask from './AssignStockTask';
import AssignTask from './AssignTask';
import AssignTaskList1 from './AssignTaskList1';
import AssignTaskList2 from './AssignTaskList2';
import AssignCommandTask from './AssignCommandTask';
import AssignCommandTaskList1 from './AssignCommandTaskList1';
import AssignCommandTaskList2 from './AssignCommandTaskList2';
import CalendarMenu from './CalendarMenu';
import CreateNormalTask from './CreateNormalTask';
import CreateCommandTask from './CreateCommandTask';
import CompletedMenu from './CompletedMenu';
import CompletedMenuList from './CompletedMenuList';
import DailyTasks from './DailyTasks';
import EducatorMain from './EducatorMain';
import EducatorCompletedTasks from './EducatorCompletedTasks';
import EducatorAssignedTasks from './EducatorAssignedTasks';
import EducatorCompletedTasksList from './EducatorCompletedTasksList';
import EducatorAssignedTasksList from './EducatorAssignedTasksList';
import InfoTask from './InfoTask';
import LoginAdmin from './LoginAdmin';
import LoginEducator from './LoginEducator';
import ModifyStudent from './ModifyStudent';
import ModifyNormalTask from './ModifyNormalTask';
import ModifyStudentList from './ModifyStudentList';
import ModifyCommandTask from './ModifyCommandTask';
import ModifyCommandTaskList from './ModifyCommandTaskList';
import ModifyTeacher from './ModifyTeacher';
import ModifyTeacherList from './ModifyTeacherList';
import PictogramTask from './PictogramTask';
import FillMenuTask from './FillMenuTask';
import StudentSubmenu from './StudentSubmenu';
import StudentList from './StudentList';
import SearchStudents from './SearchStudents';
import SearchStudentsList from './SearchStudentsList';
import TaskSubmenu from './TaskSubmenu';
import TaskDates from './TaskDates';
import TeacherMain from './TeacherMain';
import ModifyNormalTaskList from "./ModifyNormalTaskList";
import WeeklyStats from "./WeeklyStats";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="PictogramTask"
          component={PictogramTask}
        />
        <Stack.Screen
          name="CreateCommandTask"
          component={CreateCommandTask}
        />
        <Stack.Screen
          name="DailyTasks"
          component={DailyTasks}
        />
        <Stack.Screen
          name="CalendarMenu"
          component={CalendarMenu}
        />
        <Stack.Screen
          name="FillMenuTask"
          component={FillMenuTask}
        />
        <Stack.Screen
          name="AssignStockTask"
          component={AssignStockTask}
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
          name="WeeklyStats"
          component={WeeklyStats}
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
          name="ModifyCommandTask"
          component={ModifyCommandTask}
        />
        <Stack.Screen
          name="ModifyCommandTaskList"
          component={ModifyCommandTaskList}
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
          name="AssignCommandTask"
          component={AssignCommandTask}
        />
        <Stack.Screen
          name="AssignCommandTaskList1"
          component={AssignCommandTaskList1}
        />
        <Stack.Screen
          name="AssignCommandTaskList2"
          component={AssignCommandTaskList2}
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
          name="TaskDates"
          component={TaskDates}
        />
        <Stack.Screen
          name="EducatorCompletedTasks"
          component={EducatorCompletedTasks}
        />
        <Stack.Screen
          name="EducatorAssignedTasksList"
          component={EducatorAssignedTasksList}
        />
        <Stack.Screen
          name="EducatorCompletedTasksList"
          component={EducatorCompletedTasksList}
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
          name="SearchStudents"
          component={SearchStudents}
        />
        <Stack.Screen
          name="SearchStudentsList"
          component={SearchStudentsList}
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