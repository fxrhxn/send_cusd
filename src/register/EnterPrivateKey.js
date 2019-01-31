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

class EnterPrivateKey extends Component {
   
    constructor(props){
        super(props)
  
        this.state = {
            privateKey : "",
        };
      
        this.backPressed = this.backPressed.bind(this)
        this.importPressed = this.importPressed.bind(this)
    }
  
    componentWillMount(){

    }

    backPressed(){
        this.props.navigator.pop()
    }

    importPressed(){
        console.log('IMPORT PRESSED ')
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
                <Textarea rowSpan={5} bordered placeholder="Enter Private Key" />

               

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

