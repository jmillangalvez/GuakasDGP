import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

const Option = (props) => {

  return (
    <div>
      <components.Option {...props}>
        <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

class AddTeacher extends Component {

  constructor(props){
    super(props);
    this.state= { name:"", email:"",pass:"", clase:"1a", picture: '2.jpg', selectedFile: false, fileName: "", students: [], studentsOptions: [] }
    this.getStudents();
  }

  aniadirProfesor = () => {
    this.createEducatorDB();
    Alert.alert(
      "Operación satisfactoria",
      "El profesor ha sido añadido",
    )
  }

  async createEducatorDB() {
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
      this.setState({ students: json.items });
      let aux = []
      this.state.students.forEach(  e => {
        var feed = {image: e.picture, value: e.name, label: e.name};
        aux.push( feed );
      } )
      this.setState({ studentsOptions: aux });
      console.log(this.state.studentsOptions)
    } catch (error) {
      console.log(error);
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
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
          </View>
        </View>

        {this.state.selectedFile? this.imageComponent() : null}

        <View style={styles.fixToText, {zIndex: 10}}>
          <Text>Alumnos: </Text>
          <ReactSelect
            options={this.state.studentsOptions}
            style={styles.formItem}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={this.handleChangeP}
            allowSelectAll={true}
            value={this.state.optionSelectedP}
            />
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