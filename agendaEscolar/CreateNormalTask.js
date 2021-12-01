import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class CreateNormalTask extends Component {
  constructor(props) {
    super(props);
    this.state = { titulo: "", descripcion: "" };
  };

  createTask = () =>{
    this.createTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido creada",
    )
  }

  async createTaskDB() {
    try {
      const response = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.titulo,
            description: this.state.descripcion,
            finished: 0,
            taskDate: "2021-11-18"
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render (){
    const { titulo, descripcion } = this.state;

    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="CrearTareaNormal" accessibilityRole="header">Crear Tarea Normal</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('TaskSubmenu') }
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al menu del administrador"
            color="#bcbcbc"
            >
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addStudent}>
          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo de la tarea:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({titulo: text})}
                defaultValue = {this.state.titulo}
                placeholder = "Titulo Tarea"
                accessibilityLabel="Titulo Tarea"
                accessibilityHint="Introduce el titulo de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Descripción:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({descripcion: text})}
                defaultValue = {this.state.descripcion}
                multiline={true}
                placeholder = ".............................."
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Prioridad:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({descripcion: text})}
                defaultValue = {this.state.descripcion}
                multiline={true}
                placeholder = "Alta, Media, Baja"
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Crear Tarea"
            accessibilityLabel="Crear Tarea"
            accessibilityRole="Button"
            accessibilityHint="Crea la tarea"
            color="#bcbcbc"
            onPress={this.createTask}
          />
        </View>

      </View>
    )
  }
}

export default CreateNormalTask;