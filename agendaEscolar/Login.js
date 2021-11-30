import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}
  
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { choosingStudent: false, studentsRow: 0, idStudentChosen: -1, data: [], nStudents: 0};
    this.students = require('./data/students.json');
  }
  
  async getStudents() {
    try {
      const response = await fetch('http://localhost:8000/api/students/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({ data: json.items });
      this.setState({ nStudents: json.count });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getStudents();
  }

  chooseStudent = () => {
    this.setState({
      choosingStudent: true
    });
  };

  selectStudent(i){
    this.setState({
      idStudentChosen: i,
      choosingStudent: false
    });
  }

  addStudents(){
    console.log(this.state.data)
    var students = [];
    console.log(this.state.studentsRow);
    var nStudentsInRow = 4;
    if((this.state.data.length - ((this.state.studentsRow + 1) * 4)) < 0){
      nStudentsInRow = (this.state.data.length % 4);
    }
    console.log(nStudentsInRow)
    for (let i = 0 + (4*this.state.studentsRow), cont=0; cont < nStudentsInRow ; i++, cont++) {
      students.push(
      <TouchableOpacity style={styles.choosingButton} onPress={() => this.selectStudent(i)}>
        <Text style={styles.buttonText}>{this.state.data[i].name}</Text>
      </TouchableOpacity>);
    }

    return students;
  };

  downStudentsRow = () => {
    if(this.state.studentsRow > 0){
      this.setState({
        studentsRow: this.state.studentsRow - 1
      });
    }
  };

  upStudentsRow = () => {
    if(this.state.studentsRow + 1 < this.students.info.length/4){
      this.setState({
        studentsRow: this.state.studentsRow + 1
      });
    }
  };

  choosingStudentView(){
    return (
      <View style={[styles.choosingView, {flexDirection: "row"}]}>
        <TouchableOpacity style={styles.arrowButton} onPress={this.downStudentsRow}>
          <Image
            style={styles.image}
            source={require('./img/arrowLeft.png')}
            accessibilityLabel="Pasar hacia la izquierda"
          />
        </TouchableOpacity>
        {this.addStudents()}
        <TouchableOpacity style={styles.arrowButton} onPress={this.upStudentsRow}>
          <Image
            style={styles.image}
            source={require('./img/arrowRight.png')}
            accessibilityLabel="Pasar hacia la derecha"
          />
        </TouchableOpacity>
      </View>
    );
  }

  chooseStudentView(){
    return(
      <View style={styles.chooseView}>
        <TouchableOpacity style={styles.chooseTouch} onPress={this.chooseStudent}>
          <Image
          style={styles.image}
          source={require('./img/unknow.png')}
          accessibilityLabel="Seleccionar alumno"
          />
        </TouchableOpacity>
      </View>
    )
  }

  studentChosenView(num){
    return(
      <View style={styles.chooseView}>
        <TouchableOpacity style={styles.chooseTouch}>
          <Text style={styles.buttonText}>ALUMNO {num + 1}{"\n"}ELEGIDO</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  render(){
    const { choosingStudent, idStudentChosen } = this.state;
    changeScreenOrientation();
    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ENTRAR">ENTRAR</Text>
        </SafeAreaView>
        {!choosingStudent && idStudentChosen == -1? this.chooseStudentView() : null}
        {choosingStudent? this.choosingStudentView() : null}
        {idStudentChosen != -1? this.studentChosenView(idStudentChosen) : null}
        <View style={styles.enterButtonView}> 
          <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('DailyTasks', {
            idStudent: idStudentChosen
          }) }>
            <Image
            style={styles.image}
            source={require('./img/enter.png')}
            accessibilityLabel="Entrar en la aplicacion"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.loginAdminView}> 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginAdmin') }>
            <Text style={styles.loginAdminText}>Login Admin/Educador</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default Login;