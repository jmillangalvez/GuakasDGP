import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation
// Prioridad 0 -> Por defecto tarea normal
// Prioridad 1 -> Tareas prioritarias
// Prioridad 2 -> Tareas Urgentes

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class CreateNormalTask extends Component {
  constructor(props) {
    super(props);
    this.state = { titulo: "", descripcion: "", fecha: new Date(),  prioridad: 0};
  };

  createTask = () =>{
    this.createTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido creada",
    )
  }


  async createTaskDB() {
    try {
      const response = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.titulo,
            description: this.state.descripcion,
            finished: 0,
            prioridad: this.state.prioridad,
            taskDate: this.state.fecha
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render (){
    const { titulo, descripcion, prioridad, dia, mes } = this.state;

    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="CrearTareaNormal" accessibilityRole="header">Crear Tarea Normal</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('TaskSubmenu') }
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al menu del administrador"
            color="#bcbcbc"
            >
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addStudent}>
          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Titulo de la tarea:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({titulo: text})}
                defaultValue = {this.state.titulo}
                placeholder = "Titulo Tarea"
                accessibilityLabel="Titulo Tarea"
                accessibilityHint="Introduce el titulo de la tarea" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Descripción:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({descripcion: text})}
                defaultValue = {this.state.descripcion}
                multiline={true}
                placeholder = ".............................."
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>

          <View style={style.formLine}>
            
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Prioridad</Text>
            </View>

            <View style={styles.formRight}>
              <Picker
                selectedValue={this.state.prioridad}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => this.setState({prioridad: itemValue})}
                accessibilityLabel="Prioridad de una tarea"
                accessibilityRole="input"
                accessibilityHint="Asignar prioridad a una tarea">

                <Picker.Item label ="Tarea normal" value="0" />
                <Picker.Item label ="Tarea prioritaria" value="1" />
                <Picker.Item label ="Tarea Urgente" value="2" />
              </Picker>
            </View>

          </View>

          {/* new Date(year, monthIndex, day) */}
          <View style={style.formLine}>
            
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Dia</Text>
            </View>

            <View style={styles.formRight}>
            <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => {dia: text}}
                defaultValue = {1}
                placeholder = "Dia"
                accessibilityLabel="Dia del mes"
                accessibilityHint="Introduce el dia a asignar la tarea" 
              />
            </View>

          </View>

          <View style={style.formLine}>
            
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Mes</Text>
            </View>

            <View style={styles.formRight}>
            <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => {mes: text}}
                defaultValue = {1}
                placeholder = "Mes"
                accessibilityLabel="Mes del año"
                accessibilityHint="Introduce el mes a asignar la tarea" 
              />
            </View>

          </View>

          <View style={style.formLine}>
            
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Año</Text>
            </View>

            <View style={styles.formRight}>
            <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({fecha: new Date(text,mes,dia)})}
                defaultValue = {2021}
                placeholder = "Año"
                accessibilityLabel="Mes del año"
                accessibilityHint="Introduce el mes a asignar la tarea" 
              />
            </View>

          </View>

        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Crear Tarea"
            accessibilityLabel="Crear Tarea"
            accessibilityRole="Button"
            accessibilityHint="Crea la tarea"
            color="#bcbcbc"
            onPress={this.createTask}
          />
        </View>

      </View>
    )
  }
}

export default CreateNormalTask;