import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyStudent extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", tipo: 1, picture: "1.jpg", idStudent: props.route.params.idStudent, student: ''}
    this.students = require('./data/students.json');
  }

  async getStudents() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/students/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      let students = json.items;
      let notFound = true;
      for (let i = 0; i < students.length && notFound; i++) {
        if(students[i].idStudent == this.state.idStudent){
          notFound = false;
          this.setState({student: students[i]});
          this.setState({name: students[i].name});
          this.setState({tipo: students[i].accessibilityType});
          this.setState({picture: students[i].picture});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getStudents();
  }

  async deleteStudent() {
    let url = 'http://localhost:8000/api/v1/students/' + this.state.idStudent + '/'
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
         }
      });
    } catch (error) {
      console.log(error);
    }
  }

  eliminarAlumno = () => {
    this.deleteStudent();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }


  async modifyStudent() {
    let url = 'http://localhost:8000/api/v1/students/' + this.state.idStudent + '/'
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            accessibilityType: this.state.tipo,
            picture: this.state.picture,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  modificarAlumno = () => {
    this.modifyStudent();

    setTimeout(()=> { this.props.navigation.navigate('StudentSubmenu') }, 2000);
  }

  imageComponent(){
    console.log(this.state.picture);
    let nom = this.state.picture;
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

  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ picture: res.name });
    } catch (err) {
      console.log(err);
    }
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
                defaultValue = {this.state.student.name}
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
                label="Texto" value="1" />

                <Picker.Item
                accessibilityLabel="Pictogramas"
                accessibilityRole="Button"
                accessibilityHint="Selecciona Pictogramas como tipo de multimedia" 
                label="Pictogramas" value="2" />
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

        {this.imageComponent()}

        <View style={styles.confirmButton}>
          <Button
            title="Modificar Estudiante"
            accessibilityLabel="Modificar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Modifica el estudiante"
            color="#bcbcbc"
            onPress={this.modificarAlumno}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Estudiante"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={this.eliminarAlumno}
          />
        </View>

      </View>

    );
  }
}

export default ModifyStudent;