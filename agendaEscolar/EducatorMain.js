import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
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
    this.state = { tasks: {}, currentTask: 0, currentName: "", idEducator: props.route.params.idEducator };
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
          <View style={styles.middleView}>
          </View>
          <View style={styles.enterButtonView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchStudentsList') }>
              <Text style={styles.loginAdminText}>Información</Text>
              <Text style={styles.loginAdminText}>estudiantes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default EducatorMain;