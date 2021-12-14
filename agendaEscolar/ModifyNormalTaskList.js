import React, { Component } from 'react';
import {StyleSheet, Text, View,FlatList, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyNormalTaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {tareas: []}
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
      this.setState({tareas: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getTasks();
  }


  render() {
    return (
      <View style={{flex:1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyNormalTaskList" accessibilityRole="header">Selecciona una tarea</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior"
            onPress={() => this.props.navigation.navigate('TaskSubmenu')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.tareas}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyNormalTask', {idTask: item.idTask})}>
                  <Image style={styles.listImage} source={require('./data/imagenesTareas/' + item.pictogramTitle)}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyNormalTask', {idTask: item.idTask})}>
                    <Text  style={styles.listText}>{item.title}</Text>
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

export default ModifyNormalTaskList;