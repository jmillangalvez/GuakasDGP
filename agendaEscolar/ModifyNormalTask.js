import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyNormalTask extends Component {

  constructor(props){
    super(props);
    this.state= {taskId:1 ,titulo:"", descripcion:""}
  };

  deleteTask = () =>{
    this.deleteTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido eliminada",
    )
  }

  async deleteTaskDB(){
    try {
      const response = await fetch('http://localhost:8000/tasks/' + this.props.route.params.item.taskId + '/', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
         }
      });
      this.props.navigation.navigate('TaskSubmenu')
    } catch (error) {
      console.log(error);
    }
  }

  modifyTask = () =>{
    this.modifyTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido eliminada",
    )
    this.props.navigation.navigate('TaskSubmenu')
  }

  async modifyTaskDB() {
    try {
      const response = await fetch('http://localhost:8000/tasks/' + this.props.route.params.item.taskId + '/', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.titulo,
            description: this.state.descripcion,
            finished: 0,
            taskDate: "2021-11-18"
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModificarEstudiante" accessibilityRole="header">Modificar Tarea Fija</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('TaskSubmenu') }
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al menu de tareas"
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
                defaultValue = {this.props.route.params.item.title}
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
                defaultValue = {this.props.route.params.item.description}
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
            onPress={this.modifyTask}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Tarea"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={this.deleteTask}
          />
        </View>

      </View>

    );
  }
}

export default ModifyNormalTask;