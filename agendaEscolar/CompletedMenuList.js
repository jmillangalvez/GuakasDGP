import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class CompletedMenuList extends Component {

  constructor(props) {
    super(props);
    this.menus = {

      data:[

        {
          data:[
            {fecha:'01-11-2021'},
            {fecha:'08-11-2021'},
            {fecha:'15-11-2021'},
            {fecha:'22-11-2021'},
            {fecha:'29-11-2021'}
          ]
        },

      ]
    }
  }

  render() {
    return (
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="CompletedMenuList" accessibilityRole="header">Lista de menús</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('AdminMain')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={this.menus.data}

          renderItem={({item}) => {
            return (
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() =>this.props.navigation.navigate('CompletedMenu')}>
                  <Image style={styles.listImage}  source={require('./data/imagenesMenu/vermenu.png')}/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                  <Text  style={styles.listText}>Fecha del menu: {item.fecha}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

export default CompletedMenuList;