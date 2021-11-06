import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { choosingStudent: false, studentChosen: false, entering: false};
  }

  chooseStudent = () => {
    this.setState({
      choosingStudent: true
    });
  };

  selectStudent = () => {
    this.setState({
      studentChosen: true,
      choosingStudent: false
    });
  };

  enter = () => {
    if (this.state.studentChosen) {
      this.setState({
        entering: true
      });
    }
  };

  choosingStudentView(){
    return (
      <View style={styles.buttonChoose}>
        <TouchableOpacity style={styles.buttonChoose} onPress={this.selectStudent}>
          <Text style={styles.buttonText}>ALUMNO 1</Text>
        </TouchableOpacity>
      </View>
    );
  }

  enteringView(){
    return (
      <View style={styles.buttonChoose}>
        <Text style={styles.buttonText}>ENTRANDO</Text>
      </View>
    );
  }

  chooseStudentButton(){
    return(
      <TouchableOpacity style={styles.buttonChoose} onPress={this.chooseStudent}>
        <Text style={styles.buttonText}>ELEGIR</Text>
        <Text style={styles.buttonText}>ALUMNO</Text>
      </TouchableOpacity>
    )
  }

  studentChosenText(){
    return(
      <Text style={styles.buttonText}>ALUMNO{"\n"}ELEGIDO</Text>
    )
  }

  render() {
    const { choosingStudent, studentChosen, entering } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ENTRAR">ENTRAR</Text>
        </SafeAreaView>
        <View style={styles.buttonChoose}>
          {studentChosen? this.studentChosenText() : this.chooseStudentButton()}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonView} onPress={this.enter}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
        {choosingStudent? this.choosingStudentView() : null}
        {entering && studentChosen? this.enteringView() : null}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#248aff',
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  buttonView: {
    width: 250,
    height: 70,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChoose: {
    width: 150,
    height: 150,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  choosingStudentView: {
    width: 250,
    height: 70,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;