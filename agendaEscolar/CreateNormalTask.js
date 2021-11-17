import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, TextInput} from 'react-native';
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

class CreateNormalTask extends Component {
  constructor(props) {
    super(props);
    this.state = { titulo: "", descripcion: "" };
  };

  createTask = () =>{
    this.createTaskDB()
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
            taskDate: "2021-11-15"
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render (){
    const { titulo, descripcion } = this.state;
    changeScreenOrientation();
    return(
      <View style={styles.mainView}>        
        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('admin_main')}>
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>
            <Text>Introducir titulo</Text>
            <TextInput placeholder="Titulo" onChangeText={(text) => this.setState({titulo: text})}></TextInput>
        </View>
        <View style={styles.fixToText}>
            <Text>Introducir descripcion</Text>
            <TextInput placeholder="descripcion" onChangeText={(text) => this.setState({descripcion: text})}></TextInput>
        </View>

        <TouchableOpacity onPress={this.createTask}>
            <Text style={styles.loginAdminText}>Crear</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default CreateNormalTask;