import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  AppRegistry,
  TouchableOpacity,
  Text } from 'react-native'


import { Navigator } from "react-native-deprecated-custom-components"

//Get the components 
import SendPayments from "./core/SendPayments";



class FinalApp extends Component {
  render() {
    return (
      <Navigator          
          initialRoute={{id: 'SendPayments', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }

  renderScene(route, navigator) {

        let routeId = route.id;

        //DESC - Fi 
        if(routeId == 'SendPayments'){
            return(
                <SendPayments navigator={navigator} {...route.passProps} />
            )
        }


       return this.noRoute(navigator);

  }

  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>Not found...</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = FinalApp;