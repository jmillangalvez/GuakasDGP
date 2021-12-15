import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './Styles';
import { max } from "moment";

// Boceto 33: Menú Calendario
// Primero obtenemos las tareas y las almacenamos en una lista
// Luego se listan las tareas para cada dia
// no instalar como dice en la web usar las ordenes de abajo
// https://www.npmjs.com/package/react-native-calendar-picker
// npm install moment
// npm install react-native-calendar-picker

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }

class CalendarMenu extends Component{
    constructor(props) {
        super(props);

        this.state = {
          selectedStartDate: null,
          selectedEndDate: null,
          tasks: [],
          tasksId: [],
          dates: [],
          currentTask: 0,
          idStudent: this.props.route.params.idStudent,
        };
        
        // this.componentDidMount;
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
              selectedEndDate: date
            });
        } else {
            this.setState({
              selectedStartDate: date,
              selectedEndDate: null
            });
        }
      }

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
            const tasksUnifinished = json.items.filter(function(task){
                if (task.finished == 0) return task;
            });
            const finalTasks = [];
            tasksUnifinished.forEach(elementTaskUnfinished => {
                this.state.tasksId.forEach(elementTaskId => {
                    if (elementTaskId.taskId == elementTaskUnfinished.taskId) finalTasks.push(elementTaskUnfinished);
                })
            });         
            this.setState({ tasks: finalTasks });
            this.setState({ currentTitle: this.state.tasks[0].title });
        } catch (error) {
            console.log("Error en getTasks " + error);
        }
    }

    componentDidMount(){
        this.getAssigneds();
        this.getTasks();
    }

    render(){
        changeScreenOrientation();
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Fecha min
        minDate.setDate(minDate.getDate() - 365); // Desde hace 365 dias
        const maxDate = new Date (); //Fecha maxima
        maxDate.setDate(maxDate.getDate() + 365); // Hasta dentro de 365 dias

        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="CALENDARIO DE TAREAS">ESTADÍSTICAS</Text>
                </SafeAreaView>
                <View style={styles.goBackView}>
                {/* Volver a la pantalla anterior */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyTasks')}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.calendar}>
                    <CalendarPicker
                        width={700}
                        height={700}
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={this.onDateChange}
                    />
                </View>

                <View style={styles.sideBanner}>
                    <View style={styles.confirmButton}>
                        <TouchableOpacity >
                        <Button
                            title="Ver Estadísticas"
                            accessibilityLabel="Ver Estadísticas"
                            accessibilityRole="Button"
                            accessibilityHint="Ir al menu de estadísticas"
                            color="#bcbcbc"
                            onPress={() => this.props.navigation.navigate('WeeklyStats', {startDate: this.state.selectedStartDate, endDate: this.state.selectedEndDate, idStudent: this.state.idStudent} ) }
                        />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.confirmButton}>
                        <TouchableOpacity>
                        <Button
                            title="Ver Tareas"
                            accessibilityLabel="Ver Tareas"
                            accessibilityRole="Button"
                            accessibilityHint="Ir al menu de tareas en ese tramo"
                            color="#bcbcbc"
                            onPress={() => this.props.navigation.navigate('TaskDates', {startDate: this.state.selectedStartDate, endDate: this.state.selectedEndDate, idStudent: this.state.idStudent} ) }
                        />
                        </TouchableOpacity>
                    </View>
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
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default CalendarMenu;