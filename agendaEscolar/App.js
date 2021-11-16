import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import studentSubmenu from './StudentSubmenu';
import adminMenu from './admin_main';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Student submenu"
          component={studentSubmenu}
        />
        <Stack.Screen
          name="AdminMain"
          component={adminMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;