import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Picker, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert} from 'react-native';
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

export const colourOptions = [
    { value: "ca", label: "Clase A" },
    { value: "cb", label: "Clase B" },
    { value: "cc", label: "Clase C" },
    { value: "cd", label: "Clase D" },
    { value: "ce", label: "Clase E" },
    { value: "cf", label: "Clase F" }
  ];

export const platesOptions = [
    { value: "m1", label: "Menu 1" },
    { value: "m2", label: "Menu 2" },
    { value: "m3", label: "Menu 3" },
    { value: "m4", label: "Menu 4" },
    { value: "m5", label: "Menu 5" },
    { value: "m6", label: "Menu 6" }
  ];

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
    this.state = { titulo: "", descripcion: "", optionSelectedC: null, optionSelectedP: null};
  };

  createTask = () =>{
    this.createTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido creada",
    )
  }

  handleChangeC = (selected) => {
    this.setState({
      optionSelectedC: selected
    });
  };

  handleChangeP = (selected) => {
    this.setState({
      optionSelectedP: selected
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
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={[{flexDirection: "row"}]}>
          <Text>Clases: </Text>
          <ReactSelect
            options={colourOptions}
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

        <View style={[{flexDirection: "row"}]}>
          <Text>Platos: </Text>
          <ReactSelect
            options={platesOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={this.handleChangeP}
            allowSelectAll={true}
            value={this.state.optionSelectedP}
            />
        </View>
      </View>
    )
  }
}

export default CreateCommandTask;