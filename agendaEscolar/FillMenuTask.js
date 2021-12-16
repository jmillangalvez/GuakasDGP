import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import styles from './Styles';

class FillMenuTask extends Component {

  constructor(props) {
    super(props);
    this.state = {classMenus: [], listaClassMenus: [], educadores: [], date: props.route.params.date}
    this.onPress = this.onPress.bind(this);
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

  async updateClassMenu(classMenu) {
    try {
      const response = await fetch('http://localhost:8000/api/v1/classMenus/' + classMenu.idClassMenu + "/", {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idEducator: classMenu.idEducator,
            date: this.state.date,
            numNormalMenu: classMenu.numNormalMenu,
            numNoMeatMenu: classMenu.numNoMeatMenu,
            numCrushedMenu: classMenu.numCrushedMenu,
            numDessertFruit: classMenu.numDessertFruit,
            numDessertCrushedFruit: classMenu.numDessertCrushedFruit,
            numDessertYogurtCustard: classMenu.numDessertYogurtCustard,
        })
      });
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

  onPress(src, index) {
    this.editNum(src, index)
  }

  updateMenu(){
    this.state.listaClassMenus.forEach(lis => {
        this.updateClassMenu(lis);
    });
    this.props.navigation.navigate('DailyTasks')
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
        fotoNum = "7.png"
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

  editNum(str, index){
    let items = this.state.listaClassMenus;
    let item = items[index];
    switch(str){
        case "normalMenu":
          item.numNormalMenu++;
          item.numNormalMenu %= 11;
          break;
        case "noMeat":
          item.numNoMeatMenu++;
          item.numNoMeatMenu %= 11;
          break;
        case "crushed":
          item.numCrushedMenu++;
          item.numCrushedMenu %= 11;
          break;
        case "fruit":
          item.numDessertFruit++;
          item.numDessertFruit %= 11;
          break;
        case "crushedFruit":
          item.numDessertCrushedFruit++;
          item.numDessertCrushedFruit %= 11;
          break;
        case "yogur":
          item.numDessertYogurtCustard++;
          item.numDessertYogurtCustard %= 11;
          break;
    }
    items[index] = item;
    this.setState({ listaClassMenus: items });
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/blanco.jpeg")}/>
        </View>
      )
    }
    else{
      let fotoEducador = this.getFotoEducador(this.state.listaClassMenus[i-1].idEducator)
      let image = require("./data/imagenesEducadores/" + fotoEducador)
      return(
        <View key={i}>
          <Image style={styles.listImage2} source={image}/>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/menu.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numNormalMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
            <TouchableOpacity
                onPress={() => this.onPress("normalMenu", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/noCarne.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numNoMeatMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <TouchableOpacity
                onPress={() => this.onPress("noMeat", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/comidaTriturada.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numCrushedMenu)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <TouchableOpacity
                onPress={() => this.onPress("crushed", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/frutaTriturada.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertCrushedFruit)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <TouchableOpacity
                onPress={() => this.onPress("crushedFruit", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/yogur.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertYogurtCustard)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <TouchableOpacity
                onPress={() => this.onPress("yogur", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
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
          <Image style={styles.listImage2} source={require("./data/imagenesMenu/manzana.png")}/>
        </View>
      )
    }
    else{
      let fotoNum = this.getFotoNumero(this.state.listaClassMenus[i-1].numDessertFruit)
      let image = require("./data/imagenesMenu/" + fotoNum)
      return(
        <View key={i}>
          <TouchableOpacity
                onPress={() => this.onPress("fruit", i-1)}>                
                <Image style={styles.listImage2} source={image}/>
            </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (   
      <View style={{flex:1}}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="ModifyCommandTaskList" accessibilityRole="header">MENÚ</Text>
        </SafeAreaView>

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

        <View>
            <TouchableOpacity
                accessibilityLabel="Volver al inicio"
                accessibilityRole="button"
                accessibilityHint="Vuelve al menú de inicio"
                style={{ position: 'absolute', bottom: 400, right: '20%' }}
                onPress={this.updateMenu.bind(this)}>
                <Image
                    source={require('./img/si.png')}
                    style={{ height: '150px', width: '150px' }}
                />
                <Text style={{ fontSize: 20 }}>Guardar Menu</Text>
            </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default FillMenuTask;