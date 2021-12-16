import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, Text } from 'react-native';
import styles from './Styles';

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
}
// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation
class AddStockTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", picto: 0, show: false};
  };

  async publishTask(){
    try {
      const response = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          picto: this.state.picto
        })
      });
    } catch (error) {
      consolge.log("Error al enviar formulario: " + error);
    }
  }

  showAlert(){
    return(
      <Text style={{color: '#ff0000'}}>Usuario o contraseña incorrectas</Text>
    )
  }

  render() {
    changeScreenOrientation();

    const { title, description, picto } = this.state;
    return (
      <View style={styles.container}>
        
        {/* Accessibility rol  */}
        <SafeAreaView style={styles.banner}>
          <Text value="PANTALLA PRINCIPAL ADMIN" accessibilityRole="header"></Text>
        </SafeAreaView> 
        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
            <Button
            title="Volver"
            type="clear"
            accessibilityLabel="Submenú tareas"
            accessibilityRole="button"
            accessibilityHint="Vuelve al submenú de tareas"
            />
          </TouchableOpacity>
        </View>
          {/* Poner titulo a una tarea */}
          <View style={styles.Input}>
              <TouchableOpacity onFocus={() => placeholder=''}>
              <TextInput
                  onChangeText = { (newTitle) => this.setState({title: newTitle})}
                  label='Título tarea'
                  placeholder='Introduce una tarea'
                  accessibilityLabel="Introduce una tarea"
                  accessibilityRole="input"
                  accessibilityHint="Introducir el título de una tarea"
              />
              </TouchableOpacity>
          </View>
          {/* Añadir descripción de una tarea */}
          
          <View style={styles.Input}>
              <TextInput
                  onChangeText = { (newText) => this.setState({description: newText})}
                  label='Descripción texto'
                  placeholder='Introduce una descripción'
                  accessibilityLabel="descripción de tarea"
                  accessibilityRole="input"
                  accessibilityHint="Describir la tarea a realizar"
              />
          </View>
          
          {/* Añadir título al pictograma: va con un icono + */}
          <View style={styles.Input}>
              <TextInput
                  onChangeText={ (num) => this.setState({picto: num})}
                  label='Título pictograma'
                  placeholder='Introduce un título'
                  keyboardType="numeric"
                  accessibilityLabel="título de pictograma"
                  accessibilityRole="input"
                  accessibilityHint="Introduce un título para el pictograma"
              />
          </View>
          {/* Botón para enviar el formulario */}
          <View>
            <TouchableOpacity onPress={() => this.publishTask }>
              <Button
                title="Añadir comanda stock"
                type="outline"
                accessibilityLabel="Aádir comanda"
                accessibilityRole="button"
                accessibilityHint="Añade la comanda stock a la lista"
              />
            </TouchableOpacity>
          </View>

      </View>

    );
  };
}

export default AddStockTask;