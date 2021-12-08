import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, ViewPropTypes, Button, TextInput, Picker, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class InfoStockTask extends Component {
    constructor(props) {
        super(props);
        //this.state= {destination:"ALMACEN",item:"CARTULINAS",cant:"3"}
        this.state= { task: props.route.params.task }
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>

                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="AniadirProfesor" accessibilityRole="header">Añadir Estudiante</Text>
                </SafeAreaView>

                <View 
                    style={styles.dailyTaskView}
                    accessibilityLabel="Tarea seleccionada"
                    accessibilityRole="button"
                    accessibilityHint="Pulsa para mostrar la tarea"
                    >
                    <Text style={styles.dailyTaks}>IR A {this.state.task.place} A POR {this.state.task.quantity} {this.state.task.material}</Text>
                    
                </View>
                <SafeAreaView style={styles.bottomBanner}>
                    <TouchableOpacity 
                        onPress={ () => this.props.navigation.navigate('DailyTasks')}
                        accessibilityLabel="Volver al Inicio"
                        accessibilityRole="button"
                        accessibilityHint="Pulsa para volver a la pantalla de Inicio"
                        >
                        <Text style={styles.headerText} value="HOME">HOME</Text>
                    </TouchableOpacity>  
                </SafeAreaView>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default InfoStockTask;