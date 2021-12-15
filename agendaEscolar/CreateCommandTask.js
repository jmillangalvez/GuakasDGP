import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Picker, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

const Option = (props) => {
    return (
        <div>
        <components.Option {...props}>
            <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            />{" "}
            <label>{props.label}</label>
        </components.Option>
        </div>
    );
};

class CreateCommandTask extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "", optionSelectedC: null, educadores: [], options: []};
  };

  async getEducators() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({educadores: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  async createClassMenu(idEdu) {
    try {
      const response = await fetch('http://localhost:8000/api/v1/classMenus/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idEducator: idEdu,
            date: this.state.date,
            numNormalMenu: 0,
            numNoMeatMenu: 0,
            numCrushedMenu: 0,
            numDessertFruit: 0,
            numDessertCrushedFruit: 0,
            numDessertYogurtCustard: 0,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getEducators();
  }

  getOptions(){
    let options = [];

    this.state.educadores.forEach(edu => {
      options.push({value: edu.idEducator, label: edu.name})
    });

    return options;

  }

  createTask = () =>{
    console.log(this.state.optionSelectedC)
    this.state.optionSelectedC.forEach(edu => {
      this.createClassMenu(edu.value);
    });
  }

  handleChangeC = (selected) => {
    this.setState({
      optionSelectedC: selected
    });
  };

  
  render (){
    const { titulo, descripcion } = this.state;

    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="CrearTareaNormal" accessibilityRole="header">Crear Tarea Comedor</Text>
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

        <View style={styles.fixToText}>
          <View style={styles.formItem}>
            <Text style={styles.formContent}>Fecha:</Text>
          </View>

          <View style={styles.formItem}>
            <TextInput 
              style={styles.formContentLine}
              onChangeText = {(text) => this.setState({date: text})}
              defaultValue = {this.state.titulo}
              placeholder = "yyyy-mm-dd"
              accessibilityLabel="ID Alumno Asignado"
              accessibilityHint="Introduce el id del alumno" 
            />
          </View>
        </View>

        <View style={styles.fixToText}>
          <Text>Clases: </Text>
          <ReactSelect
            options={this.getOptions()}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={this.handleChangeC}
            allowSelectAll={true}
            value={this.state.optionSelectedC}
            />
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Crear Tarea"
            accessibilityLabel="Crear Tarea"
            accessibilityRole="Button"
            accessibilityHint="Crea la tarea"
            color="#bcbcbc"
            onPress ={this.createTask }
          />
        </View>

      </View>
    )
  }
}

export default CreateCommandTask;