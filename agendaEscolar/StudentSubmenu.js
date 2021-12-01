import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Text, SafeAreaView, TouchableOpacity, View, Image, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class StudentSubmenu extends Component{
    constructor(props) {
        super(props);
    };
 
    render(){
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="StudentSubmenu" accessibilityRole="header">Submenu Estudiante</Text>
                </SafeAreaView>

                <View style={styles.goBackView}>
                    <Button 
                        title="Volver"
                        accessibilityLabel="Volver"
                        accessibilityRole="button"
                        accessibilityHint="Vuelve al menú del administrador"
                        color="#bcbcbc"
                        onPress={() => this.props.navigation.navigate('AdminMain')}
                    />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity
                        accessibilityLabel="Añadir estudiante"
                        accessibilityRole="button"
                        accessibilityHint="Añade a un estudiante"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('AddStudent')}>
                        <Text style={styles.buttonText}>Añadir{"\n"} estudiante</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Añadir educador"
                        accessibilityRole="button"
                        accessibilityHint="Añade un educador"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('AddTeacher')}>
                        <Text style={styles.buttonText}>Añadir{"\n"} educador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Modificar estudiante"
                        accessibilityRole="button"
                        accessibilityHint="Modificar datos de un estudiante"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('ModifyStudentList')}>
                        <Text style={styles.buttonText}>Modificar{"\n"} estudiante</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Modificar educador"
                        accessibilityRole="button"
                        accessibilityHint="Modificar datos de un educador"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('ModifyTeacherList')}>
                        <Text style={styles.buttonText}>Modificar{"\n"} educador</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default StudentSubmenu;