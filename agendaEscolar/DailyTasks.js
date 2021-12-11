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
        this.state = { tasks: [], tasksId: [], currentTask: 0, currentTitle: "", idStudent: props.route.params.idStudent };
        this.componentDidMount;
    };

    async getAssigneds() {
        try {
            const response = await fetch('http://localhost:8000/assigneds/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const auxIdStudent = this.state.idStudent;
            this.setState({ tasksId: json.items.filter(function(assigned){
                if (assigned.studentId == auxIdStudent) return (assigned.taskId);
            }) });
        } catch (error) {
            console.log("Error en getAssigneds "+error);
        }
    }

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
            const tasksUnifinished = json.items.filter(function(task){
                if (task.finished == 0) return task;
            });
            const finalTasks = [];
            tasksUnifinished.forEach(elementTaskUnfinished => {
                this.state.tasksId.forEach(elementTaskId => {
                    if (elementTaskId.taskId == elementTaskUnfinished.taskId) finalTasks.push(elementTaskUnfinished);
                })
            });         
            this.setState({ tasks: finalTasks });
            this.setState({ currentTitle: this.state.tasks[0].title });
        } catch (error) {
            console.log("Error en getTasks "+error);
        }
    }

    componentDidMount(){
        this.getAssigneds();
        this.getTasks();
    }

    listTask = () => {
        return(
            <TouchableOpacity 
                style={styles.choosingButton} 
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
                    <Text style={styles.headerText} value="TAREAS DIARIAS">PARTE DE ABAJO</Text>
                </SafeAreaView>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default DailyTasks;