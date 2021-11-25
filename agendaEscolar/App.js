import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminMain from './AdminMain';
import AddStockTask from './AddStockTask';
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="AddStockTask"
            component={AddStockTask}
          />
        </Stack.Navigator>
      </NavigationContainer>    
  );
};

export default App;