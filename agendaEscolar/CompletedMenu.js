import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, SectionList, Button, SafeAreaView} from 'react-native';
import styles from './Styles';

class CompletedMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {classMenus: [], listaClassMenus: [], educadores: [], date: props.route.params.date}

    this.datosMenu = {

      data:[

        {
          data:[
            {image1:require("./data/imagenesMenu/blanco.jpeg"),
            image2:require("./data/imagenesEducadores/1.jpg"),
            image3:require("./data/imagenesEducadores/2.jpg"),
            image4:require("./data/imagenesEducadores/3.jpg"),
            image5:require("./data/imagenesEducadores/4.jpg"),
            image6:require("./data/imagenesEducadores/5.jpg")},

            {image1:require("./data/imagenesMenu/menu.png"),
            image2:require("./data/imagenesMenu/8.png"),
            image3:require("./data/imagenesMenu/3.png"),
            image4:require("./data/imagenesMenu/5.png"),
            image5:require("./data/imagenesMenu/1.png"),
            image6:require("./data/imagenesMenu/7.png")},

            {image1:require("./data/imagenesMenu/carne.png"),
            image2:require("./data/imagenesMenu/0.png"),
            image3:require("./data/imagenesMenu/4.png"),
            image4:require("./data/imagenesMenu/3.png"),
            image5:require("./data/imagenesMenu/9.png"),
            image6:require("./data/imagenesMenu/1.png")},

            {image1:require("./data/imagenesMenu/verdura.png"),
            image2:require("./data/imagenesMenu/2.png"),
            image3:require("./data/imagenesMenu/3.png"),
            image4:require("./data/imagenesMenu/1.png"),
            image5:require("./data/imagenesMenu/5.png"),
            image6:require("./data/imagenesMenu/5.png")},

            {image1:require("./data/imagenesMenu/manzana.png"),
            image2:require("./data/imagenesMenu/3.png"),
            image3:require("./data/imagenesMenu/7.png"),
            image4:require("./data/imagenesMenu/8.png"),
            image5:require("./data/imagenesMenu/6.png"),
            image6:require("./data/imagenesMenu/10.png")},

            {image1:require("./data/imagenesMenu/yogur.png"),
            image2:require("./data/imagenesMenu/1.png"),
            image3:require("./data/imagenesMenu/2.png"),
            image4:require("./data/imagenesMenu/1.png"),
            image5:require("./data/imagenesMenu/0.png"),
            image6:require("./data/imagenesMenu/5.png")},

          ]
        },

      ]
    }

  }

  async getClassMenus() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/classMenus/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({classMenus: json.items});
      let nuevaLista = []
      for(let i = 0; i < this.state.classMenus.length; i++){
        if(this.state.classMenus[i].date == this.state.date){
          nuevaLista.push(this.state.classMenus[i])
        }
      }
      this.setState({listaClassMenus: nuevaLista})
    } catch (error) {
      console.log(error);
    }
  }

  async getEducators() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/educators/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.setState({educadores: json.items});
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getClassMenus();
    this.getEducators();
  }

  getFotoEducador(id){
    let nom = "1.jpg"
    for(let i = 0; i < this.state.educadores.length; i++){
      if(id == this.state.educadores[i].idEducator){
        nom = this.state.educadores[i].picture
      }
    }

    return nom
  }

  getFotoNumero(num){
    let fotoNum = "0.png"
    switch(num){
      case 0:
        fotoNum = "0.png"
        break;
      case 1:
        fotoNum = "1.png"
        break;
      case 2:
        fotoNum = "2.png"
        break;
      case 3:
        fotoNum = "3.png"
        break;
      case 4:
        fotoNum = "4.png"
        break;
      case 5:
        fotoNum = "5.png"
        break;
      case 6:
        fotoNum = "6.png"
        break;
      case 7:
        fotoNum = "7png"
        break;
      case 8:
        fotoNum = "8.png"
        break;
      case 9:
        fotoNum = "9.png"
        break;
      case 10:
        fotoNum = "10.png"
        break;
    }
    
    return fotoNum
  }

  //Fila 1
  renderRowHead(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderRowHeadItem(i))
    }

    return component
  }

  renderRowHeadItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/blanco.jpeg")}/>
        </View>
      )
    }
    else{
      let fotoEducador = this.getFotoEducador(this.state.listaClassMenus[i-1].idEducator)
      let image = require("./data/imagenesEducadores/" + fotoEducador)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 2
  renderNormalMenu(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderNormalMenuItem(i))
    }

    return component
  }

  renderNormalMenuItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/menu.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numNormalMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 3
  renderNoMeatMenu(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderNoMeatMenuItem(i))
    }

    return component
  }

  renderNoMeatMenuItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/noCarne.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numNoMeatMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 4
  renderCrushedMenu(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderCrushedMenuItem(i))
    }

    return component
  }

  renderCrushedMenuItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/verdura.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numCrushedMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 5
  renderDessertCrushedFruit(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderDessertCrushedFruitItem(i))
    }

    return component
  }

  renderDessertCrushedFruitItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/yogur.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertCrushedFruit)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 6
  renderDessertYogurtCustard(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderDessertYogurtCustardItem(i))
    }

    return component
  }

  renderDessertYogurtCustardItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/yogur.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertYogurtCustard)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  //Fila 7
  renderDessertFruit(){
    let component = []
    for(let i = 0; i < this.state.listaClassMenus.length+1; i++){
      component.push(this.renderDessertFruitItem(i))
    }

    return component
  }

  renderDessertFruitItem(i){
    if(i == 0){
      return(
        <View key={i}>
          <Image style={styles.listImage} source={require("./data/imagenesMenu/manzana.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertFruit)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <Image style={styles.listImage} source={image}/>
        </View>
      )
    }
  }

  render() {
    return (   
      <View style={{flex:1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyCommandTaskList" accessibilityRole="header">Menú</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <TouchableOpacity 
            accessibilityLabel = "Volver"
            accessibilityRole = "button"
            accessibilityHint = "Vuelve al submenú anterior."
            onPress={() => this.props.navigation.navigate('CompletedMenuList')}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {this.renderRowHead()}
        </View>

        <View style={styles.listContainer}>
          {this.renderNormalMenu()}
        </View>

        <View style={styles.listContainer}>
          {this.renderNoMeatMenu()}
        </View>

        <View style={styles.listContainer}>
          {this.renderCrushedMenu()}
        </View>

        <View style={styles.listContainer}>
          {this.renderDessertCrushedFruit()}
        </View>

        <View style={styles.listContainer}>
          {this.renderDessertYogurtCustard()}
        </View>

        <View style={styles.listContainer}>
          {this.renderDessertFruit()}
        </View>

      </View>
    );
  }
}

export default CompletedMenu;