import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, TextInput, SafeAreaView, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}
  
class LoginEducator extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, userName:"", password:"", listEducators: []};
    //this.listAdmins = require('./data/admin.json');
  }

  async getAdmins() {
    try {
      const response = await fetch('http://localhost:8000/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({ listEducators: json.items });
      console.log(this.state.listEducators)
      console.log(this.state.listEducators[0].name)
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getAdmins();
  }

  checkAdminPassword = () => {
    var notFound = true;
    for(var i = 0; i < this.state.listEducators.length; i++){
      if(this.state.listEducators[i].userName === this.state.userName && this.state.listEducators[i].password === this.state.password){
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
        userName: "",
        password: ""
      });
      Alert.alert(
          "Authentication Error",
          "Nombre de usuario o contraseña incorrectos. Por favor, vuelva a introducirlos de nuevo.",
      )
    }else{
      this.props.navigation.navigate('EducatorMain')
      console.log("Entra")
    }

  };

  loginView(){
    return(
      <View accessible={true} style={styles.loginAdminBox}>
        <TextInput
          style={styles.loginAdminInput}
          onChangeText = {(text) => this.setState({userName: text})}
          defaultValue = {this.state.userName}
          placeholder = "Usuario"
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
    const { authenticated, userName, password } = this.state;
    
    changeScreenOrientation();
    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="LOGIN EDUCADOR">LOGIN EDUCADOR</Text>
        </SafeAreaView>

        <View style = {styles.center}>
          {this.loginView()}
        </View>

        <View style = {styles.center}>
          <TouchableOpacity
            accessibilityLabel = "Entrar"
            accessibilityRole = "button"
            accessibilityHint = "Intenta loggearse con el usuario y credenciales introducidos."
            style={styles.loginAdminButton}
            onPress={() => this.props.navigation.navigate('LoginAdmin')}>
            <Text>Cambiar login Admin</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

export default LoginEducator;