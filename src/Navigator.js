import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  AppRegistry,
  TouchableOpacity,
  Text } from 'react-native'


import { Navigator } from "react-native-deprecated-custom-components"

//Get the components for the core functionality. 
import SendPayments from "./core/SendPayments";

//Functionality for the registry components. 
import AccountCreated from './register/AccountCreated';
import CreateAccount from './register/CreateAccount';
import EnterPrivateKey from './register/EnterPrivateKey';
import ImportAccount from './register/ImportAccount';


class FinalApp extends Component {
  render() {
    return (
      <Navigator
          style={styles.container}          
          initialRoute={{id: 'CreateAccount', name: 'Index'}}
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

        //DESC - Main page that allows you to send payments. 
        if(routeId == 'SendPayments'){
            return(
                <SendPayments navigator={navigator} {...route.passProps} />
            )
        }

        //DESC - Page that shows your account got created 
        if(routeId == 'AccountCreated'){
            return(
                <AccountCreated navigator={navigator} {...route.passProps} />
            )
        }

              
        //DESC - Component to let you create your account. 
        if(routeId == 'CreateAccount'){
          return(
              <CreateAccount navigator={navigator} {...route.passProps} />
          )
        }


        //DESC - Text area to enter your private key. 
        if(routeId == 'EnterPrivateKey'){
          return(
              <EnterPrivateKey navigator={navigator} {...route.passProps} />
          )
        }

            
        //DESC - I
        if(routeId == 'ImportAccount'){
          return(
              <ImportAccount navigator={navigator} {...route.passProps} />
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor : 'white'
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