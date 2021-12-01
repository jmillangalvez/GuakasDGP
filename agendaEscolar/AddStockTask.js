import React, { Component,useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, TouchableOpacity, View, TextInput, Picker, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, Input, Divider } from 'react-native-elements';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
}

class AddStockTask extends Component {
  constructor(props) {
        super(props);
        this.state = { title: "", description: "", picto: 0};
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

  render() {
    changeScreenOrientation();

    const { title, description, picto} = this.state;
    

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
              <TouchableOpacity>
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
            <Text>{this.state.picto}</Text>
              <Picker
                selectedValue={this.state.picto}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => this.setState({picto: itemValue})}
                accessibilityLabel="tipo de pictograma"
                accessibilityRole="input"
                accessibilityHint="Asignar tipo de pictograma a alumno"
              >
                <Picker.Item label ="foto" value="0" />
                <Picker.Item label ="pictograma" value="1" />
                <Picker.Item label ="video" value="2" />
              </Picker>
          </View>

          {/* Botón para enviar el formulario */}
          <View>
            <TouchableOpacity>
              <Button
                title="Añadir comanda stock"
                type="outline"
                onPress={() => this.publishTask }
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