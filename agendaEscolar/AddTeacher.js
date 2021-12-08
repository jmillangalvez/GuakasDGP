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
    this.state= {name:"", email:"",pass:"", data: [], nTeachers: 0}
    this.getTeachers()
  }

  aniadirProfesor = () => {
    this.createTeacherBD();
    
  }

  async getTeachers() {
    try {
      const response = await fetch('http://localhost:8000/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({ data: json.items });
      this.setState({ nTeachers: json.count });

    } catch (error) {
      console.log(error);
    }
  }

  async createTeacherBD() {

    this.sameEmail = false;
    
    for (var i = 0; i < this.state.nTeachers; i++) {

      
      if(this.state.email == this.state.data[i].userName){

        this.sameEmail = true;
        break;

      }

   }

    if(this.sameEmail == false){

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
  
        alert("El profesor ha sido añadido")
        this.props.navigation.navigate('StudentSubmenu')
  
      } catch (error) {
        console.log(error);
      }

    }else{

      alert("Correo en uso");

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
                placeholder = "Nombre Profesor"
                accessibilityLabel="Nombre Profesor"
                accessibilityHint="Introduce el nombre del profesor" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Correo:</Text>
            </View>

            <View style={styles.formItem}>
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

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Contraseña:</Text>
            </View>

            <View style={styles.formItem}>
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