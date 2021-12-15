import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, FlatList, SafeAreaView} from 'react-native';
import styles from './Styles';

class CompletedMenuList extends Component {

  constructor(props) {
    super(props);
    this.state = {classMenus: [], listaFechas: []}
  }

  async getClassMenus() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/classMenus/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({classMenus: json.items});
      let nuevaLista = []
      for(let i = 0; i < this.state.classMenus.length; i++){
        if(!nuevaLista.includes(this.state.classMenus[i].date)){
          nuevaLista.push(this.state.classMenus[i].date)
        }
      }
      this.setState({listaFechas: nuevaLista})
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getClassMenus();
  }

  actualizarLista(fecha){
    if (fecha == ""){
      let nuevaLista = []
      for(let i = 0; i < this.state.classMenus.length; i++){
        if(!nuevaLista.includes(this.state.classMenus[i].date)){
          nuevaLista.push(this.state.classMenus[i].date)
        }
      }
      this.setState({listaFechas: nuevaLista})
    }
    else{
      let nuevaLista = []
      for(let i = 0; i < this.state.classMenus.length; i++){
        let fechaCompleta = this.state.classMenus[i].date.toLowerCase()
        let re = new RegExp(fecha)

        if(re.exec(fechaCompleta)){
          if(!nuevaLista.includes(this.state.classMenus[i].date)){
            nuevaLista.push(this.state.classMenus[i].date)
          }
        }
      }

      this.setState({listaFechas: nuevaLista})
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="CompletedMenuList" accessibilityRole="header">Lista de menús</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('AdminMain')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.loginAdminInput}
          onChangeText = {(text) => this.actualizarLista(text)}
          defaultValue = ""
          placeholder = "Buscar fecha"
          accessibilityLabel = "Barra para búsqueda"
          accessibilityHint = "Espacio para introducir la fecha a buscar."
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.listaFechas}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CompletedMenu', {date: item})}>
                  <Image style={styles.listImage} source={require('./data/imagenesMenu/vermenu.png')}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('CompletedMenu', {date: item})}>
                    <Text  style={styles.listText}>Fecha del menu: {item}</Text>
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

export default CompletedMenuList;