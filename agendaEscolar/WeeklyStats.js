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

  }


  render() {

    const barData = {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
          {
            data: [140, 120, 100, 124, 135, 165, 155],
          },
        ],
      };

    return (

        <View>

            <SafeAreaView style={styles.banner}>
                <Text style={styles.headerText}>ESTADÍSTICAS</Text>
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