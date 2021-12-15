import React, { Component } from "react";
import { Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AssignCommandTask extends Component {
  constructor(props) {
    super(props);
    this.state = { prio: -1, fecha: "", name: "", student: "", idStudent: props.route.params.idStudent, date: props.route.params.date, idEducator: props.route.params.idEducator};
  };

  asignar = () =>{
    this.asignarDB();
  }

  async asignarDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/dinningTasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idStudent: this.state.idStudent,
            date: this.state.date,
        })
      });
    } catch (error) {
      console.log(error);
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
      let students = json.items;
      let notFound = true;
      for (let i = 0; i < students.length && notFound; i++) {
        if(students[i].idStudent == this.state.idStudent){
          notFound = false;
          this.setState({student: students[i]});
          this.setState({name: students[i].name});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getStudents();
  }
  
  render (){
    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AsignarTarea" accessibilityRole="header">Asignar Tarea Comedor</Text>
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
              <Text style={styles.formContent}>Alumno:</Text>
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formContent}>{this.state.name}</Text>
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Fecha:</Text>
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formContent}>{this.state.date}</Text>
            </View>
          </View>
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Asignar la Tarea"
            accessibilityLabel="Asignar la Tarea"
            accessibilityRole="Button"
            accessibilityHint="Asigna la tarea"
            color="#bcbcbc"
            onPress={this.asignar}
          />
        </View>

      </View>
    )
  }
}

export default AssignCommandTask;