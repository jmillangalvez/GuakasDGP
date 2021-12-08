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
    this.state= {titulo: "", descripcion: "", tituloPic: "", descripcionPic: "" , idTask: props.route.params.idTask, task: ''}
  }

  async getTasks() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/tasks/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      let tasks = json.items;
      let notFound = true;
      for (let i = 0; i < tasks.length && notFound; i++) {
        if(tasks[i].idTask == this.state.idTask){
          notFound = false;
          this.setState({task: tasks[i]});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getTasks();
  }

  async deleteTask() {
    let url = 'http://localhost:8000/api/v1/tasks/' + this.state.idTask + '/'
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

  eliminarTarea = () => {
    this.deleteTask();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }


  async modifyTask() {
    let url = 'http://localhost:8000/api/v1/tasks/' + this.state.idTask + '/'
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.titulo,
            pictogramTitle: this.state.tituloPic,
            description: this.state.descripcion,
            pictogramDescription: this.state.descripcionPic,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  modificarTarea = () => {
    this.modifyTask();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
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
              <Text style={styles.formContent}>Titulo:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({titulo: text})}
                defaultValue = {this.state.task.title}
                placeholder = "Titulo Tarea"
                accessibilityLabel="Titulo Tarea"
                accessibilityHint="Introduce el titulo de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo en pictograna:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({tituloPic: text})}
                defaultValue = {this.state.task.pictogramTitle}
                placeholder = "Titulo Pictograma"
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
                defaultValue = {this.state.task.description}
                multiline={true}
                placeholder = ".............................."
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Descripción en pictograna:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({descripcionPic: text})}
                defaultValue = {this.state.task.pictogramDescription}
                multiline={true}
                placeholder = ".............................."
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
            onPress={this.modificarTarea}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Tarea"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={this.eliminarTarea}
          />
        </View>

      </View>

    );
  }
}

export default ModifyNormalTask;