import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button } from 'react-native';


export default class listaPictograma extends Component {

  constructor(props) {
    super(props);

    this.datosPictograma = {
      data:[
        {
          data:[
            {name:'Tarea 1', image:require("./img/pict1.png")},
            {name:'Tarea 2', image:require("./img/pict1.png")},
            {name:'Tarea 3', image:require("./img/pict1.png")},
            {name:'Tarea 4', image:require("./img/pict1.png")},
            {name:'Tarea 5', image:require("./img/pict1.png")},
            {name:'Tarea 6', image:require("./img/pict1.png")},
            {name:'Tarea 7', image:require("./img/pict1.png")},
            {name:'Tarea 8', image:require("./img/pict1.png")},
            {name:'Tarea 9', image:require("./img/pict1.png")},
            {name:'Tarea 0', image:require("./img/pict1.png")},
          ]
        },
        
      ]
    }

  }


  render() {
    return (

        <View>

          <View style={styles.titulo}>
            <Text  style={styles.name}>Selecciona un pictograma</Text>
          </View>

          <SectionList sections={this.datosPictograma.data}

            renderItem={({item}) => {
              
              return (
              <View style={styles.container}>

                <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('m_tarea')
                }>
                  <Image style={styles.image} source={item.image}/>
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text  style={styles.name}>{item.name}</Text>
                </View>

              </View>
              )
          }}/>

        </View>


    );
  }
}

const styles = StyleSheet.create({
  titulo: {

    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100

  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  content: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
    height: 100
  },
  image:{
    width:100,
    height:100,
    borderRadius:20,
    marginLeft:20
  },
  name:{
    fontSize:40,
  },
});