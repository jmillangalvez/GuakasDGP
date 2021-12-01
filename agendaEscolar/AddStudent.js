import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
//import * as ImagePicker from 'expo-image-picker';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


class AddStudent extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", accesibilidad: 1, selectedImage:null}
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
      const response = await fetch('http://localhost:8000/api/students/', {
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


  //  WIP
  /*async openImagePicker(){

    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

  }*/
  

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
                placeholder = "Nombre Estudiante"
                accessibilityLabel="Nombre Profesor"
                accessibilityHint="Introduce el nombre del profesor" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Tipo de accesibilidad:</Text>
            </View>

            <View style={styles.formRight}>
            <Picker
              accessibilityLabel="Tipo de accesibilidad"
              accessibilityRole="spinbutton"
              accessibilityHint="Selecciona que tipo de accesibilidad necesita" 
              onValueChange = {(itemValue) => this.setState({accesibilidad: itemValue})}
            >
                <Picker.Item
                accessibilityLabel="Texto"
                accessibilityRole="Button"
                accessibilityHint="Selecciona texto como accesibilidad" 
                label="Texto" value="1" />
                <Picker.Item
                accessibilityLabel="Pictogramas"
                accessibilityRole="Button"
                accessibilityHint="Selecciona pictogramas como accesibilidad" 
                label="Pictogramas" value="2" />
              </Picker>
            </View>
          </View> 

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Foto:</Text>
            </View>

            <View style={styles.formRight}>
            
            <TouchableOpacity 
              style={styles.addImageButton} 
              //onPress={this.openImagePicker}
            >
            <Image
            style={styles.image}             
            source={require("./img/fotoperfil.png")}
            accessibilityLabel="Entrar en la aplicacion"
            />
            </TouchableOpacity>

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
