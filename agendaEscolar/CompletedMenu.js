import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class CompletedMenu extends Component {

  constructor(props) {
    
    super(props);
    this.datosMenu = {

      data:[

        {
          data:[
            {image1:require("./data/imagenesMenu/blanco.jpeg"),
            image2:require("./data/imagenesEducadores/1.jpg"),
            image3:require("./data/imagenesEducadores/2.jpg"),
            image4:require("./data/imagenesEducadores/3.jpg"),
            image5:require("./data/imagenesEducadores/4.jpg"),
            image6:require("./data/imagenesEducadores/5.jpg")},

            {image1:require("./data/imagenesMenu/menu.png"),
            image2:require("./data/imagenesMenu/8.png"),
            image3:require("./data/imagenesMenu/3.png"),
            image4:require("./data/imagenesMenu/5.png"),
            image5:require("./data/imagenesMenu/1.png"),
            image6:require("./data/imagenesMenu/7.png")},

            {image1:require("./data/imagenesMenu/carne.png"),
            image2:require("./data/imagenesMenu/0.png"),
            image3:require("./data/imagenesMenu/4.png"),
            image4:require("./data/imagenesMenu/3.png"),
            image5:require("./data/imagenesMenu/9.png"),
            image6:require("./data/imagenesMenu/1.png")},

            {image1:require("./data/imagenesMenu/verdura.png"),
            image2:require("./data/imagenesMenu/2.png"),
            image3:require("./data/imagenesMenu/3.png"),
            image4:require("./data/imagenesMenu/1.png"),
            image5:require("./data/imagenesMenu/5.png"),
            image6:require("./data/imagenesMenu/5.png")},

            {image1:require("./data/imagenesMenu/manzana.png"),
            image2:require("./data/imagenesMenu/3.png"),
            image3:require("./data/imagenesMenu/7.png"),
            image4:require("./data/imagenesMenu/8.png"),
            image5:require("./data/imagenesMenu/6.png"),
            image6:require("./data/imagenesMenu/10.png")},

            {image1:require("./data/imagenesMenu/yogur.png"),
            image2:require("./data/imagenesMenu/1.png"),
            image3:require("./data/imagenesMenu/2.png"),
            image4:require("./data/imagenesMenu/1.png"),
            image5:require("./data/imagenesMenu/0.png"),
            image6:require("./data/imagenesMenu/5.png")},

          ]
        },

      ]
    }

  }

  render() {
    return (   
      <View>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyCommandTaskList" accessibilityRole="header">Menú</Text>
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
          sections={this.datosMenu.data}

          renderItem={({item}) => {
            return (
              <View style={styles.listContainer}>

                <View>
                  <Image style={styles.listImage} source={item.image1}/>
                </View>

                <View>
                  <Image style={styles.listImage} source={item.image2}/>
                </View>

                <View>
                  <Image style={styles.listImage} source={item.image3}/>
                </View>

                <View>
                  <Image style={styles.listImage} source={item.image4}/>
                </View>

                <View>
                  <Image style={styles.listImage} source={item.image5}/>
                </View>

                <View>
                  <Image style={styles.listImage} source={item.image6}/>
                </View>

              </View>
            )
          }}
        />
      </View>
    );
  }
}

export default CompletedMenu;