import React, { Component } from "react";
import { Text, SafeAreaView, Button, View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

class StudentList extends Component {
    constructor(props) {
        super(props);
        
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => this.props.navigation.navigate('')}>
            <Avatar size='xlarge' source={{ uri: item.avatar }} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    render() {

        const studentList = require('./data/students.json');

        changeScreenOrientation();

        return (
            <View style={styles.mainView}>

                <SafeAreaView style={styles.banner}>
                    <Text style={styles.headerText} value="AsignarTarea" accessibilityRole="header">Asignar Tarea</Text>
                </SafeAreaView>

                <View style={styles.goBackView}>
                    <Button
            title="Volver"
            accessibilityLabel="Volver"
            accessibilityRole="button"
            accessibilityHint="Vuelve al inicio de sesión"
            color="#bcbcbc"
            onPress={() => this.props.navigation.navigate('EducatorMain')}
          />
                </View>

                <View style={styles.listView}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={studentList.info}
                        renderItem={this.renderItem}
                        style={{ width: '100%'}}
                    />
                </View>
            </View>

        )
    }
}

export default StudentList;