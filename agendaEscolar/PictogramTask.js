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
        this.state = { task: '', pictogramTitle: '', pictogramDescription: [], currentPicto: 0 };
    };

    async getTask() {
        try {
          const response = await fetch('http://localhost:8000/api/v1/tasks/' + this.props.route.params.task.idTask  + '/', {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          this.setState({ task: json.item });
          let description = (json.item['pictogramDescription']).split(",")
          description.pop()
          this.setState({ pictogramDescription: description, pictogramTitle: json.item['pictogramTitle'] });
        } catch (error) {
          console.log(error);
        }
    }


    async modifyTask() {
        let url = 'http://localhost:8000/api/v1/assignedTasks/' + this.props.route.params.task.idTask + '/'
        try {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: 1,
            })
        });
        } catch (error) {
        console.log(error);
        }
    }

    completeTask = () => {
        this.props.navigation.navigate('DailyTasks');
    }

    componentDidMount(){
        this.getTask();
    }

    listPicto() {

        if (this.state.currentPicto < this.state.pictogramDescription.length) {
            let image = require('./data/imagenesTareas/' + this.state.pictogramDescription[this.state.currentPicto])
            return (
                <Image
                    source={image}
                    style={styles.pictogram}
                />
            );
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
        let pictogramTitle = require('./data/imagenesTareas/microondas.png')
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                <Image
                            source={pictogramTitle}
                            style={{ height: '100px', width: '100px' }}
                        />
                </SafeAreaView>

                {this.state.currentPicto < 1 ? null : <SafeAreaView style={[styles.sideBanner, { left: 0 }]}>
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

                {this.state.currentPicto < this.state.pictogramDescription.length ? <SafeAreaView style={styles.sideBanner}>
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
                </SafeAreaView> :
                <SafeAreaView style={styles.sideBannerLast}> 
                <TouchableOpacity
                        accessibilityLabel="Siguiente pictograma"
                        accessibilityRole="button"
                        accessibilityHint="Pasa al siguiente pictograma que describe la tarea"
                        onPress={this.completeTask}>
                        <Image
                            source={require('./img/si.png')}
                            style={{ height: '100px', width: '100px' }}
                        />
                    </TouchableOpacity>
                </SafeAreaView> }

                <SafeAreaView style={styles.bottomBanner}>
                <View style={styles.fixToText}>
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
                        <TouchableOpacity
                            accessibilityLabel="Volver al inicio"
                            accessibilityRole="button"
                            accessibilityHint="Vuelve al menú de inicio"
                            onPress={() => this.props.navigation.navigate('WeeklyStats')}>
                            <Image
                                source={require('./img/grafica.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    };
}

export default PictogramTask;