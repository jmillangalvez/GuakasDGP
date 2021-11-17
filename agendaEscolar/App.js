import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaModificarEstudiante from './ListaModificarEstudiante';
import ListaModificarEducador from './ListaModificarEducador';
import ModifyStudent from './ModifyStudent';
import ModifyTeacher from './ModifyTeacher';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

       
    <Stack.Screen
          name="ListaModificarEducador"
          component={ListaModificarEducador}
        />


      <Stack.Screen
          name="ModifyTeacher"
          component={ModifyTeacher}
      />

      <Stack.Screen
          name="ListaModificarEstudiante"
          component={ListaModificarEstudiante}
        />

      <Stack.Screen
          name="ModifyStudent"
          component={ModifyStudent}
      />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;