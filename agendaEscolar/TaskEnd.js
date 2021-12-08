import React, {Component} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

// Bocetos 19 y 20: Mostrar tarea fija sin completar mediante texto
// Falta por implementar el backend, accesibilidad y añadir imagen: hecho.png a carpeta img

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class TaskEnd extends Component  {
  constructor(props){
    super(props);
  }

  render() {
      changeScreenOrientation();
      return (
        <View style={styles.container}>
        {/*Go to prev screen (Boceto 19)*/}
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={{alignSelf: "center"}} onPress={() => navigation.navigate('DailyTask')}>
            <Image source={require('./img/arrowLeft.png')} style={styles.img}/>
          </TouchableOpacity>
        </View>
        
        {/*Title and image of task done*/}
        <View style={styles.box}> 
          <Text style={{fontSize: 60, marginTop: 320, marginBottom: 30,fontWeight: 'bold'}}>Ir a comer
          </Text>
          <Image source={require('./img/hecho.png')} style={{backgroundColor: "#FFC85F", resizeMode: "center", height: 300, width: 300}}/>
        </View>
        
        {/*Bottom banner to go daily task screen (Boceto 18)*/}
        <View style={styles.bottomBanner}>
          <TouchableOpacity style={{alignSelf: "center"}} onPress={() => navigation.navigate('DailyTasks')}>
            <Image source={require('./img/casa.png')} style={styles.img}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TaskEnd;

const styles = StyleSheet.create({
    container: {
      flexDirection: "column-reverse",
      flexWrap: "wrap",
      backgroundColor: '#fffff',
      width: '100%',
      height: '95%',
      alignContent: 'center',
      alignItems: 'center',
    },
    box: {
      width: "85%",
      backgroundColor: '#C5FF7A',
      height: "184%",
      alignItems: 'center',
      justifyContent: 'center'
    },
    arrowContainer: {
      height: '100%',
      width:"15%",
      justifyContent:"center",
      flexDirection: "row",
      backgroundColor:"#FF4F4F"
    },
    infoText: {
      marginTop: 70,
      textAlign: 'center',
      fontSize: 40
    },
    bottomBanner: {
      backgroundColor: '#248aff',
      width: '100%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: -45
    },
    headerText: {
      fontSize: 60,
      marginTop: 200,
      fontWeight: 'bold'
    },
    img: {
      resizeMode: "center",
      height: 100,
      width: 100
    }
  });