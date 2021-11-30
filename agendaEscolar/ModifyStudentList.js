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


class ModifyStudentList extends Component {

  constructor(props) {
    super(props);

    this.datosEstudiantes = {

      data:[

        {
          data:[
            {name:'Luis García', image:require("./data/imagenesAlumnos/1.jpg")},
            {name:'María González', image:require("./data/imagenesAlumnos/2.jpg")},
            {name:'Juana Fernández', image:require("./data/imagenesAlumnos/3.jpg")},
            {name:'Martina Rodríguez', image:require("./data/imagenesAlumnos/4.jpg")},
            {name:'Alejandra López', image:require("./data/imagenesAlumnos/5.jpg")},
            {name:'Rodrigo Martínez', image:require("./data/imagenesAlumnos/6.jpg")},
            {name:'Martín Sánchez', image:require("./data/imagenesAlumnos/7.jpg")},
            {name:'Andrea Pérez', image:require("./data/imagenesAlumnos/8.jpg")},
            {name:'Manuel Gómez', image:require("./data/imagenesAlumnos/9.jpg")},
            {name:'Teresa Martín', image:require("./data/imagenesAlumnos/10.jpg")},
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
            <Text  style={styles.name}>Selecciona un alumno</Text>
          </View>

          <SectionList sections={this.datosEstudiantes.data}

            renderItem={({item}) => {
              
              return (
              <View style={styles.container}>

                <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('ModifyStudent')
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

export default ModifyStudentList;