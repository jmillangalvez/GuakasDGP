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
        const data = require('./data/tasks.json');
        const allTasks = data.tasks;
        this.state = { tasks: {}, currentTask: 0, currentName: "" };
        this.state.tasks = allTasks.filter(function(task){
            if (!task.completed) return task;
        });
        this.state.currentName = this.state.tasks[0].name;
    };

    listTask = () => {
        return(
            <TouchableOpacity 
                style={styles.choosingButton} 
                onPress={ () => this.props.navigation.navigate('Login') }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>{this.state.currentName}</Text>
                <input type="hidden" name="taskId" value={this.state.tasks[this.state.currentTask].id} />
            </TouchableOpacity>
        );
    };

    nextTask = () => {
        this.state.currentTask++;
        this.state.currentTask %= this.state.tasks.length;
        this.setState({ currentName: this.state.tasks[this.state.currentTask].name });
        this.listTask();
    };

    prevTask = () => {
        this.state.currentTask--;
        if (this.state.currentTask < 0) this.state.currentTask += this.state.tasks.length;
        this.setState({ currentName: this.state.tasks[this.state.currentTask].name });
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