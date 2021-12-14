import React, { Component } from "react";
import { Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Alert, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';
import * as DocumentPicker from 'expo-document-picker';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class AssignStockTask extends Component {
  constructor(props) {
    super(props);
    this.state = { prio: -1, fecha: "", idStudent: props.route.params.idStudent, idTask: props.route.params.idTask, idEducator: props.route.params.idEducator,
                   selectedFile: false, fileName: "1.jpg"};
  };

  asignar = () =>{
    this.asignarDB();
    Alert.alert(
      "Operación satisfactoria",
      "La tarea se ha asignado al alumno",
    )
  }

  async asignarDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/assignedTasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idStudent: this.state.idStudent,
            idTask: this.state.idTask,
            idEducator: this.state.idEducator,
            priority: this.state.prio,
            assignedDate: this.state.fecha,
            completedDate: this.state.fecha,
            completed: 0,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  imageComponent(){
    let nom = this.state.fileName
    let image = require('./data/imagenesAlumnos/'+nom)
    return (
      <View style={styles.selectImage}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
  }

  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ selectedFile: true, fileName: res.name });
    } catch (err) {
      console.log(err);
    }
  }
  
  render (){
    changeScreenOrientation();
    return(
      <View style={styles.mainView}>   

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AsignarTarea" accessibilityRole="header">Asignar Tarea Stock</Text>
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
              <Text style={styles.formContent}>Prioridad:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({prio: text})}
                placeholder = "1, 2, ... , 10"
                accessibilityLabel="ID Tarea"
                accessibilityHint="Introduce el id de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Fecha:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({fecha: text})}
                placeholder = "yyyy-mm-dd"
                accessibilityLabel="ID Alumno Asignado"
                accessibilityHint="Introduce el id del alumno" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Lugar:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({lugar: text})}
                placeholder = "Almacen, Clase, ..."
                accessibilityLabel="ID Alumno Asignado"
                accessibilityHint="Introduce el id del alumno" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Material:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({material: text})}
                placeholder = "Boligrafos, papel, ..."
                accessibilityLabel="ID Alumno Asignado"
                accessibilityHint="Introduce el id del alumno" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Cantidad:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({cantidad: text})}
                placeholder = "1, 2, 3, ..."
                accessibilityLabel="ID Alumno Asignado"
                accessibilityHint="Introduce el id del alumno" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
                <Text style={styles.formContent}>Pictograma Lugar:</Text>
            </View>

            <View style={styles.formItem}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={this.SingleFilePicker.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

        {this.state.selectedFile? this.imageComponent() : null}

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
                <Text style={styles.formContent}>Pictograma Material:</Text>
            </View>

            <View style={styles.formItem}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={this.SingleFilePicker.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

          {this.state.selectedFile? this.imageComponent() : null}

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
                <Text style={styles.formContent}>Pictograma Cantidad:</Text>
            </View>

            <View style={styles.formItem}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={this.SingleFilePicker.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

          {this.state.selectedFile? this.imageComponent() : null}
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

export default AssignStockTask;