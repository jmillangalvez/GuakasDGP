import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './Login';
import DailyTasks from "./DailyTasks";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;