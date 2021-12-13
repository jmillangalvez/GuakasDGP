import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./Styles";

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class EducatorAssignedTasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], tasksId: [], idStudent: props.route.params.idStudent };
        this.getTasks();
    };

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
            const auxIdStudent = this.state.idStudent;
            this.setState({ tasksId: json.items.filter(function(assigned){
                if (assigned.idStudent == auxIdStudent && assigned.completed == 0) return (assigned.idTask);
            }) });
        
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

        } catch (error) {
            console.log(error);
        }
    }

    //Función que lista todas las tareas sin completar por el alumno
    listTask = () => {
        var component = [];
        this.state.tasks.forEach(task => {
            component.push(this.showTask(task));
        });
        return component;
    };

    //Función que muestra cada tarea asignada que no ha completado el alumno
    showTask = (task) => {
        return(
            <TouchableOpacity 
                /*
                Debe mandar a la información de la tarea
                onPress={ () => this.props.navigation.navigate('') }*/
                accessibilityLabel="Tarea seleccionada"
                accessibilityRole="button"
                accessibilityHint="Pulsa para mostrar la tarea"
                >
                <Text style={styles.dailyTaks}>{task.title}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        changeScreenOrientation();
        if (this.state.tasks.length > 0) {
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} accessibilityRole="header" value="TAREAS ASIGNADAS">TAREAS ASIGNADAS</Text>
                    </SafeAreaView>
                    <View style={styles.goBackView}>
                    {/* Volver a la pantalla anterior */}
                    <TouchableOpacity 
                    accessibilityLabel="Volver al inicio"
                    accessibilityRole="button"
                    accessibilityHint="Vuelve al menú de inicio del educador"
                    onPress={() => this.props.navigation.navigate('EducatorMain')}>
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.dailyTaskView}>
                        
                        { this.listTask() }

                    </View>
                    <StatusBar style="auto" />
                </View>
            );
        }

        else {
            return (
                <View style={styles.mainView}>
                    <SafeAreaView style={styles.banner}>
                        <Text style={styles.headerText} accessibilityRole="header" value="TAREAS ASIGNADAS">TAREAS ASIGNADAS</Text>
                    </SafeAreaView>
                    <View style={styles.goBackView}>
                    {/* Volver a la pantalla anterior */}
                    <TouchableOpacity 
                    accessibilityLabel="Volver al inicio"
                    accessibilityRole="button"
                    accessibilityHint="Vuelve al menú de inicio del educador"
                    onPress={() => this.props.navigation.navigate('EducatorMain')}>
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.dailyTaskView}>
                        <Text style={styles.dailyTaks}>Este alumno no tiene tareas asignadas sin completar.</Text>
                        <Text style={styles.dailyTaks}>Puedes asignarle la tarea en el menú anterior.</Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            );
        }
    };
}

export default EducatorAssignedTasks;