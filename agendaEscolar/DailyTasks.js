import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class DailyTasks extends Component {
    constructor(props) {
        super(props);
        const data = require('./tasks.json');
        this.state = { tasks: data.tasks, currentTask: 0, currentDescription: "" };
        this.state.currentDescription = this.state.tasks[0].description;
    };

    listTask = () => {
        return(
            <TouchableOpacity style={styles.buttonView} onPress={() => this.props.navigation.navigate('Login') }>
                <Text style={styles.buttonText}>{this.state.currentDescription}</Text>
                <input type="hidden" name="taskId" value={this.state.tasks[this.state.currentTask].id} />
            </TouchableOpacity>
        );
    };

    nextTask = () => {
        this.state.currentTask++;
        this.state.currentTask %= this.state.tasks.length;
        this.setState({ currentDescription: this.state.tasks[this.state.currentTask].description });
        this.listTask();
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="TAREAS DIARIAS">TAREAS DIARIAS</Text>
                </SafeAreaView>
                <View style={styles.buttonView}>
                    { this.listTask() }
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonView} onPress={() => this.nextTask() }>
                        <Text style={styles.buttonText}>SIGUIENTE</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default DailyTasks;