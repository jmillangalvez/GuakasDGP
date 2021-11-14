import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class DailyTasks extends Component {
    constructor(props) {
        super(props);
        const data = require('./data/tasks.json');
        this.state = { tasks: data.tasks, currentTask: 0, currentName: "" };
        this.state.currentName = this.state.tasks[0].name;
    };

    listTask = () => {
        return(
            <TouchableOpacity style={styles.buttonView} onPress={() => this.props.navigation.navigate('Login') }>
                <Text style={styles.buttonText}>{this.state.currentName}</Text>
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
                <View style={styles.enterButtonView}>
                    <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.prevTask() }>
                        <Image
                            style={styles.image}
                            source={require('./img/arrowLeft.png')}
                            accessibilityLabel="Pasar hacia la izquierda"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.enterButtonView}>
                    { this.listTask() }
                </View>
                <View style={styles.enterButtonView}>
                    <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.nextTask() }>
                        <Image
                            style={styles.image}
                            source={require('./img/arrowRight.png')}
                            accessibilityLabel="Pasar hacia la derecha"
                        />
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    };
}

export default DailyTasks;