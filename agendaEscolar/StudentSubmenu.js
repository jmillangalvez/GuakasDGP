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
                    <Text style={styles.headerText} value="StudentSubmenu" accessibilityRole="header">Submenu Usuarios</Text>
                </SafeAreaView>

                <View style={styles.goBackView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminMain')}>
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fixToText}>
                    {/* Ir al menu de estudiantes (Boceto 5) */}
                    <View style={styles.enterButtonView}>
                        <TouchableOpacity
                            accessibilityLabel="Añadir estudiante"
                            accessibilityRole="button"
                            accessibilityHint="Añade a un estudiante"
                            onPress={() => this.props.navigation.navigate('AddStudent')}>
                            <Text style={styles.loginAdminText}>Añadir estudiante</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleView}>
                    </View>

                    {/* Ir al menu de tareas (Boceto 11)*/}
                    <View style={styles.enterButtonView}>
                        <TouchableOpacity
                            accessibilityLabel="Añadir educador"
                            accessibilityRole="button"
                            accessibilityHint="Añade un educador"
                            onPress={() => this.props.navigation.navigate('AddTeacher')}>
                            <Text style={styles.loginAdminText}>Añadir educador</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.fixToText}>
                    {/* Ir al menu de estudiantes (Boceto 5) */}
                    <View style={styles.enterButtonDownView}>
                        <TouchableOpacity
                            accessibilityLabel="Modificar estudiante"
                            accessibilityRole="button"
                            accessibilityHint="Modificar datos de un estudiante"
                            onPress={() => this.props.navigation.navigate('ModifyStudentList')}>
                            <Text style={styles.loginAdminText}> Modificar</Text>
                            <Text style={styles.loginAdminText}>estudiante</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleView}>
                    </View>

                    {/* Ir al menu de tareas (Boceto 11)*/}
                    <View style={styles.enterButtonDownView}>
                        <TouchableOpacity
                            accessibilityLabel="Modificar educador"
                            accessibilityRole="button"
                            accessibilityHint="Modificar datos de un educador"
                            onPress={() => this.props.navigation.navigate('ModifyTeacherList')}>
                            <Text style={styles.loginAdminText}>Modificar</Text>
                            <Text style={styles.loginAdminText}>educador</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default StudentSubmenu;