import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyTeacherList extends Component {

  constructor(props) {
    super(props);
    this.state= {data: []};
    this.getTeachers();

    /*this.datosEducadores = {

      data:[
        {
          data:[
            {name:'Tatiana López', image:require("./data/imagenesEducadores/1.jpg")},
            {name:'Sergio Moreno', image:require("./data/imagenesEducadores/2.jpg")},
            {name:'Antonio Rodríguez', image:require("./data/imagenesEducadores/3.jpg")},
            {name:'Luis García', image:require("./data/imagenesEducadores/4.jpg")},
            {name:'Marina Valero', image:require("./data/imagenesEducadores/5.jpg")}
          ]
        },

      ]
    }*/

  }

  aniadirDatos = () => {
    

    
  }

  async getTeachers() {
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
      this.setState({ data:[{data: json.items}]});

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyStudentList" accessibilityRole="header">Selecciona un educador</Text>
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
          sections={this.state.data}

          renderItem={({item}) => {
          
          return (
              <View style={styles.listContainer}>
                <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('ModifyTeacher', {item})}>
                  <Image style={styles.listImage} source={require("./data/imagenesEducadores/default.png")}/>
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

export default ModifyTeacherList;