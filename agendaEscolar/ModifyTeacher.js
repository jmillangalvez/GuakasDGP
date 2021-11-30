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
    this.state= {name:"", email:"",pass:"", clase:"1a"}
    this.students = require('./data/students.json');
  }

  aniadirProfesor = () => {
    console.log(this.state.name)
    console.log(this.state.email)
    console.log(this.state.pass)
    console.log(this.state.clase)

    Alert.alert(
      "----------",
      "El Profesor ha sido añadido Correctamente",
    )
  }

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AniadirProfesor" accessibilityRole="header">Modificar Educador</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <Button
            title="Volver"
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al submenú del estudiante"
            color="#bcbcbc"
            onPress={() =>
                this.props.navigation.navigate('ModifyTeacherList')
              }
          />
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
                defaultValue = "Tatiana López"
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
              <Text>tatiana1231@gmail.com</Text>
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
                defaultValue = "estaeslacontra"
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

          {/* <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Fotografia:</Text>
            </View>
            <View style={styles.formRightBG}>
              <Text>+</Text>
            </View>
          </View> */}
        
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Añadir Educador"
            accessibilityLabel="Añadir Educador"
            accessibilityRole="Button"
            accessibilityHint="Añade el Educador"
            color="#bcbcbc"
            onPress={() =>
                this.props.navigation.navigate('ModifyTeacherList')
              }
          />
        </View>

        <View style={styles.removeButton}>
          <Button
            title="Eliminar Educador"
            accessibilityLabel="Eliminar Educador"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el educador"
            color="#A52A2A"
            onPress={() =>this.props.navigation.navigate('ModifyTeacherList')}
          />
        </View>
        

      </View>

    );
  }
}

export default ModifyTeacher;