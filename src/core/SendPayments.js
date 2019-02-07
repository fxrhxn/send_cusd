

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
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator, 
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



//import _ from 'lodash';
let EthereumTx = require('../ethereumjs-tx');
let ethers = require('../ethers');
let web3 = require('../web3');
let Buffer = require('../buffer').Buffer 




// Button styles. 
let buttonStyles = {
    flexDirection : 'row',
    justifyContent : 'center',
    marginTop : 39
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


import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}






class SendPayments extends Component {
   
  constructor(props){
      super(props)

      this.state = {
          accountModalVisible : false,
          paymentsModalVisible : false,
          eth_address : "",
          amount : "",
          publicKey : "",
          privateKey : "",
          eth_balance : "",
          cusd_balance : "",
          showSpinner : false,
          sendingModal : false,
          sendSuccess : false,
          isAddress : false, 
      };
    
      this.paymentButtonClicked = this.paymentButtonClicked.bind(this)
      this.nextClicked = this.nextClicked.bind(this)
      this.ethChanged = this.ethChanged.bind(this)
      this.sendCUSD = this.sendCUSD.bind(this) 
      this.clearAccountPressed = this.clearAccountPressed.bind(this)
      this.backPressed = this.backPressed.bind(this)
      this.refreshBalance = this.refreshBalance.bind(this)
  }


  componentWillMount(){


    this.refreshBalance();

    
 }

