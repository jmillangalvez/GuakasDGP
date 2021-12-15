import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class InfoTask extends Component {
    constructor(props) {
        super(props);
        this.state = { task: props.route.params.task, assigned: props.route.params.assigned };
    };

    showCompleted = () => {
        if (this.state.assigned.completed) {
            return(
                <Text style={styles.dailyTaks}>Tarea completada con éxito</Text>
            )
        }
        else {
            return(
                <Text style={styles.dailyTaks}>Tarea sin completar</Text>
            )
        }
    }

    dateCompleted = () => {
        if (this.state.assigned.completed) {
            return(
                <Text style={styles.dailyTaks}>Fecha de compleción: {this.state.assigned.completedDate}</Text>
            )
        }
    }

    render() {
        changeScreenOrientation();
        let nom = this.state.task.pictogramTitle;
        let pictoTitle = require('./data/imagenesTareas/' + nom);
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value={this.state.task.title} accesibilityRole="header">{this.state.task.title}</Text>
                </SafeAreaView>
                <View style={styles.goBackView}>
                    {/* Volver a la pantalla anterior */}
                    <TouchableOpacity 
                    accessibilityLabel="Volver al inicio"
                    accessibilityRole="button"
                    accessibilityHint="Vuelve al menú de inicio del educador"
                    onPress={() => this.props.navigation.navigate('EducatorMain')}>
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                </View>
                <View 
                    style={styles.educatorTaskView}
                    accessibilityLabel="Tarea seleccionada"
                    accessibilityRole="button"
                    accessibilityHint="Pulsa para mostrar la tarea"
                    >
                    <Text style={styles.dailyTaks}>Título de la tarea: {this.state.task.title}</Text>
                    <Text style={styles.dailyTaks}>Descripción de la tarea: {this.state.task.description}</Text>
                    <Text style={styles.dailyTaks}>Fecha de asignación: {this.state.assigned.assignedDate}</Text>
                    { this.showCompleted() }
                    { this.dateCompleted() }
                    <Text style={styles.dailyTaks}>Pictograma principal:</Text>
                    <Image 
                        source={pictoTitle}
                        style={{ height: '100px', width: '100px' }}
                    />
                </View>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default InfoTask;