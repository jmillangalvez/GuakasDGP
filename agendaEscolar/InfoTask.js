import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class InfoTask extends Component {
    constructor(props) {
        super(props);
        this.state = { task: props.route.params.task };
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value={this.state.task.name} accesibilityRole="header">{this.state.task.title}</Text>
                </SafeAreaView>
                <View 
                    style={styles.dailyTaskView}
                    accessibilityLabel="Tarea seleccionada"
                    accessibilityRole="button"
                    accessibilityHint="Pulsa para mostrar la tarea"
                    >
                    <Text style={styles.dailyTaks}>{this.state.task.description}</Text>
                    
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

export default InfoTask;