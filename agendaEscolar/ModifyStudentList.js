import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyStudentList extends Component {

  constructor(props) {
    super(props);

    this.datosEstudiantes = {
      data:[
        {
          data:[
            {name:'Luis García', image:require("./data/imagenesAlumnos/1.jpg"),idStudent:8},
            {name:'María González', image:require("./data/imagenesAlumnos/2.jpg"),idStudent:8},
            {name:'Juana Fernández', image:require("./data/imagenesAlumnos/3.jpg"),idStudent:8},
            {name:'Martina Rodríguez', image:require("./data/imagenesAlumnos/4.jpg"),idStudent:8},
            {name:'Alejandra López', image:require("./data/imagenesAlumnos/5.jpg"),idStudent:8},
            {name:'Rodrigo Martínez', image:require("./data/imagenesAlumnos/6.jpg"),idStudent:8},
            {name:'Martín Sánchez', image:require("./data/imagenesAlumnos/7.jpg"),idStudent:8},
            {name:'Andrea Pérez', image:require("./data/imagenesAlumnos/8.jpg"),idStudent:8},
            {name:'Manuel Gómez', image:require("./data/imagenesAlumnos/9.jpg"),idStudent:8},
            {name:'Teresa Martín', image:require("./data/imagenesAlumnos/10.jpg"),idStudent:8},
          ]
        },
        
      ]
    }
  }


  render() {
    return (
      <View>
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

        <SectionList
        sections={this.datosEstudiantes.data}

        renderItem={({item}) => {
        
        return (
          <View style={styles.listContainer}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('ModifyStudent', {idStudent: item.idStudent})}>
              <Image style={styles.listImage} source={item.image}/>
            </TouchableOpacity>

            <View style={styles.listContent}>
              <Text  style={styles.listText}>{item.name}</Text>
            </View>

          </View>
          )
        }}/>
      </View>
    );
  }
}

export default ModifyStudentList;