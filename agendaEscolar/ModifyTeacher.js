import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyTeacher extends Component {

  constructor(props){
    super(props);
    this.state= {name:"", email:"",pass:"", clase:"1a", picture: "1.jpg", idEducator: props.route.params.idEducator, educator: ''}
    this.students = require('./data/students.json');
  }

  async getEducators() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      let educators = json.items;
      let notFound = true;
      for (let i = 0; i < educators.length && notFound; i++) {
        if(educators[i].idEducator == this.state.idEducator){
          notFound = false;
          this.setState({educator: educators[i]});
          this.setState({name: educators[i].name});
          this.setState({email: educators[i].accessibilityType});
          this.setState({pass: educators[i].password});
          this.setState({picture: educators[i].picture});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getEducators();
  }

  async deleteEducator() {
    let url = 'http://localhost:8000/api/v1/educators/' + this.state.idEducator + '/'
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

  eliminarEducador = () => {
    this.deleteEducator();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }

  async modifyEducator() {
    let url = 'http://localhost:8000/api/v1/educators/' + this.state.idEducator + '/'
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.pass,
            picture: this.state.picture,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  modificarEducador = () => {
    this.modifyEducator();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }

  imageComponent(){
    console.log(this.state.picture);
    let nom = this.state.picture;
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
                defaultValue = {this.state.educator.name}
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
                onChangeText = {(text) => this.setState({name: text})}
                defaultValue = {this.state.educator.email}
                placeholder = "Email"
                accessibilityLabel="Nombre Profesor"
                accessibilityHint="Introduce el nombre del profesor" 
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
                defaultValue = {this.state.educator.password}
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
            style={styles.chooseImgTouch}
            onPress={this.SingleFilePicker.bind(this)}>
            <Text style={styles.textStyle}>Seleccionar imagen</Text>
          </TouchableOpacity>
          </View>
        </View>

        {this.imageComponent()}

        <View style={styles.confirmButton}>
          <Button
            title="Modificar Educador"
            accessibilityLabel="Añadir Educador"
            accessibilityRole="Button"
            accessibilityHint="Añade el Educador"
            color="#248aff"
            onPress={this.modificarEducador}
          />
        </View>

        <View style={styles.removeButton}>
          <Button
            title="Eliminar Educador"
            accessibilityLabel="Eliminar Educador"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el educador"
            color="#A52A2A"
            onPress={this.eliminarEducador}
          />
        </View>
        

      </View>

    );
  }
}

export default ModifyTeacher;