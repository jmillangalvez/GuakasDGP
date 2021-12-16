import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


class AdminMain extends Component {
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
          <Text style={styles.headerText} value="AdminMenu" accessibilityRole="header">Menu administrador</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>
          {/* Ir al menu de estudiantes (Boceto 5) */}
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentSubmenu') }>
              <Text style={styles.loginAdminText}>Usuarios</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleView}>
          </View>
          {/* Ir al menu de tareas (Boceto 11)*/}
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskSubmenu') }>
              <Text style={styles.loginAdminText}>Tareas</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CompletedMenuList') }>
              <Text style={styles.loginAdminText}>Documentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default AdminMain;