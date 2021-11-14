import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginAdmin from './loginAdmin';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="LoginAdmin"
          component={loginAdmin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
