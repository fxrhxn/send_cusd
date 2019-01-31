import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Platform,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Image,
  Modal,
  StatusBar
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
  Input 
} from "native-base";


let buttonStyles = {
    flexDirection : 'row',
    justifyContent : 'center',
}

let ethers = require('../ethers');

class CreateAccount extends Component {
   
    constructor(props){
        super(props)
  
        this.state = {};
      
        this.createAccount = this.createAccount.bind(this)
        this.importAccount = this.importAccount.bind(this)
    }
  
    componentWillMount(){

        // Check the 

    }

    //Function to create an account. 
    createAccount(){

        console.log('ACCOUNT CREATED')

        //Create a random wallet. 
        let wallet = new ethers.Wallet.createRandom();
        let data = wallet.signingKey 
    
        /* Data Retrieved from Ethers library */ 
        let mnemonic = data.mnemonic // Mnemonic seed words
        let privateKey = data.privateKey // Private key 
        let publicKey = data.publicKey // Public Key 

        //JSON that is supporting all chains. 
        let newJSON = {
            eth : [
                {
                    privateKey : privateKey,
                    publicKey : publicKey,
                    mnemonic : mnemonic 
                }
            ],
            eos : [] 
        }

        console.log(newJSON)


        
    }

    // Push to page that allows you to input your private key. 
    importAccount(){

        this.props.navigator.push({
            id: 'EnterPrivateKey',
            passProps: {test: 'nextIndex'},
          });
       
    }

    render(){
        return(
            <View>
        
        {/* Carbon Logo */}
        <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 88}}>


            <Image source={require('../images/carbon-black.png')} style={{height: 111, width: 333,}}/>

        </View>
       


        {/* Buttons to create or import acounts */}
            <View
            style={buttonStyles}
            marginTop={111}
            >
                <Button
                style={{
                    backgroundColor : '#4682b4'
                }}
                onPress={this.createAccount}
                >
                    <Text>
                      Create Account 
                    </Text>
                 </Button>
             </View>   

             <View
            style={buttonStyles}
            marginTop={33}
            >
                 <Button
                 style={{
                     backgroundColor : '#4682b4'
                 }}
                 onPress={this.importAccount}
                 >
                    <Text>
                        Import Account 
                    </Text>
                 </Button>
              </View>
            
            </View>
            
       
        )
    }

}

module.exports = CreateAccount 

