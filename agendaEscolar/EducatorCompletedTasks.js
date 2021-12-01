import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class EducatorCompletedTasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.componentDidMount;
    };

    async getTasks() {
        try {
            const response = await fetch('http://localhost:8000/tasks/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            this.setState({ tasks: json.items.filter(function(task){
                if (task.finished == 1) return task;
            }) });
        } catch (error) {
            console.log("Error en getTasks "+error);
        }
    }

    componentDidMount(){
        this.getTasks();
    }

    listTask = () => {
        var component = [];
        this.state.tasks.forEach(task => {
            component.push(this.showTask(task));
        });
        return component;
    };

    showTask = (task) => {
        return(
            <TouchableOpacity 
                /*
                Debe mandar a la información de la tarea
                onPress={ () => this.props.navigation.navigate('') }*/
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>{task.title}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} accessibilityRole="header" value="TAREAS COMPLETADAS">TAREAS COMPLETADAS</Text>
                </SafeAreaView>
                <View style={styles.dailyTaskView}>
                    
                    { this.listTask() }

                </View>
                <SafeAreaView style={styles.bottomBanner}>
                    <Text style={styles.headerText} value="HOME">PARTE DE ABAJO</Text>
                </SafeAreaView>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default EducatorCompletedTasks;