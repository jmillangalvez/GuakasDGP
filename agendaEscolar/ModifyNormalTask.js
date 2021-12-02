import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyNormalTask extends Component {

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
          <Text style={styles.headerText} value="ModificarEstudiante">Modificar Tarea Fija</Text>
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
            title="Modificar Tarea"
            accessibilityLabel="Modificar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Modifica el estudiante"
            color="#bcbcbc"
            onPress={() =>this.props.navigation.navigate('ModifyNormalTask')}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Tarea"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={() =>this.props.navigation.navigate('ModifyNormalTask')}
          />
        </View>

      </View>

    );
  }
}

export default ModifyNormalTask;