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


class AssignTaskList1 extends Component {

  constructor(props) {
    super(props);

    this.datosEstudiantes = {

      data:[

        {
          data:[
            {name:'Poner Microondas', image:require("./data/imagenesAlumnos/1.jpg")},
            {name:'Borrar Pizarra', image:require("./data/imagenesAlumnos/2.jpg")},
            {name:'Recoger Clase', image:require("./data/imagenesAlumnos/3.jpg")},
            {name:'Pasar Lista', image:require("./data/imagenesAlumnos/4.jpg")},
            {name:'Subir Sillas', image:require("./data/imagenesAlumnos/5.jpg")},
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
            color="#248aff"
            onPress={() =>
              this.props.navigation.navigate('AssignTaskList1')}
            
          />
        
          <View style={styles.titulo}>
            <Text  style={styles.name}>Selecciona un alumno</Text>
          </View>

          <SectionList sections={this.datosEstudiantes.data}

            renderItem={({item}) => {
              
              return (
              <View style={styles.container}>

                <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('AssignTask')
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

export default AssignTaskList1;