    //Function that refreshes the balance. 
  refreshBalance(){

        // Get the public and private keys
        (async () => {
            try {
                // Retreive the credentials
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                  
                    let credentials_parsed = JSON.parse(credentials.password)
                    
                    let privateKey = credentials_parsed.eth[0].privateKey 
                    let publicKey = credentials_parsed.eth[0].publicKey 
    
                    this.setState({
                        privateKey : privateKey,
                        publicKey : publicKey 
                    })
    
          
                   // // Ropsten URL 
                let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'
    
                // Create a Web3 instance with the url.   
                var web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));
    
    
                //Stored address on the keychain. 
                let stored_address = publicKey;
    
                        // Contract ABI’s
                    let ABI = require("../contracts/MetaToken.json");
    
                    // Contract Ropsten Addresses
                    let ADDRESS = "0x67450c8908e2701abfa6745be3949ad32acf42d8";
    
                    var jsonFile = ABI;
                    var abi = jsonFile.abi;
                    var deployedAddress = ADDRESS;
                    const instance = new web3js.eth.Contract(abi, deployedAddress);
                    
                    let balance = await instance.methods.balanceOf(stored_address).call()
                    let short_balance = web3.utils.fromWei(balance.toString(), 'ether')
    
                    //Get the balance for the account. 
                    web3js.eth.getBalance(stored_address).then((bal) => {
                        this.setState({
                            eth_balance : bal / 1000000000000000000,
                            cusd_balance : short_balance
                        })
                    })
    
    
                } else {
    
                  this.props.navigator.push({
                      id : 'CreateAccount'
                  })
                }
              } catch (error) {
    
            }
        })()
    
    

  }


  //Back pressed on modal
  backPressed(){
    this.setState({
        accountModalVisible : false,
        paymentsModalVisible : false,
        eth_address : "",
        amount : "",
    })
  }

  //Clear account button logic
  clearAccountPressed(){
        
    Alert.alert(
        'Are you sure you want to clear your account?',
        `This action cannot be reversed.`,
        [
        {text: 'OK', onPress: () => { 
            
                /* Get the credentials for the */
                (async () => {

                    try {
                        
                        await Keychain.resetGenericPassword()
                        this.props.navigator.push({
                            id : 'CreateAccount'
                        })
                    } catch (error) {
                        // Stay on this page. 
                    }

                })();
   

        }},
        {text: 'Cancel', onPress: () => { 
        

        }},
        ],
        { cancelable: true }
    )
    




  }

  //When payment button is clicked in the main page. 
  paymentButtonClicked(){
      
      this.setState({
         accountModalVisible : true,
         paymentsModalVisible : false,  
      })

  }

  //Function that sends CUSD.
  async sendCUSD(){

      //Show the sending modal. 
      this.setState({
        accountModalVisible : false,
        paymentsModalVisible : false,
        sendingModal : true,
    })

    /* Personal credentials to send CUSD. */
    let from_eth = this.state.publicKey
    let privateK = this.state.privateKey

    /* Person we will send eth to */
    let to_eth = this.state.eth_address
    
    // Amount to send. 
    let amount = web3.utils.toWei(this.state.amount, 'ether')

     // // Ropsten URL 
    let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'

    // Create a Web3 instance with the url.   
    let web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));


        // Contract ABI’s
    let ABI = require("../contracts/MetaToken.json");

    // Contract Ropsten Addresses
    let ADDRESS = "0x67450c8908e2701abfa6745be3949ad32acf42d8";

    let jsonFile = ABI;
    let abi = jsonFile.abi;
    let deployedAddress = ADDRESS;
    let cusd = new web3js.eth.Contract(abi, deployedAddress);


    //Create an ether wallet with the private key. 
       let wallet = new ethers.Wallet(privateK)
     
       
       let to = cusd.options.address

       let data = cusd.methods.transfer(to_eth, amount).encodeABI()

      // let gasPrice = web3.utils.toWei('25', 'gwei')
      let gasPrice = await web3js.eth.getGasPrice()

       let gas = Math.ceil((await cusd.methods.transfer(to_eth, amount).estimateGas({ from: from_eth }))*1.2)
       
     //  let nonce = await cusd.methods.replayNonce(from_eth).call();

       let nonce = await web3js.eth.getTransactionCount(from_eth);



       let transaction = {
        nonce: nonce,
        gasPrice: "0x" + gasPrice * 1.40, 
        gasLimit: 2100000,
        to: to,
        value:  0,
        data: data,
        chainId: 3
    }
    
    // web3js.eth.signTransaction(tx, privateK).then((s) => {
    //     console.log(s)
    // })
    
     

    //Sign promise. 
     let signPromise = wallet.sign(transaction)

   

    //  //Sign promise and return the transaction. 
     signPromise.then((signedTransaction) => {


      web3js.eth.sendSignedTransaction(signedTransaction).on('receipt', (receipt) => {         
         
       }).catch((err) => {
           
       }).then((final_receipt) => {

            //Make send success true. 
            this.setState({
                sendSuccess : true 
            })

       });

    })





  }
  

  //Next button is clicked on eth accoutn modal
  nextClicked(){
    
    this.setState({
        accountModalVisible : false,
        paymentsModalVisible : true,  
     })

    

  }

  ethChanged(e){    

    // Check eth address,
    if(web3.utils.isAddress(e)){
        this.setState({
            isAddress : true
        })
    }else{
        this.setState({
            isAddress : false
        })
    }

    this.setState({
        eth_address : e,
    })
  }

  render(){
      return(
          <View>

               {/* Carbon Logo */}
               <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 88}}>


                <Image source={require('../images/carbon-black.png')} style={{height: 111, width: 333,}}/>

                </View>


        {/* ETH Balance */}
        <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 29}}>


            <Text style={{ fontSize : 27, textAlign : 'center', fontWeight : '200'}}>
              ETH Balance:  {Math.round(100 * this.state.eth_balance) / 100}
            </Text>
        </View>

        {/* CUSD Balance */}
        <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 33}}>


            <Text style={{ fontSize : 27, textAlign : 'center', fontWeight : '200'}}>
            CUSD Balance:  {this.state.cusd_balance}
            </Text>
        </View>
                     {/* CUSD Balance */}
        <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 33,}}>


            <Text style={{ fontSize : 19, textAlign : 'center', fontWeight : '400', width : 297}}>
            Address:  {this.state.publicKey}
            </Text>
        </View>
    

             {/* Button to clear account */}
            <View style={buttonStyles} >
              <Button onPress={this.clearAccountPressed} style={{ backgroundColor : '#DE1738'}}>
                <Text>
                    Clear Account
                </Text>
              </Button>
            </View>

            {/* Button to send the payment */}
            <View style={{ justifyContent : 'center', flexDirection : 'row', marginTop : 33}}>
              <Button onPress={this.paymentButtonClicked} disabled={this.state.cusd_balance == 0 || this.state.eth_balance == 0}>
                <Text>
                    Send CUSD
                </Text>
 
              </Button>

            </View>


            <View style={{ justifyContent : 'center', flexDirection : 'row', marginTop : 33}}>
            {(this.state.cusd_balance == 0 || this.state.eth_balance == 0) ? <Text style={{ textAlign : 'center', width : 300}}> Please have some CUSD and ETH before sending any. </Text> : <Text></Text>}
            </View>

            {/* Add Account Modal */}
                <Modal visible={this.state.accountModalVisible} setHidden={false}>
                    <View>

                    {/*  Header for modal */}
                    <Header>
                                <Left>
                                    <TouchableOpacity onPress={this.backPressed}>
                                        <Icon name='arrow-back' />

                                </TouchableOpacity>
                    
                                </Left>

                                <Body>
                                    <Text>
                                    ETH Address
                                    </Text>
                                </Body>

                                <Right>
                                </Right>
                        </Header>

                            {/* Input for account info */}
                            <Item success style={accountInputStyles}>
                                <Input 
                                autoFocus={true}
                                placeholder='Enter ETH Address' 
                                onChangeText={this.ethChanged}/>
                                <Icon name='checkmark-circle' />
                            </Item>

                            <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                                <Button onPress={this.nextClicked} disabled={!this.state.isAddress}>
                                    <Text>
                                        Next
                                    </Text>
                                </Button>
                            </View>
                    </View>
                </Modal> 


            {/*  Payment Amount Modal  */}
                <Modal                
                visible={this.state.paymentsModalVisible} setHidden={false}>
                    <View>
                
                 <Header>

                        <Left>
                            <TouchableOpacity onPress={this.backPressed}>
                                <Icon name='close' />
                            </TouchableOpacity>
                         </Left>
                        
                        <Body>
                            <Text style={{ marginTop : 9}}>
                                Sending To: {this.state.eth_address}
                            </Text>
                        </Body>

                        <Right>
                        </Right>
                </Header>
                
                    {/* Input for account info */}
                        <Item success style={accountInputStyles}>
                            <Input 
                            placeholder='Enter Amount to Send' 
                            keyboardType="decimal-pad"
                            autoFocus={true}
                            onChangeText={(e) => this.setState({ amount : e})}
                            />
                            <Icon name='checkmark-circle' />
                        </Item>
                    
                     {/* Payment Button */}
                        <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                            <Button onPress={this.sendCUSD}>
                                    <Text>
                                        Send CUSD
                                    </Text>
                            </Button>
                        </View>



                    </View>
                </Modal> 

          {/*  Sending CUSD Modal  */}
                         <Modal                
                visible={this.state.sendingModal} setHidden={false}>
                    <View>
                
                 <Header>

                        <Left>                         
                         </Left>
                        
                        <Body>
                            <Text style={{ marginTop : 9}}>
                                Transaction
                            </Text>
                        </Body>

                        <Right>
                        </Right>

                </Header>
                     
                     {this.state.sendSuccess ? <View>
                         
                     <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                         <Text style={{ textAlign : 'center', fontSize : 22}}>
                             Successfully Sent CUSD!
                         </Text>
                    </View>

                    <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                         <Text style={{ textAlign : 'center', fontSize : 14, marginTop : 33, width : 297}}>
                             To: {this.state.eth_address}
                         </Text>
                    </View>

                    <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                         <Text style={{ textAlign : 'center', fontSize : 22, marginTop : 10}}>
                             Amount: {this.state.amount}
                         </Text>
                    </View>


                    <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                        
                        <Button onPress={() => {
                            this.setState({
                                sendingModal : false,
                                isAddress : false,
                            })

                            this.refreshBalance();

                            
                        }}>
                         <Text>
                             Close
                         </Text>
                        </Button>
                    </View>



                     </View> : <View>

                        {/* Spinner Icon */}
                        <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                                                                    {/*  Activity Indicator  */}
                                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
      
                        <View style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                                                 {/*  Activity Indicator  */}
                                        <Text style={{ textAlign : 'center'}}>
                                            Sending {this.state.amount} CUSD to {this.state.eth_address}
                                        </Text>
                        </View>
      
                     </View>}
                 



                    </View>
                </Modal> 

            




          </View>
      )
  }

}

module.exports = SendPayments;

