import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  Button
} from 'react-native';

export default class ListaModificarEducador extends Component {

  constructor(props) {
    super(props);
    this.datosEducadores = {

      data:[

        {
          data:[
            {name:'Tatiana López', image:require("./data/imagenesEducadores/1.jpg")},
            {name:'Sergio Moreno', image:require("./data/imagenesEducadores/2.jpg")},
            {name:'Antonio Rodríguez', image:require("./data/imagenesEducadores/3.jpg")},
            {name:'Luis García', image:require("./data/imagenesEducadores/4.jpg")},
            {name:'Marina Valero', image:require("./data/imagenesEducadores/5.jpg")}
          ]
        },

      ]
    }
  }


  render() {
    return (
      <View>

        <Button
          title="Volver"
          color="#841584"
          
        />
      
        <View style={styles.titulo}>
          <Text  style={styles.name}>Selecciona un educador</Text>
        </View>

        <SectionList
          sections={this.datosEducadores.data}

          renderItem={({item}) => {
            
            return (
            <View style={styles.container}>

              <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('ModifyTeacher')
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
  root:{
    marginTop:50,
    padding:10,
  },
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
