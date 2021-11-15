import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './Styles';

function subMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.goBackView}>
        <TouchableOpacity onPress={() => navigation.navigate('submenu')}>
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir comanda stock</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar comanda stock</Text>
      </TouchableOpacity>
    </View>
  );
}

export default subMenu;
