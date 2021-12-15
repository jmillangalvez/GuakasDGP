import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import styles from "./Styles";


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

class ModifyCommandTask extends Component {
  constructor(props) {
    super(props);
    this.state = { titulo: "", descripcion: "", optionSelectedC: null, optionSelectedP: null};
  };

  modifyTask = () =>{
    this.modifyTaskDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido modificada",
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

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModificarTareaComedor" accessibilityRole="header">Modificar Tarea Comedor</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('TaskSubmenu') }
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="Vuelve al submenu anterior"
            color="#bcbcbc">
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View styles={{top: 20}}>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', zIndex:2, top: 15, marginBottom: "10%"}}>
            <View style={styles.fixToText}>
              <Text style={styles.formContent}>Clases: </Text>
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
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', zIndex:1, top: 15, marginBottom: "10%"}}>
            <Text style={styles.formContent}>Platos: </Text>
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

          <View style={styles.confirmButton}>
            <Button
              title="Modificar Tarea"
              accessibilityLabel="Modificar tarea comanda"
              accessibilityRole="Button"
              accessibilityHint="Modifica la tarea comedor"
              color="#248aff"
              onPress={() =>this.props.navigation.navigate('ModifyCommandTask')}
            />
          </View>
          
          <View style={styles.removeButton}>
            <Button
              title="Eliminar Tarea"
              accessibilityLabel="Eliminar tarea comanda"
              accessibilityRole="Button"
              accessibilityHint="Elimina la tarea comanda"
              color="#A52A2A"
              onPress={() =>this.props.navigation.navigate('ModifyCommandTask')}
            />
          </View>

        </View>
      </View>
    );
  }
}

export default ModifyCommandTask;