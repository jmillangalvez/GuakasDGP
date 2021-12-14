import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, FlatList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyCommandTaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {tareas: [], listaTareas: []}
  }

  async getTasks() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/dinningTasks/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({tareas: json.items, listaTareas: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getTasks();
  }

  actualizarLista(titulo){
    if (titulo == ""){
      this.setState({listaTareas: this.state.tareas})
    }
    else{
      let nuevaLista = []
      for(let i = 0; i < this.state.tareas.length; i++){
        let tituloCompleto = this.state.tareas[i].classes.toLowerCase() + " " + this.state.tareas[i].menus.toLowerCase()
        let re = new RegExp(titulo)

        if(re.exec(tituloCompleto)){
          nuevaLista.push(this.state.tareas[i])
        }
      }

      this.setState({listaTareas: nuevaLista})
    }
  }


  render() {
    return (
      <View style={{flex:1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyCommandTaskList" accessibilityRole="header">Selecciona una tarea</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('TaskSubmenu')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.loginAdminInput}
          onChangeText = {(text) => this.actualizarLista(text)}
          defaultValue = ""
          placeholder = "Buscar tarea comedor"
          accessibilityLabel = "Barra para búsqueda"
          accessibilityHint = "Espacio para introducir el título de la tarea a buscar."
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.listaTareas}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyCommandTask', {idTask: item.idDinningTask})}>
                  <Image style={styles.listImage} source={require('./data/imagenesMenu/menu.png')}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyCommandTask', {idTask: item.idDinningTask})}>
                    <Text  style={styles.listText}>[{item.classes}] [{item.menus}]</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />

      </View>
    );
  }
}

export default ModifyCommandTaskList;