
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

import * as Keychain from 'react-native-keychain';


import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}


let buttonStyles = {
    flexDirection : 'row',
    justifyContent : 'center',
}

let ethers = require('../ethers');
let web3 = require('../web3');

class CreateAccount extends Component {
   
    constructor(props){
        super(props)
  
        this.state = {
            privateKey : "",
            publicKey : "" 
        };
      
        this.createAccount = this.createAccount.bind(this)
        this.importAccount = this.importAccount.bind(this)
    }
  
    componentWillMount(){

        let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'

        // Check if there is any keys stored.  
        var web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));

       // console.log(web3js)

      
        // web3js.eth.getBalance("0xf7D9830175f9c3dBd4ED8471B0b531A3CFfDac3b").then((res) => {
        // console.log(res)
        // })        
          
        /* Get the credentials for the */
          (async () => {

            try {
                // Retreive the credentials
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                
                    this.props.navigator.push({
                        id : 'SendPayments'
                    })

                } else {
                  // Stay on this page. 
                }
              } catch (error) {
                 // Stay on this page. 
              }

          })();


    }


    

    //Function to create an account. 
    createAccount(){

        console.log('ACCOUNT CREATED')

                // // Ropsten URL 
        let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'

        // Create a Web3 instance with the url.   
        var web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));



        let newAccount = web3js.eth.accounts.create();
        let newAccount_public = newAccount.address
        let newAccount_private = newAccount.privateKey


        //JSON that is supporting all chains. 
        let newJSON = {
            eth : [
                {
                    privateKey : newAccount_private,
                    publicKey : newAccount_public,             
                }
            ],
            eos : [] 
        }
        // 0xf65edc67222a17bdb9979e9560f75ac34fae6dc30e6d2145458295bf11739390

        //Turn array to string to store in keychain. 
        let stored_string = JSON.stringify(newJSON);


        //Store array with keys in keychain. 
        (async function() {

            // Store the credentials
            await Keychain.setGenericPassword('null', stored_string);
          
          })();

          this.props.navigator.push({
              id : 'AccountCreated',
              passProps : {
                  privateKey : newAccount_private,
                  publicKey : newAccount_public
              }
          })
        
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

