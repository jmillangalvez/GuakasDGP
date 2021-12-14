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
          idStudent: props.route.params.idStudent
        };
        //this.componentDidMount;
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
            const response = await fetch('http://localhost:8000/api/v1/assignedTasks/', {
                method: 'GET',
                mode: 'cors',
                headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          this.setState({assigneds: json.items});
          
        } catch (error) {
          console.log(error);
        }
    }

    async getTasks() {
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
            console.log("Error en getTasks "+error);
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
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return (
            <View style={styles.mainView}>
                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="CALENDARIO DE TAREAS">TAREAS DIARIAS</Text>
                </SafeAreaView>
                <View style={styles.goBackView}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('DailyTasks') }
                        accessibilityLabel="Volver"
                        accessibilityRole="Button"
                        accessibilityHint="Vuelve al calendario"
                        color="#bcbcbc">
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={this.onDateChange}
                    />
                    <View>
                        <Text>FECHA DE INICIO:{ startDate }</Text>
                        <Text>FECHA DE FINALIZACIÓN:{ endDate }</Text>
                    </View>
                </View>

                <View style={styles.sideBanner}>
                    <View style={styles.confirmButton}>
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
                    
                    <View style={styles.confirmButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDates', {startDate: this.state.selectedStartDate, endDate: this.state.selectedEndDate, idStudent: this.state.idStudent} ) }>
                        <Button
                            title="Ver Tareas"
                            accessibilityLabel="Ver Tareas"
                            accessibilityRole="Button"
                            accessibilityHint="Ir al menu de tareas en ese tramo"
                            color="#bcbcbc"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bottomBanner}>
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
            </View>
        )
    }
}

export default CalendarMenu;