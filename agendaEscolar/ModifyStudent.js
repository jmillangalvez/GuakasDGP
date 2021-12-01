import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyStudent extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", tipo:"texto"}
    this.students = require('./data/students.json');
  }

  aniadirAlumno = () => {
    console.log(this.state.name)
    console.log(this.state.tipo)

    Alert.alert(
      "----------",
      "El Alumno ha sido añadido Correctamente",
    )
  }

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModificarEstudiante">Modificar Estudiante</Text>
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
                defaultValue = {"Juan Pérez"}
                placeholder = "Nombre Alumno"
                accessibilityLabel="Nombre Alumno"
                accessibilityRole="Text"
                accessibilityHint="Introduce el nombre del alumno" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Tipo de Multimedia:</Text>
            </View>

            <View style={styles.formItem}>
            <Picker
              accessibilityLabel="Tipo de Multimedia"
              accessibilityRole="spinbutton"
              accessibilityHint="Selecciona tipo de multimedia" 
              onValueChange = {(itemValue) => this.setState({tipo: itemValue})}
            >
                <Picker.Item
                accessibilityLabel="Texto"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Texto como tipo de multimedia" 
                label="Texto" value="texto" />

                <Picker.Item
                accessibilityLabel="Pictogramas"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Pictogramas como tipo de multimedia" 
                label="Pictogramas" value="picto" />

                <Picker.Item
                accessibilityLabel="Imagenes"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Imagenes como tipo de multimedia"
                label="Imagenes" value="imgs" />

                <Picker.Item 
                accessibilityLabel="Videos"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Videos como tipo de multimedia"
                label="Videos" value="video" />
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
            title="Modificar Estudiante"
            accessibilityLabel="Modificar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Modifica el estudiante"
            color="#bcbcbc"
            onPress={() =>this.props.navigation.navigate('ModifyStudentList')}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Estudiante"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={() =>this.props.navigation.navigate('ModifyStudentList')}
          />
        </View>

      </View>

    );
  }
}

export default ModifyStudent;