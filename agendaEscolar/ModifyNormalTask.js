import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";
import * as DocumentPicker from 'expo-document-picker';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ModifyNormalTask extends Component {

  constructor(props){
    super(props);
    this.state= {titulo: "", descripcion: "", tituloPic: "microondas.png", descripcionPic: "microondas.png" , idTask: props.route.params.idTask, task: '', listDes: [],
    descripcionPic1: "nueva.png", descripcionPic2: "nueva.png",descripcionPic3: "nueva.png", descripcionPic4: "nueva.png", descripcionPic5: "nueva.png", descripcionPic: ""}
  }

  async getTasks() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/tasks/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      let tasks = json.items;
      let notFound = true;
      for (let i = 0; i < tasks.length && notFound; i++) {
        if(tasks[i].idTask == this.state.idTask){
          notFound = false;
          this.setState({task: tasks[i]});
          this.setState({titulo: tasks[i].title});
          this.setState({tituloPic: tasks[i].pictogramTitle});
          this.setState({descripcion: tasks[i].description});
          this.setState({descripcionPic: tasks[i].pictogramDescription});
          this.setState({listDes: tasks[i].pictogramDescription.split(",")});
          if(tasks[i].pictogramDescription.split(",")[0].length > 3){
            this.setState({descripcionPic1: tasks[i].pictogramDescription.split(",")[0]});
          }
          if(tasks[i].pictogramDescription.split(",")[1].length > 3){
            this.setState({descripcionPic2: tasks[i].pictogramDescription.split(",")[1]});
          }
          if(tasks[i].pictogramDescription.split(",")[2].length > 3){
            this.setState({descripcionPic3: tasks[i].pictogramDescription.split(",")[2]});
          }
          if(tasks[i].pictogramDescription.split(",")[3].length > 3){
            this.setState({descripcionPic4: tasks[i].pictogramDescription.split(",")[3]});
          }
          if(tasks[i].pictogramDescription.split(",")[4].length > 3){
            this.setState({descripcionPic5: tasks[i].pictogramDescription.split(",")[4]});
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getTasks();
  }

  async deleteTask() {
    let url = 'http://localhost:8000/api/v1/tasks/' + this.state.idTask + '/'
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
         }
      });
    } catch (error) {
      console.log(error);
    }
  }

  eliminarTarea = () => {
    this.deleteTask();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }


  async modifyTask() {
    let url = 'http://localhost:8000/api/v1/tasks/' + this.state.idTask + '/'
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
            description: this.state.descripcion,
            pictogramDescription: this.state.descripcionPic,
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  modificarTarea = () => {
    this.modifyTask();

    Alert.alert(
      "Operación satisfactoria",
      "El estudiante ha sido añadido",
    )
  }

  imageComponentTitle(){
    let nom = this.state.tituloPic;
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

  async SingleFilePickerTitle() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ tituloPic: res.name });
      this.setState({ titleChosen: true });
    } catch (err) {
      console.log(err);
    }
  }

  imageComponentDes1(){
    let nom = this.state.descripcionPic1;
    let image = require('./data/imagenesTareas/'+nom)
    return (
      <View style={styles.selectImage2}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
  }

  imageComponentDes2(){
    let nom = this.state.descripcionPic2;
    let image = require('./data/imagenesTareas/'+nom)
    return (
      <View style={styles.selectImage2}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
  }

  imageComponentDes3(){
    let nom = this.state.descripcionPic3;
    let image = require('./data/imagenesTareas/'+nom)
    return (
      <View style={styles.selectImage2}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
  }

  imageComponentDes4(){
    let nom = this.state.descripcionPic4;
    let image = require('./data/imagenesTareas/'+nom)
    return (
      <View style={styles.selectImage2}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
        <Text></Text>
      </View>
    );
  }

  imageComponentDes5(){
    let nom = this.state.descripcionPic5;
    let image = require('./data/imagenesTareas/'+nom)
    return (
      <View style={styles.selectImage2}>
        <Image
          style={styles.image}
          source={image}
          accessibilityLabel="Pasar hacia la izquierda"
        />
      </View>
    );
  }

  async SingleFilePickerDes1() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic1: res.name });
    } catch (err) {
      console.log(err);
    }
  }

  async SingleFilePickerDes2() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic2: res.name });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes3() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic3: res.name });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes4() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic4: res.name });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes5() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic5: res.name });
    } catch (err) {
      console.log(err);
    }
  }


  render(){
    changeScreenOrientation();
    return(
      
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModificarEstudiante">Modificar Tarea Fija</Text>
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

        <View style={styles.addStudent}>
          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({titulo: text})}
                defaultValue = {this.state.task.title}
                placeholder = "Titulo Tarea"
                accessibilityLabel="Titulo Tarea"
                accessibilityHint="Introduce el titulo de la tarea" 
              />
            </View>
          </View>

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo en pictograna:</Text>
            </View>

            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerTitle.bind(this)}>
                <Text style={styles.textStyle}>Choose Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.imageComponentTitle()} 

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Descripción:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentBox}
                onChangeText = {(text) => this.setState({descripcion: text})}
                defaultValue = {this.state.task.description}
                multiline={true}
                placeholder = ".............................."
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>
        </View>

        <View style={styles.formItem}>
          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerDes1.bind(this)}>
                {this.imageComponentDes1()}
              </TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerDes2.bind(this)}>
                {this.imageComponentDes2()}
              </TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerDes3.bind(this)}>
                {this.imageComponentDes3()}
              </TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerDes4.bind(this)}>
                {this.imageComponentDes4()}
              </TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerDes5.bind(this)}>
                {this.imageComponentDes5()}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.confirmButton}>
          <Button
            title="Modificar Tarea"
            accessibilityLabel="Modificar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Modifica el estudiante"
            color="#bcbcbc"
            onPress={this.modificarTarea}
          />
        </View>
        
        <View style={styles.removeButton}>
          <Button
            title="Eliminar Tarea"
            accessibilityLabel="Eliminar Estudiante"
            accessibilityRole="Button"
            accessibilityHint="Eliminar el estudiante"
            color="#A52A2A"
            onPress={this.eliminarTarea}
          />
        </View>

      </View>

    );
  }
}

export default ModifyNormalTask;