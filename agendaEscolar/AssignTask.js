import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AssignTask extends Component {
  constructor(props) {
    super(props);
    this.state = { prio: -1, fecha: "", idStudent: props.route.params.idStudent, idTask: props.route.params.idTask, idEducator: props.route.params.idEducator};
  };

  asignar = () =>{
    this.asignarDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea se ha asignado al alumno",
    )
  }

  async asignarDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/assignedTasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idStudent: this.state.idStudent,
            idTask: this.state.idTask,
            idEducator: this.state.idEducator,
            priority: this.state.prio,
            assignedDate: this.state.fecha,
            completedDate: this.state.fecha,
            completed: 0,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render (){
    const { tarea, alumno } = this.state;

    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AsignarTarea" accessibilityRole="header">Asignar Tareas</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('EducatorMain') }
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
              <Text style={styles.formContent}>Prioridad:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({prio: text})}
                defaultValue = {this.state.titulo}
                placeholder = "1, 2, ... , 10"
                accessibilityLabel="ID Tarea"
                accessibilityHint="Introduce el id de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Fecha:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({fecha: text})}
                defaultValue = {this.state.titulo}
                placeholder = "2021-12-8"
                accessibilityLabel="ID Alumno Asignado"
                accessibilityHint="Introduce el id del alumno" 
              />
            </View>
          </View>
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Asignar la Tarea"
            accessibilityLabel="Asignar la Tarea"
            accessibilityRole="Button"
            accessibilityHint="Asigna la tarea"
            color="#248aff"
            onPress={this.asignar}
          />
        </View>

      </View>
    )
  }
}

export default AssignTask;