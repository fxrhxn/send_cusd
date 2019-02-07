/*

    Example Test Accounts( NEVER, EVER SEND REAL ETH OR CUSD TO THESE)

    PRIVATE: 0xb806dfb07f98a1dd129924f9ebc1b155cfe6f3ace9ba497dcabc59c090d8a7be
    PUBLIC : 0x2dABBdE6f99dC21f1046a9d306fb54Fee0c67044

*/



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
  TouchableOpacity,
} from 'react-native'

import {
  Container,
  Textarea,
  Header,
  Title,
  Content,
  Footer,
  Form,
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
  Label
} from "native-base";


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
    marginTop : 33,
}

let ethers = require('../ethers');
let web3 = require('../web3');


import * as Keychain from 'react-native-keychain';


class EnterPrivateKey extends Component {
   
    constructor(props){
        super(props)
  
        this.state = {
            privateKey : "",
        };
      
        this.backPressed = this.backPressed.bind(this)
        this.importPressed = this.importPressed.bind(this)
        this.keyEntered = this.keyEntered.bind(this)
    }
  
    componentWillMount(){

    }

    backPressed(){
        this.props.navigator.pop()
    }

    

    //When import button is pressed.
    importPressed(){
        let privateKey = this.state.privateKey
     
     try{

        // // Ropsten URL 
        let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'

        // Create a Web3 instance with the url.   
        var web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));

       let old_account = web3js.eth.accounts.privateKeyToAccount(privateKey);

       console.log(old_account)

        let eth_Address = old_account.address;
        let private_key = old_account.privateKey

        //Save the eth private and public key to the keychain.
        
              //JSON that is supporting all chains. 
              let newJSON = {
                eth : [
                    {
                        privateKey : private_key,
                        publicKey : eth_Address,             
                    }
                ],
                eos : [] 
            }
    
            //Turn array to string to store in keychain. 
            let stored_string = JSON.stringify(newJSON);
    
    
            //Store array with keys in keychain. 
            (async function() {
    
                // Store the credentials
                await Keychain.setGenericPassword('null', stored_string);
              
              })();
              
              //Push to the imported account page. 
              this.props.navigator.push({
                  id : 'ImportAccount',
                  passProps : {
                      privateKey : privateKey,
                      publicKey : eth_Address
                  }
              })

     }catch(e){
        console.log('ERROR')
     }

   
    }

    //When the private key is entered.
    keyEntered(e){
        this.setState({
            privateKey : e,
        })
    }


    render(){
        return(
        <Container>
            <Header>
                <Left>

                <TouchableOpacity onPress={this.backPressed}>
                      <Icon name='arrow-back' />

                </TouchableOpacity>
                
                
                </Left>

                <Body>
                    <Text>
                        Import Account
                    </Text>
                </Body>

                <Right>
                </Right>
            </Header>
            
            
            <Content padder>

            {/* Text Area to enter text */}
              <Form>
                <Textarea rowSpan={5} bordered placeholder="Enter Private Key" onChangeText={this.keyEntered} />

               

              </Form>

              <View style={buttonStyles}>
                    <Button
                    style={{ backgroundColor : '#0099FF' }}
                    onPress={this.importPressed}
                    >
                        <Text>
                            Import
                        </Text>
                    </Button>
                </View>
             
                <Label style={buttonStyles}>
                    <Text style={{textAlign : 'center', color : 'green'}}>
                        *All Keys will always be stored locally. 
                    </Text>
                </Label>
            </Content>
        
        </Container>
        )
    }

}

module.exports = EnterPrivateKey 

