import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import studentSubmenu from './StudentSubmenu';
import login from './Login';
import DailyTasks from './DailyTasks';
import loginAdmin from './loginAdmin';
import admin_main from './admin_main';

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
          name="LoginAdmin"
          component={loginAdmin}
        />
        <Stack.Screen
          name="admin_main"
          component={admin_main}
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