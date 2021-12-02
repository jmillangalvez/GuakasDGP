import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  Button
} from 'react-native';

class CompletedMenuList extends Component {

  constructor(props) {
    super(props);
    this.menus = {

      data:[

        {
          data:[
            {fecha:'01-11-2021'},
            {fecha:'08-11-2021'},
            {fecha:'15-11-2021'},
            {fecha:'22-11-2021'},
            {fecha:'29-11-2021'}
          ]
        },

      ]
    }
  }


  render() {
    return (
      <View>

        <Button
          title="Volver"
          color="#248aff"
          onPress={() =>
            this.props.navigation.navigate('AdminMain')}
          
        />
      
        <View style={styles.titulo}>
          <Text  style={styles.name}>Lista menús</Text>
        </View>

        <SectionList
          sections={this.menus.data}

          renderItem={({item}) => {
            
            return (
            <View style={styles.container}>

            <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('CompletedMenu')
                }>
                <Image style={styles.image}  source={require('./data/imagenesMenu/vermenu.png')}/>
              </TouchableOpacity>

              <View style={styles.content}>
                  <Text  style={styles.name}>{item.fecha}</Text>
              </View>


            </View>
            )
        }}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    marginTop:50,
    padding:10,
  },
  titulo: {

    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100

  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  content: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
    height: 100
  },
  image:{
    width:100,
    height:100,
    borderRadius:20,
    marginLeft:20
  },
  name:{
    fontSize:40,
  },
});

export default CompletedMenuList;