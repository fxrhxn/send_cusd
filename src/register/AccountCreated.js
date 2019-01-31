import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Platform,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Modal,
  StatusBar,
  Image
} from 'react-native'

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
  Input,
  Label,
} from "native-base";

let buttonStyles = {
    flexDirection : 'row',
    justifyContent : 'center',
}


class AccountCreated extends Component {
   
    constructor(props){
        super(props)
  
        this.state = {};
      
        this.closePressed = this.closePressed.bind(this)
    }
  
    componentWillMount(){

    }

    closePressed(){
        
        this.props.navigator.push({
            id : "SendPayments",
        })
    }

    render(){
        return(
            <View>
                 {/* Carbon Logo */}
        <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 88}}>


{/* <Image source={require('../images/carbon-black.png')} style={{height: 111, width: 333,}}/> */}
        <Icon name="checkmark" style={{fontSize : 222, color : "#50C878"}} />
        </View>



        {/* Buttons to create or import acounts */}
        <View
        style={buttonStyles}
        marginTop={11}
        >
          </View>

          <Label style={{ paddingBottom : 44}}>
                <Text style={{textAlign : 'center'}}>
                   Created Account 
                </Text>                
            </Label>


            <Label>
                <Text style={{textAlign : 'center'}}>
                    Public Key: {this.props.publicKey}
                </Text>                
            </Label>

            <Label>
                <Text style={{textAlign : 'center'}}>
                    Private Key: {this.props.privateKey}
                </Text>

            </Label>


            <Body style={{ alignItems : 'center', marginTop : 88, flexDirection : 'row', justifyContent : 'center'}}>
                <Button onPress={this.closePressed}>
                <Text>
                    Close
                </Text>
                </Button>
            </Body>

            </View>
        )
    }

}

module.exports = AccountCreated 

