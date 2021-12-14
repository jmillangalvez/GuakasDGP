import React, { Component } from "react";
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


class TeacherMain extends Component {
  constructor(props) {
    super(props);
    const data = require('./data/tasks.json');
    const allTasks = data.tasks;
    this.state = { tasks: {}, currentTask: 0, currentName: "" };
    this.state.tasks = allTasks.filter(function(task){
        if (!task.completed) return task;
    });
    this.state.currentName = this.state.tasks[0].name;
  };
  
  render (){
    changeScreenOrientation();
    return(
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="TeacherMenu" accessibilityRole="header">Menu Educador</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formLine}>

          {/* Ir al menu de estudiantes (Boceto 5) */}
          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.formLeft} onPress={() => this.props.navigation.navigate('AssignTask') }>
              <Text style={styles.loginAdminText}>Asignar tareas</Text>
            </TouchableOpacity>
          </View>

          {/* Ir al menu de tareas (Boceto 11)*/}
          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.formLeft} onPress={() => this.props.navigation.navigate('CompletedTasks') }>
              <Text style={styles.loginAdminText}>Tareas completadas</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formLine}>
          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.formLeft} onPress={() => this.props.navigation.navigate('AssignedTasks') }>
              <Text style={styles.loginAdminText}>Tareas asignadas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.formLeft} onPress={() => this.props.navigation.navigate('SearchStudents') }>
              <Text style={styles.loginAdminText}>Buscar alumnos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default TeacherMain;