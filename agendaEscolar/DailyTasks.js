import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class DailyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], currentTask: 0, currentTitle: "" };
        this.componentDidMount;
    };

    async getTasks() {
        console.log("Dentro del getTasks");
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
            console.log("json"+json.items);
            this.setState({ tasks: json.items.filter(function(task){
                if (task.finished == 0) return task;
            }) });
            this.setState({ currentTitle: this.state.tasks[0].title });
        } catch (error) {
            console.log("Error en getTasks "+error);
        }
    }

    componentDidMount(){
        console.log("Inicializando Valores:");
        this.getTasks();
        console.log(this.state.tasks);
    }

    listTask = () => {
        return(
            <TouchableOpacity 
                style={styles.choosingbutton} 
                onPress={ () => this.props.navigation.navigate('InfoTask', {
                    task: this.state.tasks[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>{this.state.currentTitle}</Text>
            </TouchableOpacity>
        );
    };

    nextTask = () => {
        this.state.currentTask++;
        this.state.currentTask %= this.state.tasks.length;
        this.setState({ currentTitle: this.state.tasks[this.state.currentTask].title });
        this.listTask();
    };

    prevTask = () => {
        this.state.currentTask--;
        if (this.state.currentTask < 0) this.state.currentTask += this.state.tasks.length;
        this.setState({ currentTitle: this.state.tasks[this.state.currentTask].title });
        this.listTask();
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="TAREAS DIARIAS">TAREAS DIARIAS</Text>
                </SafeAreaView>
                <View style={[styles.dailyTaskView, {flexDirection: "row"}]}>
                    
                    <TouchableOpacity
                        style={styles.arrowButtonDailyTasks} 
                        onPress={() => this.prevTask() }
                        accessibilityLabel="Tarea Anterior"
                        accessibilityRole="button"
                        accessibilityHint="Muestra la tarea anterior sin completar del día"
                        >
                        <Image
                            style={styles.image}
                            source={require('./img/arrowLeft.png')}
                        />
                    </TouchableOpacity>

                    
                    { this.listTask() }

     
                    <TouchableOpacity 
                        style={styles.arrowButtonDailyTasks} 
                        onPress={() => this.nextTask() }
                        accessibilityLabel="Tarea Siguiente"
                        accessibilityRole="button"
                        accessibilityHint="Muestra la siguiente tarea sin completar del día"
                        >
                        <Image
                            style={styles.image}
                            source={require('./img/arrowRight.png')}
                        />
                    </TouchableOpacity>
                    
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

export default DailyTasks;