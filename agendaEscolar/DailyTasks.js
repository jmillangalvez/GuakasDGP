import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class DailyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], tasksId: [], currentTask: 0, currentTitle: "default", currentPicto: "init.png", student: props.route.params.student,
                       hasCommandTask: false, dinningTasks: [], today: "" };
        this.getTasks();
        this.getCommandTasks();
    };

    componentWillUnmount() {
        this._unsubscribe();
      }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getTasks();
            this.getCommandTasks();
        });
    }

    async getCommandTasks() {
        try {
          const response = await fetch('http://localhost:8000/api/v1/dinningTasks/', {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          var todayDay = new Date();
          let today = todayDay.getFullYear()+'-'+("0" + (todayDay.getMonth() + 1)).slice(-2)+'-'+("0" + todayDay.getDate()).slice(-2);
          this.setState({dinningTasks: json.items});
          this.setState({today: today});
          this.state.dinningTasks.forEach(din => {
              if(din.idStudent == this.state.student.idStudent && din.date == today){    
                this.setState({hasCommandTask: true});
              }
          });
        } catch (error) {
          console.log(error);
        }
      }

    async getTasks() {
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

            //Guarda los ids de las tareas asignadas al alumno que no están completadas
            const auxIdStudent = this.state.student.idStudent;
            this.setState({ tasksId: json.items.filter(function(assigned){
                if (assigned.idStudent == auxIdStudent && assigned.completed == 0) return (assigned.idTask);
            }) });
            console.log(this.state.tasksId);
        
        } catch (error) {
          console.log(error);
        }

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
            const allTasks = json.items;

            var finalTasks = [];

            /*Filtra de entre todas las tareas, las que se encuentran en el vector filtrado anterior,
            generando un array con las tareas no completadas del alumno*/
            allTasks.forEach(elementTask => {
                this.state.tasksId.forEach(elementId => {
                    if (elementTask.idTask == elementId.idTask) finalTasks.push(elementTask);
                })
            });

            this.setState({ tasks: finalTasks });
            this.setState({ currentTitle: this.state.tasks[this.state.currentTask].title });
            this.setState({ currentPicto: this.state.tasks[this.state.currentTask].pictogramTitle});
            
        } catch (error) {
            console.log(error);
        }        
    }

    //Función que muestra las tareas en modo texto (accesibilidad tipo 1)
    listTask1 = () => {
        return(
            <TouchableOpacity 
                style={styles.taskButton} 
                onPress={ () => this.props.navigation.navigate('PictogramTask', {
                    task: this.state.tasks[this.state.currentTask],
                    tipoAcc: this.state.student.accessibilityType,
                    assigned: this.state.tasksId[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>{this.state.currentTitle}</Text>
            </TouchableOpacity>
        );
    };

    //Función que muestra las tareas en modo pictograma (accesibilidad tipo 2)
    listTask2 = () => {
        let nom = this.state.currentPicto;
        let imagenTarea = require('./data/imagenesTareas/' + nom);

        return(
            <TouchableOpacity 
                style={styles.taskButton} 
                onPress={ () => this.props.navigation.navigate('PictogramTask', {
                    task: this.state.tasks[this.state.currentTask],
                    tipoAcc: this.state.student.accessibilityType,
                    assigned: this.state.tasksId[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Image
                    source={imagenTarea}
                    style={{ height: '100px', width: '100px' }}
                />
            </TouchableOpacity>
        );
    };

    //Función que muestra las tareas en modo pictograma y texto (accesibilidad tipo 3)
    listTask3 = () => {
        let nom = this.state.currentPicto;
        let imagenTarea = require('./data/imagenesTareas/' + nom);

        return(
            <TouchableOpacity 
                style={styles.taskButton} 
                onPress={ () => this.props.navigation.navigate('PictogramTask', {
                    task: this.state.tasks[this.state.currentTask],
                    tipoAcc: this.state.student.accessibilityType,
                    assigned: this.state.tasksId[this.state.currentTask]
                }) }
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Image
                    source={imagenTarea}
                    style={{ height: '100px', width: '100px' }}
                />
                <Text style={styles.dailyTaks}>{this.state.currentTitle}</Text>
            </TouchableOpacity>
        );
    };

    /*Función que cambia la tarea mostrada por la siguiente en la lista
      en caso de ser la última, muestra la primera otra vez, generando el ciclo*/
    nextTask = () => {
        this.state.currentTask++;
        this.state.currentTask %= this.state.tasks.length;

        this.setState({ currentTitle: this.state.tasks[this.state.currentTask].title });
        this.setState({ currentPicto: this.state.tasks[this.state.currentTask].pictogramTitle });

        if (this.state.student.accessibilityType == 1) {
            this.listTask1();
        } else if (this.state.student.accessibilityType == 2) {
            this.listTask2();
        } else if (this.state.student.accessibilityType == 3) {
            this.listTask3();
        }
    };

    /*Función que cambia la tarea mostrada por la anterior en la lista
      en caso de ser la primera, muestra la última, generando el ciclo*/
    prevTask = () => {
        this.state.currentTask--;
        if (this.state.currentTask < 0) this.state.currentTask += this.state.tasks.length;

        this.setState({ currentTitle: this.state.tasks[this.state.currentTask].title });
        this.setState({ currentPicto: this.state.tasks[this.state.currentTask].pictogramTitle });
        
        if (this.state.student.accessibilityType == 1) {
            this.listTask1();
        } else if (this.state.student.accessibilityType == 2) {
            this.listTask2();
        } else if (this.state.student.accessibilityType == 3) {
            this.listTask3();
        }
    };

    getDinningButton(){
        return(
            <TouchableOpacity
                accessibilityLabel="Volver al inicio"
                accessibilityRole="button"
                accessibilityHint="Vuelve al menú de inicio"
                style={{marginLeft: 10, marginRight: 10}}
                onPress={() => this.props.navigation.navigate('FillMenuTask', {date: this.state.today})}>
                <Image
                    source={require('./data/imagenesMenu/menu.png')}
                    style={{ height: '100px', width: '100px' }}
                />
            </TouchableOpacity>
        )
    }

    //Según el número de tareas y el tipo de accesibilidad del niño renderiza una pantalla u otra
    render() {
        changeScreenOrientation();
        //Si el niño tiene más de una tarea pendiente...
        if (this.state.tasks.length > 1) {
            //... y su accesibilidad es de tipo texto (1)
            if (this.state.student.accessibilityType == 1) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
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
    
                            
                            {this.listTask1()}
            
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
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{margin: 20}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo pictograma (2)
            else if (this.state.student.accessibilityType == 2) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
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
    
                            
                            {this.listTask2()}
            
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
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo texto y pitctograma (3)
            else if (this.state.student.accessibilityType == 3) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
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
    
                            
                            {this.listTask3()}
            
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
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
        }
        //Si el niño sólo tiene una tarea pendiente...
        else if (this.state.tasks.length == 1) {
            //... y su accesibilidad es de tipo texto (1)
            if (this.state.student.accessibilityType == 1) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            
                            { this.listTask1() }
                            
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo pictograma (2)
            else if (this.state.student.accessibilityType == 2) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            
                            { this.listTask2() }
                            
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo texto y pitctograma (3)
            else if (this.state.student.accessibilityType == 3) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            
                            { this.listTask3() }
                            
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
        }
        //Si el niño no tiene tareas pendientes...
        else{
            //... y su accesibilidad es de tipo texto (1)
            if (this.state.student.accessibilityType == 1) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            <Text style={styles.dailyTaks}>No te quedan tareas por realizar.</Text>
                            <Text style={styles.dailyTaks}>!Buen trabajo!</Text>
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo pictograma (2)
            else if (this.state.student.accessibilityType == 2) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            <Image
                                source={require('./data/imagenesTareas/darPalmas.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>
                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent} ) }>
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
            //... y su accesibilidad es de tipo texto y pitctograma (3)
            else if (this.state.student.accessibilityType == 3) {
                return (
                    <View style={styles.mainView}>
                        <SafeAreaView style={styles.banner}>
                            <Text style={styles.headerText} value="TAREAS DIARIAS" accesibilityRole="header">TAREAS DIARIAS</Text>
                        </SafeAreaView>
                        <View style={styles.dailyTaskView}>
                            <Image
                                source={require('./data/imagenesTareas/darPalmas.png')}
                                style={{ height: '100px', width: '100px' }}
                            />
                            <Text style={styles.dailyTaks}>No te quedan tareas por realizar.</Text>
                            <Text style={styles.dailyTaks}>!Buen trabajo!</Text>
                        </View>
                        <SafeAreaView style={styles.bottomBanner}>
                        <View style={styles.fixToText}>

                            {this.state.hasCommandTask? this.getDinningButton() : null}
                            <TouchableOpacity
                                accessibilityLabel="Volver al inicio"
                                accessibilityRole="button"
                                accessibilityHint="Vuelve al menú de inicio"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('DailyTasks')}>
                                <Image
                                    source={require('./img/casa.png')}
                                    style={{ height: '100px', width: '100px' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel="Estadísticas"
                                accessibilityRole="button"
                                accessibilityHint="Muestra las estadísticas de la semana"
                                style={{marginLeft: 10, marginRight: 10}}
                                onPress={() => this.props.navigation.navigate('CalendarMenu', {idStudent: this.state.student.idStudent})}>
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
            
        }
    };
}

export default DailyTasks;