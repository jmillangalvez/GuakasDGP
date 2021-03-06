import React, { Component } from "react";
import { Button, Text, SafeAreaView, TouchableOpacity, View, TextInput, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';
import * as DocumentPicker from 'expo-document-picker';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class CreateNormalTask extends Component {
  constructor(props) {
    super(props);
    this.state = { titulo: "", descripcion: "", tituloPic: "microondas.png", descripcionPic1: "nueva.png", 
    titleChosen: false, desChosen: false, descripcionPic2: "nueva.png",descripcionPic3: "nueva.png",
    descripcionPic4: "nueva.png",descripcionPic5: "nueva.png", descripcionPic: "", show: false };
  };

  createTask = () =>{
    let descripcion = "";
    if(this.state.descripcionPic1 != "nueva.png"){
      descripcion =+ this.state.descripcionPic1;
      descripcion =+ ",";
    }
    if(this.state.descripcionPic2 != "nueva.png"){
      descripcion =+ this.state.descripcionPic2;
      descripcion =+ ",";
    }
    if(this.state.descripcionPic3 != "nueva.png"){
      descripcion =+ this.state.descripcionPic3;
      descripcion =+ ",";
    }
    if(this.state.descripcionPic4 != "nueva.png"){
      descripcion =+ this.state.descripcionPic4;
      descripcion =+ ",";
    }
    if(this.state.descripcionPic5 != "nueva.png"){
      descripcion =+ this.state.descripcionPic5;
      descripcion =+ ",";
    }
    this.createTaskDB();
    this.setState({show: true});
    setTimeout(()=> { this.props.navigation.navigate('TaskSubmenu') }, 2000);
  }

  async createTaskDB() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/tasks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
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

  showAlert(){
    return(
      <Text style={{color: '#000000', marginTop: 20}}>Acción realizada correctamente</Text>
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
      this.setState({ descripcionPic: res.name + "," });
    } catch (err) {
      console.log(err);
    }
  }

  async SingleFilePickerDes2() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic2: res.name });
      this.setState({ descripcionPic: this.state.descripcionPic + res.name + "," });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes3() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic3: res.name });
      this.setState({ descripcionPic: this.state.descripcionPic + res.name + "," });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes4() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic4: res.name });
      this.setState({ descripcionPic: this.state.descripcionPic + res.name + "," });
    } catch (err) {
      console.log(err);
    }
  }
  async SingleFilePickerDes5() {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      this.setState({ descripcionPic5: res.name });
      this.setState({ descripcionPic: this.state.descripcionPic + res.name + "," });
    } catch (err) {
      console.log(err);
    }
  }

  
  render (){

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
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.addStudent, {marginBottom: 0}]}>
          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo:</Text>
            </View>

            <View style={styles.formItem}>
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

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Titulo en pictograna:</Text>
            </View>

            <View style={styles.formItem}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={this.SingleFilePickerTitle.bind(this)}>
                <Text style={[styles.formContentLine , {marginBottom: 5}]}>Selecciona Imagen</Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.titleChosen? this.imageComponentTitle() : null}

          <View style={styles.fixToText}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Descripción:</Text>
            </View>

            <View style={styles.formItem}>
              <TextInput 
                style={styles.formContentLine}
                onChangeText = {(text) => this.setState({descripcion: text})}
                defaultValue = {this.state.descripcion}
                multiline={true}
                placeholder = ".............................."
                accessibilityLabel="Descripcion tarea"
                accessibilityHint="Introduce la descripción de la tarea" 
              />
            </View>
          </View>

          <View style={[styles.fixToText, {marginBottom: 0}]}>
            <View style={styles.formItem}>
              <Text style={styles.formContent}>Descripción en pictogramas:</Text>
            </View>

            
          </View>
        
        </View>
        <View style={[styles.formItem , {marginTop: 0}]}>
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

        {this.state.show? this.showAlert() : null}
        
        <View style={styles.confirmButton}>
          <Button
            title="Crear Tarea"
            accessibilityLabel="Crear Tarea"
            accessibilityRole="Button"
            accessibilityHint="Crea la tarea"
            color="#248aff"
            onPress={this.createTask}
          />
        </View>

      </View>
    )
  }
}

export default CreateNormalTask;