import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class TaskSubmenu extends Component{
    constructor(props) {
        super(props);
    };
 
    render(){
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="TaskSubmenu" accessibilityRole="header">Submenu Tareas</Text>
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
                            onPress={() => this.props.navigation.navigate('CreateNormalTask')}>
                            <Text style={styles.loginAdminText}>Añadir tarea fija</Text>
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
                            onPress={() => this.props.navigation.navigate('CreateCommandTask')}>
                            <Text style={styles.loginAdminText}>Añadir comanda</Text>
                            <Text style={styles.loginAdminText}>      comedor</Text>
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
                            onPress={() => this.props.navigation.navigate('ModifyNormalTaskList')}>
                            <Text style={styles.loginAdminText}>Modificar tarea</Text>
                            <Text style={styles.loginAdminText}>         fija</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.middleView}>
                    </View>

                    <View style={styles.enterButtonDownView}>
                        <TouchableOpacity
                            accessibilityLabel="Modificar estudiante"
                            accessibilityRole="button"
                            accessibilityHint="Modificar datos de un estudiante"
                            onPress={() => null}>
                            <Text style={styles.loginAdminText}>Modificar tarea</Text>
                            <Text style={styles.loginAdminText}>     comedor</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default TaskSubmenu;