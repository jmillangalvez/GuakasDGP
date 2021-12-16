import React, { Component } from 'react';
import {TextInput, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView} from 'react-native';
import styles from './Styles';

class AssignTaskList2 extends Component {

  constructor(props) {
    super(props);

    this.state = {tareas: [], idStudent: props.route.params.idStudent, idEducator: props.route.params.idEducator, listaTareas: []};
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
        let tituloCompleto = this.state.tareas[i].title.toLowerCase()
        let re = new RegExp(titulo)

        if(re.exec(tituloCompleto)){
          nuevaLista.push(this.state.tareas[i])
        }
      }

      this.setState({listaTareas: nuevaLista})
    }
  }

  goNormalTask(item){
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTask', {idStudent: this.state.idStudent,
            idTask: item.idTask, idEducator: this.state.idEducator})}>
        <Image style={styles.listImage} source={require('./data/imagenesTareas/' + item.pictogramTitle)}/>
      </TouchableOpacity>
    )
  }

  goStockTask(item){
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignStockTask', {idStudent: this.state.idStudent,
            idTask: item.idTask, idEducator: this.state.idEducator})}>
        <Image style={styles.listImage} source={require('./data/imagenesTareas/' + item.pictogramTitle)}/>
      </TouchableOpacity>
    )
  }

  goNormalTaskText(item){
    return(
      <View style={styles.listContent}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTask', {idStudent: this.state.idStudent,
              idTask: item.idTask, idEducator: this.state.idEducator})}>
          <Text  style={styles.listText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  goStockTaskText(item){
    return(
      <View style={styles.listContent}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignStockTask', {idStudent: this.state.idStudent,
              idTask: item.idTask, idEducator: this.state.idEducator})}>
          <Text  style={styles.listText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AssingTaskList2" accessibilityRole="header">Selecciona una tarea</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('AssignTaskList1')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          onChangeText = {(text) => this.actualizarLista(text)}
          defaultValue = ""
          placeholder = "Buscar tarea"
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
                {item.idTask == 3? this.goStockTask(item) : this.goNormalTask(item)}
                
                {item.idTask == 3? this.goStockTaskText(item) : this.goNormalTaskText(item)}
              </View>
            )
          }}
        />

      </View>
    );
  }
}

export default AssignTaskList2;