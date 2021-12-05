import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyNormalTaskList extends Component {

  constructor(props) {
  super(props);
    this.normalTaskList = {
      data:[
        {
          data:[
            {title:'Titulo1', description:'Descripcion de la Tarea1', titlePictogram:require("./data/imagenesMenu/verdura.png")},
            {title:'Titulo2', description:'Descripcion de la Tarea1', titlePictogram:require("./data/imagenesMenu/verdura.png")},
            {title:'Titulo3', description:'Descripcion de la Tarea1', titlePictogram:require("./data/imagenesMenu/verdura.png")},
            {title:'Titulo4', description:'Descripcion de la Tarea1', titlePictogram:require("./data/imagenesMenu/verdura.png")},
            {title:'Titulo5', description:'Descripcion de la Tarea1', titlePictogram:require("./data/imagenesMenu/verdura.png")},
          ]
        },
      ]
    }
  }


  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyNormalTaskList" accessibilityRole="header">Selecciona una tarea</Text>
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

        <SectionList
          sections={this.normalTaskList.data}

          renderItem={({item}) => {
          
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('ModifyNormalTask')}>
                <Image style={styles.listImage} source={item.titlePictogram}/>
              </TouchableOpacity>

              <View style={styles.listContent}>
                <Text  style={styles.listText}>{item.title}: {item.description}</Text>
              </View>

            </View>
          )
        }}/>
      </View>
    );
  }
}

export default ModifyNormalTaskList;