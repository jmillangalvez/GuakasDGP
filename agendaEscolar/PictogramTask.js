import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class PictogramTask extends Component {
    constructor(props) {
        super(props);
        const data = require('./data/tasks.json');
        const allTasks = data.tasks;
        this.state = { tasks: {}, currentTask: 0, currentName: "", pictograms: {}, currentPicto: 1 };
        this.state.tasks = allTasks.filter(function (task) {
            if (!task.completed) return task;
        });
        this.state.currentName = this.state.tasks[this.state.currentTask].name;
        this.state.pictograms = this.state.tasks[this.state.currentTask].pictograms;
    };

    listPicto() {

        if (this.state.currentPicto < this.state.pictograms.length) {

        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DailyTasks')}
                    accessibilityLabel="Pictograma para finalizar tarea"
                    accessibilityRole="button"
                    accessibilityHint="Finaliza la tarea y vuelve al inicio"
                >
                    <Image
                        source={require(`./img/si.png`)}
                        style={styles.pictogram}
                    />
                </TouchableOpacity>
            );
        }

    };

    prevPicto = () => {
        const prev = this.state.currentPicto - 1;
        this.setState({ currentPicto: prev });
        this.listPicto();
    };

    nextPicto = () => {
        const next = this.state.currentPicto + 1;

        this.setState({ currentPicto: next });
        this.listPicto();
    };

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>

                </SafeAreaView>

                {this.state.currentPicto <= 1 ? null : <SafeAreaView style={[styles.sideBanner, { left: 0 }]}>
                    <TouchableOpacity
                        onPress={() => this.prevPicto()}
                        accessibilityLabel="Anterior pictograma"
                        accessibilityRole="button"
                        accessibilityHint="Vuelve al anterior pictograma que describe la tarea"
                    >
                        <Image
                            source={require('./img/arrowLeft.png')}
                            style={{ height: '100px', width: '100px' }}
                        />
                    </TouchableOpacity>
                </SafeAreaView>}

                {this.listPicto()}

                {this.state.currentPicto < this.state.pictograms.length ? <SafeAreaView style={styles.sideBanner}>
                    <TouchableOpacity
                        accessibilityLabel="Siguiente pictograma"
                        accessibilityRole="button"
                        accessibilityHint="Pasa al siguiente pictograma que describe la tarea"
                        onPress={() => this.nextPicto()}>
                        <Image
                            source={require('./img/arrowRight.png')}
                            style={{ height: '100px', width: '100px' }}
                        />
                    </TouchableOpacity>
                </SafeAreaView> : null}

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
            </View>
        );
    };
}

export default PictogramTask;