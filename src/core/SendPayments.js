

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


//import _ from 'lodash';





// Button styles. 
let buttonStyles = {     
    marginLeft : 100,
    marginTop : 133,
}

// Account Button Styles 
let accountButtonStyles = {
    marginLeft : 100,
    marginTop : 133,
    align : "center",
}

//Account Input Styles 
let accountInputStyles = {
    marginTop : 37,
}


class SendPayments extends Component {
   
  constructor(props){
      super(props)

      this.state = {
          accountModalVisible : false,
          paymentsModalVisible : false,
          eth_address : "",
          amount : "",
      };
    
      this.paymentButtonClicked = this.paymentButtonClicked.bind(this)
      this.nextClicked = this.nextClicked.bind(this)
      this.ethChanged = this.ethChanged.bind(this)
      this.sendCUSD = this.sendCUSD.bind(this) 
  }

  componentWillMount(){

    StatusBar.setHidden(false)

  }

  //When payment button is clicked in the main page. 
  paymentButtonClicked(){
      
      this.setState({
         accountModalVisible : true,
         paymentsModalVisible : false,  
      })

  }

  //Function that sends CUSD.
  sendCUSD(){

        Alert.alert(
        'Success',
        `Sent CUSD to ${this.state.eth_address}`,
        [
        {text: 'OK', onPress: () => { 
            
            this.setState({
                accountModalVisible : false,
                paymentsModalVisible : false,
                eth_address : "",
                amount : "",
            })
        }},
        ],
        { cancelable: false }
    )
    



  }
  //Next button is clicked on eth accoutn modal
  nextClicked(){
    
    this.setState({
        accountModalVisible : false,
        paymentsModalVisible : true,  
     })

    

  }

  ethChanged(e){

    this.setState({
        eth_address : e,
    })
  }

  render(){
      return(
          <View>

              {/* Heading */}
            <Text style={{ marginTop : 122, marginLeft : 33}}>
                Teset Payments 
            </Text>

            {/* Button to send the payment */}
              <Button style={buttonStyles} onPress={this.paymentButtonClicked}>
                <Text>
                    Send Payment 
                </Text>
              </Button>
            

            {/* Add Account Modal */}
                <Modal visible={this.state.accountModalVisible} setHidden={false}>
                    <View>


                            {/* Input for account info */}
                            <Item success style={accountInputStyles}>
                                <Input 
                                autoFocus={true}
                                placeholder='Enter ETH Address' 
                                onChangeText={this.ethChanged}/>
                                <Icon name='checkmark-circle' />
                            </Item>

                            <Button style={accountButtonStyles} onPress={this.nextClicked}>
                                <Text>
                                    Next
                                </Text>
                            </Button>
                    </View>
                </Modal> 


            {/*  Payment Amount Modal  */}
                <Modal                
                visible={this.state.paymentsModalVisible} setHidden={false}>
                    <View>
                
                 <Header>

                        <Left>
                            <TouchableHighlight>
                                <Icon name='close' />
                            </TouchableHighlight>
                         </Left>
                        
                        <Body>
                            <Text style={{ marginTop : 9}}>
                                Sending To: {this.state.eth_address}
                            </Text>
                        </Body>
                </Header>
                
                    {/* Input for account info */}
                        <Item success style={accountInputStyles}>
                            <Input 
                            placeholder='Enter Amount to Send' 
                            keyboardType="decimal-pad"
                            autoFocus={true}
                            />
                            <Icon name='checkmark-circle' />
                        </Item>
                    
                    {/* Payment Button */}
                        <Button style={accountButtonStyles} onPress={this.sendCUSD}>
                                <Text>
                                    Send CUSD
                                </Text>
                        </Button>

                    </View>
                </Modal> 


          </View>
      )
  }

}

module.exports = SendPayments;

