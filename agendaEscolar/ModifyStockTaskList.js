import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyStockTaskList extends Component {

  constructor(props) {
  super(props);
    this.stockTaskList = {
      data:[
        {
          data:[
            {place:'Almacen', material:'cartulinas', quantity:3,idStockTask:1},
            {place:'Almacen', material:'boligrafos', quantity:3,idStockTask:2},
            {place:'Impresora', material:'fotocopias', quantity:2,idStockTask:3},
            {place:'Despacho Jefe Estudios', material:'grapadora', quantity:1,idStockTask:4},
          ]
        },
      ]
    }
  }


  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyStockTaskList" accessibilityRole="header">Selecciona una tarea</Text>
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
          sections={this.stockTaskList.data}

          renderItem={({item}) => {
          
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity 
                onPress={ () => this.props.navigation.navigate('InfoTaskStock', {
                    task: item
                }) }>
                
              </TouchableOpacity>

              <View style={styles.listContent}>
                <Text  style={styles.listText}>IR A {this.state.task.place} A POR {this.state.task.quantity} {this.state.task.material}</Text>
              </View>

            </View>
          )
        }}/>
      </View>
    );
  }
}

export default ModifyStockTaskList;