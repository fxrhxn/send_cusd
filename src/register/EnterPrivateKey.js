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

        let old_account = new ethers.Wallet(privateKey);
    
        //console.log(wallet)
        //console.log(old_account.signingKey)
    
    
        let eth_Address = old_account.signingKey.address;
        let private_key = old_account.signingKey.privateKey

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

