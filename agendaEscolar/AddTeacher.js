import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, Button, TextInput } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AddTeacher extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", email:"",pass:"", clase:"1a", picture: '2.jpg', selectedFile: false, fileName: "", show: false}
    this.students = require('./data/students.json');
  }

  aniadirProfesor = () => {
    this.createStudentDB();
    this.setState({show: true});
    setTimeout(()=> { this.props.navigation.navigate('StudentSubmenu') }, 2000);
  }

  async createStudentDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/educators/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.pass,
            picture: this.state.fileName
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  showAlert(){
    return(
      <Text style={{color: '#000000', marginTop: 20}}>Acción realizada correctamente</Text>
    )
  }

  imageComponent(){
    let nom = this.state.fileName
    let image = require('./data/imagenesEducadores/'+nom)
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

        <View style={styles.fixToText}>
          <View style={styles.formItem}>
            <Text style={styles.formContent}>Seleccionar Foto:</Text>
          </View>

          <View style={styles.formItem}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={this.SingleFilePicker.bind(this)}>
            <Text style={[styles.formContentLine , {marginBottom: 5}]}>Selecciona Imagen</Text>
          </TouchableOpacity>
          </View>
        </View>

        {this.state.selectedFile? this.imageComponent() : null}

        {this.state.show? this.showAlert() : null}

        <View style={styles.confirmButton}>
          <Button
            title="Añadir Profesor"
            accessibilityLabel="Añadir Profesor"
            accessibilityRole="Button"
            accessibilityHint="Añade el profesor"
            color="#248aff"
            onPress={this.aniadirProfesor}
          />
        </View>
        

      </View>

    );
  }
}

export default AddTeacher;