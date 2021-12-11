import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class AssignTaskList2 extends Component {

  constructor(props) {
    super(props);

    this.state = {tareas: [], idStudent: props.route.params.idStudent, idEducator: props.route.params.idEducator};
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

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.tareas}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTask', {idStudent: this.state.idStudent,
                      idTask: item.idTask, idEducator: this.state.idEducator})}>
                  <Image style={styles.listImage} source={require('./data/imagenesTareas/' + item.pictogramTitle)}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignTask', {idStudent: this.state.idStudent,
                        idTask: item.idTask, idEducator: this.state.idEducator})}>
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

export default AssignTaskList2;