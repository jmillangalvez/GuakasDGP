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
        //Cuando la navegacion a esta página sea correcta descomentar línea 15
        //this.state = { tasks: [], idStudent: props.route.params.idStudent };
        this.state = { tasks: [], idStudent: 1 };
        this.componentDidMount;
    };

    async getAssigneds() {
        try {
            const response = await fetch('http://localhost:8000/assigneds/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const auxIdStudent = this.state.idStudent;
            this.setState({ tasksId: json.items.filter(function(assigned){
                if (assigned.studentId == auxIdStudent) return (assigned.taskId);
            }) });
        } catch (error) {
            console.log("Error en getAssigneds "+error);
        }
    }

    async getTasks() {
        try {
            const response = await fetch('http://localhost:8000/tasks/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const taskAssigneds = json.items.filter(function(task){
                if (task.finished == 0) return task;
            });
            const finalTasks = [];
            taskAssigneds.forEach(elementTaskAssigned => {
                this.state.tasksId.forEach(elementTaskId => {
                    if (elementTaskId.taskId == elementTaskAssigned.taskId) finalTasks.push(elementTaskAssigned);
                })
            });         
            this.setState({ tasks: finalTasks });
        } catch (error) {
            console.log("Error en getTasks "+error);
        }
    }

    componentDidMount(){
        this.getAssigneds();
        this.getTasks();
    }

    listTask = () => {
        var component = [];
        this.state.tasks.forEach(task => {
            component.push(this.showTask(task));
        });
        return component;
    };

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