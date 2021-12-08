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
        this.state = { tasks: [], assigneds: [], currentTask: 0, currentTitle: "", idStudent: 8 };
    };

    async getAssigneds() {
        try {
            const response = await fetch('http://localhost:8000/api/v1/assignedTasks/', {
                method: 'GET',
                mode: 'cors',
                headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          this.setState({assigneds: json.items});
          
        } catch (error) {
          console.log(error);
        }
    }

    async getTasks() {
        try {
          const response = await fetch('http://localhost:8000/api/v1/tasks/', {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          this.setState({tasks: json.items});
          const taskUncompleted = []
            this.state.assigneds.forEach(task => {
                if (task.completed == 0) taskUncompleted.push(task);
            });
            const auxIdStudent = this.state.idStudent
            const taskStudent = this.state.assigneds.filter(function(task){
                if (task.idStudent == auxIdStudent) return task;
            });
            this.setState({assigneds: taskStudent});
            console.log(this.state.idStudent)
            console.log(taskUncompleted)
            console.log(taskStudent)
            const finalTasks = [];
            taskUncompleted.forEach(elementTaskUncompleted => {
                this.state.assigneds.forEach(elementAssigneds => {
                    if (elementAssigneds.taskId == elementTaskUncompleted.taskId) finalTasks.push(elementTaskUncompleted);
                })
            });         
            this.setState({ tasks: finalTasks });
            this.setState({ currentTitle: this.state.tasks[0].title });
            console.log(this.state.currentTitle)
        } catch (error) {
          console.log(error);
        }
    }

    componentDidMount(){
        this.getAssigneds();
        this.getTasks();
    }

    getNotCompleted(){
        const taskUncompleted = []
        this.state.assigneds.forEach(task => {
            if (task.completed == 0) taskUncompleted.push(task);
        });
        console.log(taskUncompleted)
        console.log(this.state.assigneds)
        const taskStudent = this.state.assigneds.filter(function(task){
            if (task.idStudent == this.state.idStudent) return task;
        });
        console.log(taskStudent)
        this.setState({assigneds: taskStudent});
        const finalTasks = [];
        taskUncompleted.forEach(elementTaskUncompleted => {
            this.state.assigneds.forEach(elementAssigneds => {
                if (elementAssigneds.taskId == elementTaskUncompleted.taskId) finalTasks.push(elementTaskUncompleted);
            })
        });         
        this.setState({ tasks: finalTasks });
        console.log(finalTasks)
        //this.setState({ currentTitle: this.state.tasks[0].title });
    }

    listTask = () => {
        return(
            <TouchableOpacity 
                style={styles.taskButton} 
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
        if (this.state.tasks.length > 1) {
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
                            accessibilityLabel="Volver al inicio"
                            accessibilityRole="button"
                            accessibilityHint="Vuelve al menú de inicio"
                            onPress={() => this.props.navigation.navigate('DailyTasks')}>
                            <Image
                                source={require('./img/casa.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }

        else if (this.state.tasks.length == 1) {
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} value="TAREAS DIARIAS">TAREAS DIARIAS</Text>
                    </SafeAreaView>
                    <View style={styles.dailyTaskView}>
                        
                        { this.listTask() }
                        
                    </View>
                    <SafeAreaView style={styles.bottomBanner}>
                        <TouchableOpacity
                            accessibilityLabel="Volver al inicio"
                            accessibilityRole="button"
                            accessibilityHint="Vuelve al menú de inicio"
                            onPress={() => this.props.navigation.navigate('DailyTasks')}>
                            <Image
                                source={require('./img/casa.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }

        else{
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} value="TAREAS DIARIAS">TAREAS DIARIAS</Text>
                    </SafeAreaView>
                    <View style={styles.dailyTaskView}>
                        <Text style={styles.dailyTaks}>No te quedan tareas por realizar.</Text>
                        <Text style={styles.dailyTaks}>!Buen trabajo!</Text>
                    </View>
                    <SafeAreaView style={styles.bottomBanner}>
                        <TouchableOpacity
                            accessibilityLabel="Volver al inicio"
                            accessibilityRole="button"
                            accessibilityHint="Vuelve al menú de inicio"
                            onPress={() => this.props.navigation.navigate('DailyTasks')}>
                            <Image
                                source={require('./img/casa.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }
    };
}

export default DailyTasks;