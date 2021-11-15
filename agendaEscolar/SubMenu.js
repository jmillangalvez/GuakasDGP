import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';

function subMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.goBackView}>
        <TouchableOpacity onPress={() => alert('Adios')}>
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Añadir tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Añadir comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Añadir comanda stock</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Modificar tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Modificar comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterButtonTouch} onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.buttonText}>Modificar comanda stock</Text>
      </TouchableOpacity>
    </View>
  );
}

export default subMenu;
