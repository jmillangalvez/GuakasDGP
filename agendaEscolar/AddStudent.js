import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component, FormData } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AddStudent extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", accesibilidad: 1, picture: '8.jpg', selectedFile: false, fileName: "", show: false}
    this.students = require('./data/students.json');
  }

  aniadirEstudiante = () => {
    this.createStudentDB();
    this.setState({show: true});
    setTimeout(()=> { this.props.navigation.navigate('StudentSubmenu') }, 2000);
  }

  showAlert(){
    return(
      <Text style={{color: '#000000', marginTop: 20}}>Acción realizada correctamente</Text>
    )
  }

  imageComponent(){
    let nom = this.state.fileName
    let image = require('./data/imagenesAlumnos/'+nom)
    return (
      <View style={styles.selectImage}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
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
            accessibilityType: this.state.accesibilidad,
            picture: this.state.fileName
        })
      });
    } catch (error) {
      console.log(error);
    }
  }


  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ selectedFile: true, fileName: res.name });
    } catch (err) {
      console.log(err);
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
                onValueChange = {(itemValue) => this.setState({accesibilidad: parseInt(itemValue)})}
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
                  label="Pictogramas y Texto" value="3" />
              </Picker>
            </View>
          </View>        
        </View>

        <View style={styles.fixToText}>
          <View style={styles.formItem}>
            <Text style={styles.formContent}>Seleccionar Foto:</Text>
          </View>

          <View style={styles.formItem}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={this.SingleFilePicker.bind(this)}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
          </View>
        </View>

        {this.state.selectedFile? this.imageComponent() : null}

        {this.state.show? this.showAlert() : null}

        <View style={styles.confirmButton}>
          <Button
            title="Añadir Estudiante"
            accessibilityLabel="Añadir Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Añade el estudiante"
            color="#248aff"
            onPress={this.aniadirEstudiante}
          />
        </View>

      </View>

    );
  }
}

export default AddStudent;