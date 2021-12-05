import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';


class AssignTaskList1 extends Component {

  constructor(props) {
    super(props);

    this.datosEstudiantes = {

      data:[

        {
          data:[
            {name:'Luis García', image:require("./data/imagenesAlumnos/1.jpg")},
            {name:'María González', image:require("./data/imagenesAlumnos/2.jpg")},
            {name:'Juana Fernández', image:require("./data/imagenesAlumnos/3.jpg")},
            {name:'Martina Rodríguez', image:require("./data/imagenesAlumnos/4.jpg")},
            {name:'Alejandra López', image:require("./data/imagenesAlumnos/5.jpg")},
            {name:'Rodrigo Martínez', image:require("./data/imagenesAlumnos/6.jpg")},
          ]
        },
        
      ]
    }

  }


  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AssingTaskList1" accessibilityRole="header">Selecciona un alumno</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('EducatorMain')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <SectionList sections={this.datosEstudiantes.data}
          renderItem={({item}) => {
            
            return (
              <View style={styles.listContainer}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTaskList2')}>
                  <Image style={styles.listImage} source={item.image}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <Text  style={styles.listText}>{item.name}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

export default AssignTaskList1;