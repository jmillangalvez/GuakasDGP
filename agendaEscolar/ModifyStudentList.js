import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, FlatList, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyStudentList extends Component {

  constructor(props) {
    super(props);

    this.state = {estudiantes: [], listaEstudiantes: []};
  }

  async getStudents() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/students/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({estudiantes: json.items, listaEstudiantes: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getStudents();
  }

  actualizarLista(nombre){
    if (nombre == ""){
      this.setState({listaEstudiantes: this.state.estudiantes})
    }
    else{
      let nuevaLista = []
      for(let i = 0; i < this.state.estudiantes.length; i++){
        let nombreCompleto = this.state.estudiantes[i].name.toLowerCase()
        let re = new RegExp(nombre)

        if(re.exec(nombreCompleto)){
          nuevaLista.push(this.state.estudiantes[i])
        }
      }

      this.setState({listaEstudiantes: nuevaLista})
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyStudentList" accessibilityRole="header">Selecciona un estudiante</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('StudentSubmenu')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          onChangeText = {(text) => this.actualizarLista(text)}
          defaultValue = ""
          placeholder = "Buscar nombre del alumno"
          accessibilityLabel = "Barra para búsqueda"
          accessibilityHint = "Espacio para introducir el nombre del alumno a buscar."
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.listaEstudiantes}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyStudent', {idStudent: item.idStudent})}>
                  <Image style={styles.listImage} source={require('./data/imagenesAlumnos/' + item.picture)}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyStudent', {idStudent: item.idStudent})}>
                    <Text  style={styles.listText}>{item.name}</Text>
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

export default ModifyStudentList;