import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}
  
class login extends Component {
  constructor(props) {
    super(props);
    this.state = { choosingStudent: false, studentChosen1: false, studentChosen2: false, studentChosen3: false, studentChosen4: false, entering: false};
  }

  chooseStudent = () => {
    this.setState({
      choosingStudent: true
    });
  };

  selectStudent1 = () => {
    this.setState({
      studentChosen1: true,
      choosingStudent: false
    });
  };

  selectStudent2 = () => {
    this.setState({
      studentChosen2: true,
      choosingStudent: false
    });
  };

  selectStudent3 = () => {
    this.setState({
      studentChosen3: true,
      choosingStudent: false
    });
  };

  selectStudent4 = () => {
    this.setState({
      studentChosen4: true,
      choosingStudent: false
    });
  };

  enter = () => {
    if (this.state.studentChosen1 || this.state.studentChosen2 || this.state.studentChosen3 || this.state.studentChosen4) {
      this.setState({
        entering: true
      });
    }
  };

  choosingStudentView(){
    return (
      <View style={styles.choosingView}>
        <TouchableOpacity style={styles.choosingButton1} onPress={this.selectStudent1}>
          <Text style={styles.buttonText}>ALUMNO 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choosingButton2} onPress={this.selectStudent2}>
          <Text style={styles.buttonText}>ALUMNO 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choosingButton3} onPress={this.selectStudent3}>
          <Text style={styles.buttonText}>ALUMNO 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choosingButton4} onPress={this.selectStudent4}>
          <Text style={styles.buttonText}>ALUMNO 4</Text>
        </TouchableOpacity>
      </View>
    );
  } 

  enteringView(){
    this
    return (
      <View style={styles.buttonChoose}>
        <Text style={styles.buttonText}>ENTRANDO</Text>
      </View>
    );
  }

  chooseStudentView(){
    return(
      <View style={styles.buttonChoose}>
        <TouchableOpacity style={styles.buttonChoose} onPress={this.chooseStudent}>
          <Text style={styles.buttonText}>ELEGIR</Text>
          <Text style={styles.buttonText}>ALUMNO</Text>
        </TouchableOpacity>
      </View>
    )
  }

  studentChosenView(num){
    return(
      <View style={styles.buttonChoose}>
        <TouchableOpacity style={styles.buttonChoose}>
          <Text style={styles.buttonText}>ALUMNO {num}{"\n"}ELEGIDO</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  render(){
    const { choosingStudent, studentChosen1, studentChosen2, studentChosen3, studentChosen4, entering } = this.state;
    changeScreenOrientation();
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ENTRAR">ENTRAR</Text>
        </SafeAreaView>
        {!choosingStudent && !(studentChosen1 || studentChosen2 || studentChosen3 || studentChosen4)? this.chooseStudentView() : null}
        {choosingStudent? this.choosingStudentView() : null}
        {studentChosen1? this.studentChosenView("1") : null}
        {studentChosen2? this.studentChosenView("2") : null}
        {studentChosen3? this.studentChosenView("3") : null}
        {studentChosen4? this.studentChosenView("4") : null}
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonView} onPress={() => this.props.navigation.navigate('Test') }>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
        {entering && (studentChosen1 || studentChosen2 || studentChosen3 || studentChosen4)? null : null}
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default login;