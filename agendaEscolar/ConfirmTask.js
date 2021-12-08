import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class ConfirmTask extends Component{
    constructor(props) {
        super(props);
        this.state= { task: this.props.route.params.task};
    };
 
    render(){
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="TaskSubmenu" accessibilityRole="header">Confirmar Tarea</Text>
                </SafeAreaView>

                <View style={styles.goBackView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EducatorMain')}>
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fixToText}>
                    {/* Ir al menu de estudiantes (Boceto 5) */}
                    <View style={styles.taskConfirmBox}>
                        <TouchableOpacity
                            accessibilityLabel="Añadir educador"
                            accessibilityRole="button"
                            accessibilityHint="Añade un educador"
                            onPress={() => this.props.navigation.navigate('CreateCommandTask')}>
                            <Image source={require('./img/hecho.png')} style={{resizeMode: "center", height: 300, width: 300}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleView}>
                    </View>
                    {/* Ir al menu de tareas (Boceto 11)*/}
                    <View style={styles.taskConfirmBox}>
                        <TouchableOpacity
                            accessibilityLabel="Añadir educador"
                            accessibilityRole="button"
                            accessibilityHint="Añade un educador"
                            onPress={() => this.props.navigation.navigate('CreateCommandTask')}>
                            <Image source={require('./img/medal.png')} style={{resizeMode: "center", height: 300, width: 300}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleView}>
                    </View>
                    {/* Ir al menu de estudiantes (Boceto 5) */}
                    <View style={styles.taskConfirmBox}>
                        <TouchableOpacity
                            accessibilityLabel="Añadir educador"
                            accessibilityRole="button"
                            accessibilityHint="Añade un educador"
                            onPress={() => this.props.navigation.navigate('CreateCommandTask')}>
                            <Image source={require('./img/no_hecho.png')} style={{resizeMode: "center", height: 300, width: 300}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default ConfirmTask;