import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modificaTarea from "./modificaTarea"
import listaPictograma from "./ListaPictograma"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="m_tarea">
        <Stack.Screen name="m_tarea" component={modificaTarea} />
        <Stack.Screen name="ListaPictograma" component={listaPictograma} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;