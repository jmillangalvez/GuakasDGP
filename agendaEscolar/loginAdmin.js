import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, TextInput, SafeAreaView, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}
  
class loginAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, name:"", password:""};
    this.listAdmins = require('./data/admin.json');
  }

  checkAdminPassword = () => {
      var notFound = true;
      for(var i = 0; i < this.listAdmins.admins.length; i++){
        if(this.listAdmins.admins[i].name === this.state.name && this.listAdmins.admins[i].password === this.state.password){
            this.setState({
                authenticated: true,
                password: ""
            });

            notFound = false;
            break;
        }
      }
      if(notFound){
          Alert.alert(
              "Authentication Error",
              "Nombre de usuario o contraseña incorrectos. Por favor, vuelva a introducirlos de nuevo.",
          )
      }

  };

  setName(t){
      this.setState({
          name: t
      });
  }
  setPassword(t){
      this.setState({
          password: t
      });
  }

  render(){
    const { authenticated, name, password } = this.state;
    
    changeScreenOrientation();
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="LOGIN ADMIN">LOGIN ADMIN</Text>
        </SafeAreaView>
        <View style={styles.loginAdminBox}>
            <TextInput
                style={styles.input}
                onChangeText = {(text) => this.setState({name: text})}
                defaultValue = {this.state.name}
                placeholder = "Usuario"
            />
            
            <TextInput
                style={styles.input}
                onChangeText = {(text) => this.setState({password: text})}
                defaultValue = {this.state.password}
                secureTextEntry = {true}
                placeholder = "Contraseña"
            />

            <TouchableOpacity style={styles.button} onPress={this.checkAdminPassword}>
                <Text>Click me</Text>
            </TouchableOpacity>

            <Text>
                Hola, {this.state.name} con contraseña: {this.state.password}
            </Text>

            {this.state.authenticated? <Text>Autenticado</Text> : <Text>No autenticado</Text>}
            
        </View>

        
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default loginAdmin;