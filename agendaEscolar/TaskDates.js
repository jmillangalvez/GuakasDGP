import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useRef, useEffect, Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class TaskDates extends Component {
    constructor(props) {
        super(props);
        this.getTareasCompletadas();

        this.state = {  
            tareasCompletadas : [], 
            fechasNormalizadas: [],
            currentTask: 0, 
            currentTitle: "", 
            idStudent: props.route.params.idStudent };
    };

    async getTareasCompletadas() {
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
          this.setState({tareasCompletadas: json.items});
    
          //Saco un array con las fechas que quiere el usuario
          var fechaIni = this.props.route.params.startDate.toISOString().split('T')[0];
          var fechaFin = this.props.route.params.endDate.toISOString().split('T')[0];
    
          const getDatesBetweenDates = (startDate, endDate) => {
            let dates = []
            //to avoid modifying the original date
            const theDate = new Date(startDate)
            while (theDate < endDate) {
              dates = [...dates, new Date(theDate)]
              theDate.setDate(theDate.getDate() + 1)
            }
            dates = [...dates, endDate]
            return dates
          }
    
          //Paso las fechas al formato que deseo
          var fechas = getDatesBetweenDates(new Date(fechaIni), new Date(fechaFin));
          
          for(var i = 0; i < fechas.length; i +=1){
    
            this.state.fechasNormalizadas.push(fechas[i].toISOString().split('T')[0])
            
          }
    
          //Guardo en un array las tareas correspondientes a ese usuario que ha completado
          var idUsuario = this.props.route.params.idStudent;
          var tareasUsuario = []
    
          for(var i = 0; i < this.state.tareasCompletadas.length; i += 1){
    
            if(this.state.tareasCompletadas[i].idStudent == idUsuario && this.state.tareasCompletadas[i].completed == 1){
    
              tareasUsuario.push(this.state.tareasCompletadas[i]);
    
            }
    
          }
    
          var taresIntervalo = []
          //Guardo en un array las tareas correspondientes en el intervalo de tiempo
          for(var i = 0; i < tareasUsuario.length; i += 1){
    
            if(this.state.fechasNormalizadas.includes(tareasUsuario[i].completedDate)){
    
              taresIntervalo.push(tareasUsuario[i]);
    
            }
    
          }
          
          this.setState({ tareasCompletadas : taresIntervalo });

        } catch (error) {
          console.log(error);
        }
      }

    componentDidMount(){
        this.getTareasCompletadas();
    }

    listTask1 = () => {
        return(
            <TouchableOpacity 
                style={styles.taskButton} 
                onPress={ () => this.props.navigation.navigate('InfoTask', {
                    task: this.state.tareasCompletadas[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>Poner el microondas</Text>
            </TouchableOpacity>
        );
    };

    listTask2 = () => {
        return(
            <TouchableOpacity 
                style={styles.taskButton} 
                onPress={ () => this.props.navigation.navigate('PictogramTask', {
                    task: this.state.tareasCompletadas[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Image
                    source={require('./img/comer.png')}
                    style={{ height: '100px', width: '100px' }}
                />
            </TouchableOpacity>
        );
    };

    nextTask = () => {
        this.state.currentTask++;
        this.state.currentTask %= this.state.tareasCompletadas.length;
        this.setState({ currentTitle: this.state.tareasCompletadas[this.state.currentTask].title });
        this.listTask2();
    };

    prevTask = () => {
        this.state.currentTask--;
        if (this.state.currentTask < 0) this.state.currentTask += this.state.tareasCompletadas.length;
        this.setState({ currentTitle: this.state.tareasCompletadas[this.state.currentTask].title });
        this.listTask2();
    };

    render() {
        changeScreenOrientation();
        if (this.state.tareasCompletadas.length > 1) {
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} value="TAREAS EN UN TRAMO">TAREAS EN UN TRAMO</Text>
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

                        
                        {this.state.idStudent == 0? this.listTask1() : this.listTask2()}

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
                            onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.idStudent})}>
                            <Image
                                source={require('./img/grafica.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </View>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }

        else if (this.state.tareasCompletadas.length == 1) {
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} value="TAREAS EN UN TRAMO">TAREAS EN UN TRAMO</Text>
                    </SafeAreaView>
                    <View style={styles.dailyTaskView}>
                        
                        { this.listTask2() }
                        
                    </View>
                    <SafeAreaView style={styles.bottomBanner}>
                    <View style={styles.fixToText}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('DailyTasks')}>
                            <Image
                                source={require('./img/casa.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.idStudent})}>
                            <Image
                                source={require('./img/grafica.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </View>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }

        else{
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} value="TAREAS EN UN TRAMO">TAREAS EN UN TRAMO</Text>
                    </SafeAreaView>
                    <View style={styles.dailyTaskView}>
                        <Text style={styles.dailyTaks}>No has completado ninguna tarea en estos días.</Text>
                        <Text style={styles.dailyTaks}>!Sigue asi!</Text>
                    </View>
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
                            onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.idStudent})}>
                            <Image
                                source={require('./img/grafica.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </TouchableOpacity>
                    </View>
                    </SafeAreaView>
                    <StatusBar style="auto" />
                </View>
            );
        }
    };
}

export default TaskDates;