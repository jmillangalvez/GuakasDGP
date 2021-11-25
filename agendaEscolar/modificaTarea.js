import React, { useState } from 'react';
import { Picker, StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, Button } from "react-native";

export default function modificaTarea ({navigation}) {
  const [text, onChangeText] = useState("Tarea_1");
  const [desc, onChangeDesc] = useState("Descripcion_1");

  return (  
    <View style={styles.container}>
      <SafeAreaView style={styles.banner}
        accessibilityLabel="MODIFICAR TAREA FIJA"
        accessibilityRole="header"
        accessibilityHint="pantalla para modificar una tarea fija">
        <Text style={styles.headerText}>MODIFICAR TAREA FIJA</Text>
      </SafeAreaView>
      <View style={styles.container2}>
        <Text style={styles.textText}>Título texto:</Text>
        <TextInput
          style={styles.row}
          placeholder = "Titulo tarea"
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.textText}>Descripción texto:</Text>
        <TextInput
          style={styles.row}
          onChangeText={onChangeDesc}
          value={desc}
          placeholder="Descripción"
        />
        <Text style={styles.textText}>{`Título pictograma:        `}
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('ListaPictograma')}>
          <Image source={require('./img/pict1.png')} style={styles.img}/>
        </TouchableOpacity>
        </Text>
        <Text style={styles.textText}>{`Descripción pictogramas:\t`}
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('ListaPictograma')}>
          <Image source={require('./img/mas.png')} style={styles.img}/>
        </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.confirmButton}>
        <Button
          title="Modificar Tarea"
          accessibilityLabel="Modificar Tarea"
          accessibilityRole="Button"
          accessibilityHint="Modifica la tarea"
          color="#007AFF"
          onPress={() => navigation.navigate('ListaPictograma')}
        />
      </View>
      <View style={styles.removeButton}>
        <Button
          title="Eliminar Tarea"
          accessibilityLabel="Eliminar Tarea"
          accessibilityRole="Button"
          accessibilityHint="Eliminar la tarea"
          color="#A52A2A"
          onPress={() => navigation.navigate('ListaPictograma')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textText: {
    fontSize: 30,
    marginTop: 40,
  },
  banner: {
    backgroundColor: '#248aff',
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  img: {
    resizeMode: "center",
    height: 50,
    width: 45
  },
  input: {
    height: 50,
    backgroundColor: "#BDBDBD"
  },
  container2: {
    flex: 2,
    padding: 40,
    paddingTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    padding: 4,
    width: 100,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 2
  }
});
