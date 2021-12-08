import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyTeacherList extends Component {

  constructor(props) {
    super(props);

    this.state = {educadores: []}
  }

  async getEducators() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({educadores: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getEducators();
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyTeacherList" accessibilityRole="header">Selecciona un educador</Text>
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

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data = {this.state.educadores}
          renderItem = {({item}) => {
            return(
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyTeacher', {idEducator: item.idEducator})}>
                  <Image style={styles.listImage} source={require('./data/imagenesEducadores/' + item.picture)}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyTeacher', {idEdcuator: item.idEducator})}>
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

export default ModifyTeacherList;