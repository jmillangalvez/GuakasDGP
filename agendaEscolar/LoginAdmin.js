import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, TextInput, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

  
class LoginAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, email:"", password:"", listAdmins: [], show: false};
    //this.listAdmins = require('./data/admin.json');
  }

  async getAdmins() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/admins/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({ listAdmins: json.items });
      console.log(this.state.listAdmins)
      console.log(this.state.listAdmins[0].name)
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getAdmins();
  }

  checkAdminPassword = () => {
    var notFound = true;
    for(var i = 0; i < this.state.listAdmins.length; i++){
      if(this.state.listAdmins[i].email === this.state.email && this.state.listAdmins[i].password === this.state.password){
        this.setState({
          authenticated: true,
          password: ""
        });

        notFound = false;
        break;
      }
    }
    if(notFound){
      this.setState({
        email: "",
        password: "",
        show: true
      });
    }else{
      this.props.navigation.navigate('AdminMain')
    }

  };

  showAlert(){
    return(
      <Text style={{color: '#ff0000'}}>Usuario o contraseña incorrectas</Text>
    )
  }

  loginView(){
    return(
      <View accessible={true} style={styles.loginAdminBox}>
        <TextInput
          style={styles.loginAdminInput}
          onChangeText = {(text) => this.setState({email: text})}
          defaultValue = {this.state.email}
          placeholder = "Email"
          accessibilityLabel = "Usuario"
          accessibilityHint = "Espacio para introducir el nombre de usuario."
        />
            
        <TextInput
          style={styles.loginAdminInput}
          onChangeText = {(text) => this.setState({password: text})}
          defaultValue = {this.state.password}
          secureTextEntry = {true}
          placeholder = "Contraseña"
          accessibilityLabel = "Contraseña"
          accessibilityHint = "Espacio para introducir la contraseña."
        />

        <TouchableOpacity
          accessibilityLabel = "Entrar"
          accessibilityRole = "button"
          accessibilityHint = "Intenta loggearse con el usuario y credenciales introducidos."
          style={styles.loginAdminButton}
          onPress={this.checkAdminPassword}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    const { authenticated, email, password } = this.state;
    
    changeScreenOrientation();
    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="LOGIN ADMIN">LOGIN ADMIN</Text>
        </SafeAreaView>

        <View style = {styles.center}>
          {this.loginView()}

          {this.state.show? this.showAlert() : null}
        </View>
        <View style = {styles.center}>
          <TouchableOpacity
            accessibilityLabel = "Entrar"
            accessibilityRole = "button"
            accessibilityHint = "Intenta loggearse con el usuario y credenciales introducidos."
            style={styles.loginAdminButton}
            onPress={() => this.props.navigation.navigate('LoginEducator')}>
            <Text>Cambiar login Educador</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
      
    
    );
  }
}

export default LoginAdmin;