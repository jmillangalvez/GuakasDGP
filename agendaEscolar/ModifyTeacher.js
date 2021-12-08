import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyTeacher extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", email:"",pass:"", data: [], nTeachers: 0}
    this.getTeachers()
  }

  aniadirProfesor = () => {
    this.createTeacherBD();
    
  }

  eliminarProfesor = () => {
    this.deleteTeacherBD();
    
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

      try {
        const response = await fetch('http://localhost:8000/educators/', {
          method: 'UPDATE',
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
  
        alert("El profesor ha sido actualizado")
        this.props.navigation.navigate('StudentSubmenu')
  
      } catch (error) {
        alert("El profesor no ha sido actualizado")
        console.log(error);
      }

    
  }

  async deleteTeacherBD() {

    try {
      const response = await fetch('http://localhost:8000/educators/' + this.props.route.params.item.educatorID, {
        method: 'DELETE',
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

      alert("El profesor ha sido eliminado")
      this.props.navigation.navigate('StudentSubmenu')

    } catch (error) {
      alert("El profesor no ha sido eliminado")
      console.log(error);
    }

  
}

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AniadirProfesor" accessibilityRole="header">Modificar Educador</Text>
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
                defaultValue = {this.props.route.params.item.name} 
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
              <Text>{this.props.route.params.item.userName}</Text>
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
                defaultValue = {this.props.route.params.item.password}
                secureTextEntry = {true}
                accessibilityLabel="Contraseña Profesor"
                accessibilityHint="Introduce la contraseña del profesor" 
              />
            </View>
          </View>        
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Modificar Educador"
            accessibilityLabel="Añadir Educador"
            accessibilityRole="Button"
            accessibilityHint="Añade el Educador"
            color="#bcbcbc"
            onPress={this.aniadirProfesor}
          />
        </View>

        <View style={styles.removeButton}>
          <Button
            title="Eliminar Educador"
            accessibilityLabel="Eliminar Educador"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el educador"
            color="#A52A2A"
            onPress={this.eliminarProfesor}
          />
        </View>
        

      </View>

    );
  }
}

export default ModifyTeacher;