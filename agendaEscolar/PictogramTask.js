import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

// Tarea -> Titulo y descripcion
// Estudiante -> tipo accesibilidad
// Asignado -> idAssignedTask

class PictogramTask extends Component {
    constructor(props) {
        super(props);
        this.state = { currentTask: 0, currentName: "", pictograms: {}, currentPicto: 1, title: "", titlePic: "init.png",
                       description: "", descriptionPic: "init.png", assigned: "", listDes: [], listDesPic: [], task: props.route.params.task,
                       assigned: props.route.params.assigned, tipoAcc: props.route.params.tipoAcc};
    };

    getTasks() {
        this.setState({title: this.state.task.title});
        this.setState({titlePic: this.state.task.pictogramTitle});
        this.setState({description: this.state.task.description});
        this.setState({descriptionPic: this.state.task.pictogramDescription});
        this.setState({listDes: this.state.task.description.split(",")});
        this.setState({listDesPic: this.state.task.pictogramDescription.split(",")});
        this.setState({currentName: this.state.listDes[0]});
    }

    async modifyAssignedTask() {
        let url = 'http://localhost:8000/api/v1/assignedTasks/' + this.state.assigned.idAssignedTask + '/'
        try {
          const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTask: this.state.assigned.idTask,
                idStudent: this.state.assigned.idStudent,
                idEducator: this.state.assigned.idEducator,
                priority: this.state.assigned.priority,
                assignedDate: this.state.assigned.assignedDate,
                completedDate: this.state.assigned.assignedDate,
                completed: 1,
            })
          });
        } catch (error) {
          console.log(error);
        }
      }

    completarTarea = () => {
        this.modifyAssignedTask();
        this.props.navigation.navigate('DailyTasks')
    }

    listPicto() {
        if(this.state.tipoAcc == 1){
            if (this.state.currentPicto < this.state.listDes.length) {
                return (
                    <SafeAreaView style={styles.pictoSafeArea}> 
                        <Text style={styles.taskText}>{this.state.listDes[this.state.currentPicto-1]}</Text>
                    </SafeAreaView>
                );
            }
        }else if(this.state.tipoAcc == 2){
            if (this.state.currentPicto < this.state.listDesPic.length) {
                let nom = this.state.listDesPic[this.state.currentPicto-1];
                let image = require('./data/imagenesTareas/'+nom)
                return (
                    <Image
                        source={image}
                        style={styles.pictogram}
                    />
                );
            }
        }else{
            if (this.state.currentPicto < this.state.listDesPic.length) {
                let nom = this.state.listDesPic[this.state.currentPicto-1];
                let image = require('./data/imagenesTareas/'+nom)
                return (
                    <SafeAreaView style={styles.pictoSafeArea2}> 
                        <Image
                            source={image}
                            style={styles.pictogram2}
                        />
                        <Text style={styles.taskText}>{this.state.listDes[this.state.currentPicto-1]}</Text>
                    </SafeAreaView>
                );
            }
        }
    };

    componentDidMount(){
        this.getTasks();
    }

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

    getTitle(){
        if(this.state.tipoAcc == 1){
            return(
                <Text style={styles.headerText}>{this.state.title}</Text>
            )
        }else if(this.state.tipoAcc == 2){
            let nom = this.state.titlePic;
            let image = require('./data/imagenesTareas/'+nom)
            return(
                <Image
                    source={image}
                    style={{ height: '100px', width: '100px' }}
                />
            )
        }else{
            let nom = this.state.titlePic;
            let image = require('./data/imagenesTareas/'+nom)
            return(
                <View style={{ 
                    alignItems: 'center',
                    justifyContent: 'center', }}>
                    <Image
                        source={image}
                        style={{ height: '75px', width: '75px' }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.title}</Text>
                </View>
            )
        }
    }

    getBackSideBanner(){
        return(
            <SafeAreaView style={[styles.sideBanner, { left: 0 }]}>
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
            </SafeAreaView>
        )
        
    }

    getNextSideBanner(){
        return(
            <SafeAreaView style={styles.sideBanner}>
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
            </SafeAreaView>
        )
    }

    getLastSideBanner(){
        return(
            <SafeAreaView style={styles.sideBannerLast}> 
                <TouchableOpacity
                    accessibilityLabel="Siguiente pictograma"
                    accessibilityRole="button"
                    accessibilityHint="Pasa al siguiente pictograma que describe la tarea"
                    onPress={this.completarTarea}>
                    <Image
                        source={require('./img/si.png')}
                        style={{ height: '100px', width: '100px' }}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    render() {
        changeScreenOrientation();
        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    {this.getTitle()}
                </SafeAreaView>

                {this.state.currentPicto <= 1 ? null : this.getBackSideBanner()}

                {this.listPicto()}

                {this.state.currentPicto < this.state.listDesPic.length-1 ? this.getNextSideBanner(): this.getLastSideBanner() }

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