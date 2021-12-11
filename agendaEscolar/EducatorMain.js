import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
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


class EducatorMain extends Component {
  constructor(props) {
    super(props);
    const data = require('./data/tasks.json');
    const allTasks = data.tasks;
    this.state = { tasks: {}, currentTask: 0, currentName: "", idEducator: props.route.params.idEducator };
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
          <Text style={styles.headerText} value="ProfesorMenu" accessibilityRole="header">Menu profesor</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTaskList1', {
        idEducator: this.state.idEducator
      }) }>
              <Text style={styles.loginAdminText}>Asignar Tarea</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleView}>
          </View>
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EducatorCompletedTasksList') }>
              <Text style={styles.loginAdminText}>     Tareas</Text>
              <Text style={styles.loginAdminText}>Completadas</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.fixToText}>
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EducatorAssignedTasksList') }>
              <Text style={styles.loginAdminText}>Tareas Asignadas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default EducatorMain;