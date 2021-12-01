import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import studentSubmenu from './StudentSubmenu';
import AddStockTask from './AddStockTask'
import login from './Login';
import DailyTasks from './DailyTasks';
import loginAdmin from './loginAdmin';
import AdminMain from './AdminMain';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="AddStockTask"
            component={AddStockTask}
        />
        <Stack.Screen
            name="DailyTasks"
            component={DailyTasks}
        />
        <Stack.Screen
          name="LoginAdmin"
          component={loginAdmin}
        />
        <Stack.Screen
          name="AdminMain"
          component={AdminMain}
        />
        <Stack.Screen
          name="StudentSubmenu"
          component={studentSubmenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;