import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyNormalTaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {tasks:[{data:[]}]};
    this.getTasks();
  }

  async getTasks() {
    try {
        const response = await fetch('http://localhost:8000/tasks/', {
            method: 'GET',
            mode: 'cors',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        this.setState({ tasks:[{data: json.items}] });
        console.log(this.state.tasks);
    } catch (error) {
        console.log("Error en getTasks "+error);
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
            accessibilityHint = "Vuelve al submenú anterior"
            onPress={() => this.props.navigation.navigate('TaskSubmenu')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={this.state.tasks}

          renderItem={({item}) => {
          
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity
                accessibilityLabel = "Modificar tarea"
                accessibilityRole = "button"
                accessibilityHint = "Modifica una tarea normal"
                onPress={() => this.props.navigation.navigate('ModifyNormalTask', {item})}>
                <Image style={styles.listImage} source={require('./data/imagenesMenu/verdura.png')}/>
              </TouchableOpacity>
              <View style={styles.listContent}>
                <Text  style={styles.listText}>{item.taskId}. {item.title}: {item.description}</Text>
              </View>

            </View>
          )
        }}/>
      </View>
    );
  }
}

export default ModifyNormalTaskList;