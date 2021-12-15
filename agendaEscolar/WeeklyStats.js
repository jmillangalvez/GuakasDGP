import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'

class WeeklyStats extends Component {

  constructor(props) {
    super(props);

    this.getTareasCompletadas();
    this.state = {tareasCompletadas: [], fechasNormalizadas: [], valoresDiarios: []}

  }

  //Pido las tareas
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

          taresIntervalo.push(tareasUsuario[i])

        }

      }

      //Defino el número de tareas completadas


      //Para cada día
      for(var i = 0; i < this.state.fechasNormalizadas.length; i += 1){

        var contador = 0

        //Miro cuántas tareas se completaron
        for(var j = 0; j < taresIntervalo.length; j += 1){

          if(taresIntervalo[j].completedDate == this.state.fechasNormalizadas[i]){

            contador += 1

          }

        }

        this.state.valoresDiarios.push(contador);

      }


    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getTareasCompletadas();
  }

  render() {

    const barData = {
        labels: this.state.fechasNormalizadas,
        datasets: [
          {
            data: this.state.valoresDiarios,
          },
        ],
      };

    return (

        <View style={{flex: 1}}>

            <SafeAreaView style={styles.banner}>
                <Text style={styles.headerText}>ESTADÍSTICAS</Text>
            </SafeAreaView>

            <View style={styles.goBackView}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('CalendarMenu') }
                    accessibilityLabel="Volver"
                    accessibilityRole="Button"
                    accessibilityHint="Vuelve al calendario"
                    color="#bcbcbc">
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
            </View>


            <View style={estilo.content}> 

                <LineChart 
                    data={barData}
                    width={1000}
                    height={500}
                    fromZero={true}
                    showBarTops={false}
                    showValuesOnTopOfBars={true}
                    withHorizontalLabels={true}
                    withShadow={true}


                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: "#FFFFFF",
                        backgroundGradientToOpacity: 1,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        strokeWidth: 4, // optional, default 3
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false // optional
                    }}

                    bezier
                />

            </View>

        </View>


    );
  }
}

var estilo = StyleSheet.create({
    content:{
        paddingTop: 100,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});


export default WeeklyStats;