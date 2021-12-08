import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AddStudent extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", accesibilidad: 1}
  }

  aniadirEstudiante = () => {
    this.createStudentDB();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }

  async createStudentDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/students/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            accesibilityType: this.state.accesibilidad
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AniadirProfesor" accessibilityRole="header">Añadir Estudiante</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('StudentSubmenu') }
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
              <Text style={styles.formContent}>Nombre:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({name: text})}
                defaultValue = {this.state.name}
                placeholder = "Nombre Estudiante"
                accessibilityLabel="Nombre Profesor"
                accessibilityHint="Introduce el nombre del profesor" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Tipo de accesibilidad:</Text>
            </View>

            <View style={styles.formItem}>
            <Picker
              accessibilityLabel="Clase asignada"
              accessibilityRole="spinbutton"
              accessibilityHint="Selecciona a que clase esta asignado" 
              onValueChange = {(itemValue) => this.setState({accesibilidad: itemValue})}
            >
                <Picker.Item
                accessibilityLabel="Primero A"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero A como clase" 
                label="Texto" value="1" />
                <Picker.Item
                accessibilityLabel="Primero B"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero B como clase" 
                label="Pictogramas" value="2" />
                <Picker.Item
                accessibilityLabel="Primero B"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero B como clase" 
                label="Texto y Pictogramas" value="3" />
                <Picker.Item
                accessibilityLabel="Primero B"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero B como clase" 
                label="Video/Audio" value="4" />
              </Picker>
            </View>
          </View>        
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Añadir Estudiante"
            accessibilityLabel="Añadir Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Añade el estudiante"
            color="#bcbcbc"
            onPress={this.aniadirEstudiante}
          />
        </View>
        

      </View>

    );
  }
}

export default AddStudent;