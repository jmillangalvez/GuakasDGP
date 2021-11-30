import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Text, SafeAreaView, TouchableOpacity, View, Image, Button } from 'react-native';
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
                        onPress={() => this.props.navigation.navigate('CreateNormalTask')}>
                        <Text style={styles.buttonText}>Añadir tarea fija</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Añadir educador"
                        accessibilityRole="button"
                        accessibilityHint="Añade un educador"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('CreateCommandTask')}>
                        <Text style={styles.buttonText}>Añadir comanda comedor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Modificar estudiante"
                        accessibilityRole="button"
                        accessibilityHint="Modificar datos de un estudiante"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('ModifyNormalTask')}>
                        <Text style={styles.buttonText}>Modificar tarea fija</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="Modificar educador"
                        accessibilityRole="button"
                        accessibilityHint="Modificar datos de un educador"
                        style={styles.buttonTouch} 
                        onPress={() => this.props.navigation.navigate('ModifyCommandTask')}>
                        <Text style={styles.buttonText}>Modificar comanda comedor</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TaskSubmenu;