import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AddTeacher extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", email:"",pass:"", clase:"1a"}
    this.students = require('./data/students.json');
  }

  aniadirProfesor = () => {
    this.createStudentDB();
    Alert.alert(
      "Operación satisfactoria",
      "El profesor ha sido añadido",
    )
  }

  async createStudentDB() {
    try {
      const response = await fetch('http://localhost:8000/educators/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            userName: this.state.email,
            password: this.state.pass
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
          <Text style={styles.headerText} value="AniadirProfesor" accessibilityRole="header">Añadir Profesor</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('admin_main') }
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al menu del administrador"
            color="#bcbcbc"
            >
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addStudent}>
          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Nombre:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({name: text})}
                defaultValue = {this.state.name}
                placeholder = "Nombre Profesor"
                accessibilityLabel="Nombre Profesor"
                accessibilityHint="Introduce el nombre del profesor" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Correo:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({email: text})}
                defaultValue = {this.state.email}
                placeholder = "correo@gmail.com"
                accessibilityLabel="Correo Profesor"
                accessibilityHint="Introduce el correo del profesor" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Contraseña:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({pass: text})}
                defaultValue = {this.state.pass}
                placeholder = "*********"
                secureTextEntry = {true}
                accessibilityLabel="Contraseña Profesor"
                accessibilityHint="Introduce la contraseña del profesor" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Clase:</Text>
            </View>

            <View style={styles.formRightBG}>
            <Picker
              accessibilityLabel="Clase asignada"
              accessibilityRole="spinbutton"
              accessibilityHint="Selecciona a que clase esta asignado" 
              onValueChange = {(itemValue) => this.setState({clase: itemValue})}
            >
                <Picker.Item
                accessibilityLabel="Primero A"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero A como clase" 
                label="1A" value="1a" />
                <Picker.Item
                accessibilityLabel="Primero B"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Primero B como clase" 
                label="1B" value="1b" />
                <Picker.Item
                accessibilityLabel="Segundo A"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Segundo A como clase" 
                label="2A" value="2a" />
                <Picker.Item 
                accessibilityLabel="Segundo B"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Segundo B como clase" 
                label="2B" value="2b" />
              </Picker>
            </View>
          </View>
        
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Añadir Profesor"
            accessibilityLabel="Añadir Profesor"
            accessibilityRole="Button"
            accessibilityHint="Añade el profesor"
            color="#bcbcbc"
            onPress={this.aniadirProfesor}
          />
        </View>
        

      </View>

    );
  }
}

export default AddTeacher;