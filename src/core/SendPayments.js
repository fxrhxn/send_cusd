

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


//import _ from 'lodash';
let EthereumTx = require('../ethereumjs-tx');
let ethers = require('../ethers');
let web3 = require('../web3');
let Buffer = require('../buffer').Buffer 




// Button styles. 
let buttonStyles = {
    flexDirection : 'row',
    justifyContent : 'center',
    marginTop : 100
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
          publicKey : "",
          privateKey : "",
      };
    
      this.paymentButtonClicked = this.paymentButtonClicked.bind(this)
      this.nextClicked = this.nextClicked.bind(this)
      this.ethChanged = this.ethChanged.bind(this)
      this.sendCUSD = this.sendCUSD.bind(this) 
      this.clearAccountPressed = this.clearAccountPressed.bind(this)
      this.backPressed = this.backPressed.bind(this)
  }

  componentWillMount(){

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

            //    console.log(publicKey)
           //     console.log(privateKey)
            } else {

              this.props.navigator.push({
                  id : 'CreateAccount'
              })
            }
          } catch (error) {
         //   console.log('Keychain couldn\'t be accessed!', error);
          }
    })()




    // // Create a new ethereum transaction 
 
 

    let ropstenRPC = 'https://ropsten.infura.io/c7b70fc4ec0e4ca599e99b360894b699'

    // Check if there is any keys stored.  
    var web3js = new web3(new web3.providers.HttpProvider(ropstenRPC));

  
    // web3js.eth.getBalance("0xf7D9830175f9c3dBd4ED8471B0b531A3CFfDac3b").then((res) => {
    // console.log(res)
    // })       
    
        /* CREATES A NEW TESTNET ACCOUNT */ 
     // let new_account = web3js.eth.accounts.create();
    
     // TESTNET PUBLIC AND PRIVATE KEYS 
     let publicK = "0x837609B2AC529214897908D9974bA2A7b4D4cA18";
     let privateK = "x2bc282d7d105ae0090bfbf485335946c0d8d66ee490757def96252e1c941d276"

     ///// UNCOMMENT
    let account = "0xf7D9830175f9c3dBd4ED8471B0b531A3CFfDac3b" // my eth account 
    let contract = "0x5A0cd6550810ba38743Ee704743cFf135c072f6E" // CUSD metatoken address 
    let abi = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"stablecoin","type":"address"},{"name":"_amount","type":"uint256"}],"name":"convertCarbonDollar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stablecoin","type":"address"}],"name":"listToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDefaultFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_stablecoin","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blacklisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blacklistedAccount","type":"address"}],"name":"approveBlacklistedAddressSpender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"replayNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stablecoin","type":"address"}],"name":"removeFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaIncreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"stablecoin","type":"address"}],"name":"computeFeeRate","outputs":[{"name":"feeRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isMethodEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenStorage_CD","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaApproveHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stablecoin","type":"address"}],"name":"unlistToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenStorage","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stablecoin","type":"address"}],"name":"getFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stablecoin","type":"address"},{"name":"_amount","type":"uint256"}],"name":"burnCarbonDollar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaTransferHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroyBlacklistedTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newFee","type":"uint256"}],"name":"setDefaultFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRegulator","type":"address"}],"name":"setRegulator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_stablecoin","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaBurnHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"regulator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stablecoin","type":"address"},{"name":"_newFee","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stablecoin","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_nonce","type":"uint256"},{"name":"_reward","type":"uint256"}],"name":"metaBurnCarbonDollar","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"releaseCarbonDollar","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"lock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_regulator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"ConvertedToWT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"feedAmount","type":"uint256"},{"indexed":false,"name":"chargedFee","type":"uint256"}],"name":"BurnedCUSD","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"DestroyedBlacklistedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ApprovedBlacklistedAddressSpender","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldRegulator","type":"address"},{"indexed":true,"name":"newRegulator","type":"address"}],"name":"ChangedRegulator","type":"event"},{"anonymous":false,"inputs":[],"name":"Unlocked","type":"event"},{"anonymous":false,"inputs":[],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
    let to = "0xf7D9830175f9c3dBd4ED8471B0b531A3CFfDac3b"

    web3js.eth.getTransactionCount(publicK, async function (err, nonce) {
        if(err){
            console.log(err)
        }else{
            
           let data = new web3js.eth.Contract(abi,contract).methods.transfer(to, 22).encodeABI()

           let nonce = await web3js.eth.getTransactionCount(publicK);
           let gasPrice = await web3js.eth.getGasPrice()
           let balance = await web3js.eth.getBalance(publicK)
        

           let wallet = new ethers.Wallet("0x2bc282d7d105ae0090bfbf485335946c0d8d66ee490757def96252e1c941d276")
         
           
           // All properties are optional
        let transaction = {
            nonce: nonce,
            gasPrice: "0x" + gasPrice,
            gasLimit: 2100000,
            to: to,
            //value:  0,
            data: data,
            chainId: 3
        }

                var tx = new EthereumTx.Tx({
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: 2100000,
            to: to,
            //value:  0,
            data: data,
            chainId: 3
          });

         let signPromise = wallet.sign(transaction)

         signPromise.then((signedTransaction) => {

            
             //console.log(signedTransaction)

          web3js.eth.sendSignedTransaction(signedTransaction).on('receipt', (receipt) => { 
           
            console.log(receipt)
            
            });

         })
    //     var tx = new EthereumTx.Tx({
    //         nonce: nonce,
    //         gasPrice: gasPrice,
    //         gasLimit: 21000,
    //         to: to,
    //         //value:  0,
    //         data: data,
    //         chainId: 3
    //       });
          
    //      let key_buffer = Buffer.from('0x2bc282d7d105ae0090bfbf485335946c0d8d66ee490757def96252e1c941d276', 'hex')
          
         
    //   //   console.log(key_buffer.buffer)
    //      //Sign the transaction with the private key. 
    //       tx.sign(key_buffer);
          

    //       // Serialize the transaction. 
    //       var raw = tx.serialize().toString('hex');
          
     
    //       // Send the web 3 signed transaction. 
    //       web3js.eth.sendSignedTransaction(raw).on('receipt', function(receipt){ 
    //           console.log(receipt)
            
    //         });

        }
    })
///// UNCOMMENT

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

               {/* Carbon Logo */}
               <View style={{ flexDirection : 'row', justifyContent:'center', marginTop : 88}}>


                <Image source={require('../images/carbon-black.png')} style={{height: 111, width: 333,}}/>

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
              <Button onPress={this.paymentButtonClicked}>
                <Text>
                    Send Payment
                </Text>
              </Button>
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
                                <Button onPress={this.nextClicked}>
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


          </View>
      )
  }

}

module.exports = SendPayments;

