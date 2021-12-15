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
    this.state = { prio: -1, fecha: "",idStudent: props.route.params.idStudent, idTask: props.route.params.idTask, idEducator: props.route.params.idEducator,
                   selectedFilePlace: false, fileNamePlace: "init.png", selectedFileMaterial: false, fileNameMaterial: "init.png",
                   selectedFileQuantity: false, fileNameQuantity: "init.png", titulo: "Tarea stock", tituloPic: "almacen.png", des: "a", desPic: "a",
                   lugar: "", material: "", cantidad: ""};
  };

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
            idTask: 3,
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

  async modifyTask() {
    let url = 'http://localhost:8000/api/v1/tasks/' + 3 + '/'
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.titulo,
            pictogramTitle: this.state.tituloPic,
            description: this.state.des,
            pictogramDescription: this.state.desPic,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getFieldsTask(){
    console.log("ENTRA")
    let title = "Tarea de " + this.state.lugar;
    this.setState({ titulo: title });
    this.setState({ tituloPic: this.state.fileNamePlace });
    let desc = [];
    desc.push("Ir a " + this.state.lugar);
    desc.push("Buscar " + this.state.material);
    desc.push("Coger " + this.state.cantidad);
    this.setState({ des: desc });
    let descPic = [];
    descPic.push(this.state.fileNamePlace);
    descPic.push(this.state.fileNameMaterial);
    descPic.push(this.state.fileNameQuantity);
    this.setState({ desPic: descPic });
    console.log(this.state.lugar);
    console.log(this.state.titulo);   
  }

  asignar = () => {
    this.getFieldsTask();
    this.modifyTask();
    //this.asignarDB();
  }

  imageComponentPlace(){
    let nom = this.state.fileNamePlace
    let image = require('./data/imagenesTareas/'+nom)
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

  imageComponentMaterial(){
    let nom = this.state.fileNameMaterial
    let image = require('./data/imagenesTareas/'+nom)
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

  imageComponentQuantity(){
    let nom = this.state.fileNameQuantity
    let image = require('./data/imagenesTareas/'+nom)
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

  async SingleFilePickerPlace() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ selectedFilePlace: true, fileNamePlace: res.name });
      this.setState({ desPic: res.name});
      let name = res.name.split(".")[0];
      this.setState({ des: "Ir al " + name});
    } catch (err) {
      console.log(err);
    }
  }

  async SingleFilePickerMaterial() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ selectedFileMaterial: true, fileNameMaterial: res.name });
      this.setState({ desPic: this.state.desPic + "," + res.name});
      let name = res.name.split(".")[0];
      this.setState({ des: this.state.des + "," + "Buscar " + name});
    } catch (err) {
      console.log(err);
    }
  }

  async SingleFilePickerQuantity() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ selectedFileQuantity: true, fileNameQuantity: res.name });
      this.setState({ desPic: this.state.desPic + "," + res.name + ","});
      let name = res.name.split(".")[0];
      this.setState({ des: this.state.des + "," + "Coger " + name + ","});
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
                onChangeText = {(text) => this.setState({titulo: "Tarea de "+text})}
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
                    onPress={this.SingleFilePickerPlace.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

          {this.state.selectedFilePlace? this.imageComponentPlace() : null}

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
                <Text style={styles.formContent}>Pictograma Material:</Text>
            </View>

            <View style={styles.formItem}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={this.SingleFilePickerMaterial.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

          {this.state.selectedFileMaterial? this.imageComponentMaterial() : null}

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
                <Text style={styles.formContent}>Pictograma Cantidad:</Text>
            </View>

            <View style={styles.formItem}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={this.SingleFilePickerQuantity.bind(this)}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
            </View>
          </View>

          {this.state.selectedFileQuantity? this.imageComponentQuantity() : null}

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