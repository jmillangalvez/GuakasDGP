import React, {Component} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class TaskBegin extends Component  {
  constructor(props){
    super(props);
    this.state= { title: props.route.params.task.title , description: props.route.params.task.description };
    console.log(this.state);
  }

  render() {
      const {title, description} = this.state;
      changeScreenOrientation();
      return (
        <View style={styles.container}>
          {/*Title and description of the task*/}
          <View style={styles.box}> 
            <Text style={styles.headerText}>{title}
            </Text>
            <Text style={styles.infoText}>{description}
            </Text>
          </View>
    
          <View style={styles.arrowContainer}>
            <TouchableOpacity style={{alignSelf: "center"}} onPress={() => this.props.navigation.navigate('TaskEnd', {title})}>
              <Image source={require('./img/arrowRight.png')} style={styles.img}/>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBanner}>
            <TouchableOpacity style={{alignSelf: "center"}} onPress={() => this.props.navigation.navigate('DailyTasks')}>
              <Image source={require('./img/casa.png')} style={styles.img}/>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

export default TaskBegin;

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