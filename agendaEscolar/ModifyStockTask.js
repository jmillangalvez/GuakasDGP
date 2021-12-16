import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


class AddStockTask extends Component {

  constructor(props){
    super(props);
    this.state= {destination:"",item:"",cant:"0"}
  }

  aniadirTask = () => {
    this.createStudentDB();

    Alert.alert(
      "Operación satisfactoria",
      "La tarea ha sido modificada",
    )
  }

  async createTaskDB() {
    /*
    try {
      const response = await fetch('http://localhost:8000/api/students/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            accesibilityType: this.state.accesibilidad
        })
      });
    } catch (error) {
      console.log(error);
    }*/
  }  

  render(){
    
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModificarStockTask" accessibilityRole="header">Modificar Comanda Stock</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('EducatorMain') }  //Arreglar en la parte de navegacion
            accessibilityLabel="Volver"
            accessibilityRole="Button"
            accessibilityHint="" //rt
            color="#bcbcbc"
            >
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addStudent}>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Donde ir:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({destination: text})}
                defaultValue = {this.state.destination}
                placeholder = "Almacen, Cocina..."
                accessibilityLabel="Destino"
                accessibilityHint="Introduce a donde ir a realizar la comanda" 
              />
            </View>
          </View>


          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Producto:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({item: text})}
                defaultValue = {this.state.item}
                placeholder = "Cartulina, tijeras"
                accessibilityLabel="Producto"
                accessibilityHint="Introduce que producto se pide" 
              />
            </View>
          </View>

          <View style={styles.formLine}>
            <View style={styles.formLeft}>
              <Text style={styles.formContent}>Cantidad:</Text>
            </View>

            <View style={styles.formRight}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({cant: text})}
                defaultValue = {this.state.cant}
                placeholder = "0"
                accessibilityLabel="Cantidad"
                keyboardType='numeric'
                accessibilityHint="Introduce cuantos productos se requieren" 
              />
            </View>
          </View>

          

        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Modificar Tarea"
            accessibilityLabel="Modificar Tarea"
            accessibilityRole="Button"
            accessibilityHint="Modifica la tarea de stock"
            color="#bcbcbc"
            onPress={this.aniadirTask}
          />
        </View>        

      </View>

    );
  }
}

export default AddStockTask;
