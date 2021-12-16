import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, SectionList, SafeAreaView} from 'react-native';
import styles from './Styles';

class ModifyCommandTaskList extends Component {

  constructor(props) {
  super(props);
    this.commandTaskList = {
      data:[
        {
          data:[
            {clases:'[Clase A, Clase D, Clase E]', platos:'[Menu normal, Sin carne, Triturado]'},
            {clases:'[Clase B, Clase C, Clase F]', platos:'[Menu normal, Sin carne, Triturado]'},
            {clases:'[Clase A, Clase B, Clase C]', platos:'[Menu normal, Sin carne, Triturado]'},
            {clases:'[Clase D, Clase E, Clase F]', platos:'[Menu normal, Sin carne, Triturado]'},
          ]
        },
      ]
    }
  }


  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyCommandTaskList" accessibilityRole="header">Selecciona una tarea</Text>
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
          sections={this.commandTaskList.data}

          renderItem={({item}) => {
          
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('ModifyCommandTask')}>
                <Image style={styles.listImage} source={require("./data/imagenesMenu/menu.png")}/>
              </TouchableOpacity>

              <View style={styles.listContent}>
                <Text style={styles.listText}>{item.clases} {item.platos}</Text>
              </View>
            </View>
          )
        }}/>
      </View>
    );
  }
}

export default ModifyCommandTaskList;