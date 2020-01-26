import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {f,auth,data} from './config/config';
import * as Facebook from 'expo-facebook';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    
    /*this.state = {
      email: "",
      password: ""
    };*/


    this.state = {
      loggedin: false,
    };

    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        that.setState({
          loggedin: true
        });
        //logged in
        console.log('you are logged in');
      }
      else{
        that.setState({
          loggedin: false
        });
        //logged out
        console.log('you are logged out');
      }
    });  
  }
  
  loginUser = async(email, pass) => {
    if(email!= '' && pass!= ''){
      try{
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      alert('missing email or password')
    }
  }

  SignUp(email, password) {
    try {
          auth.createUserWithEmailAndPassword(email, password).then(user => {console.log(user);});
    } catch (error) {
      alert(error.toString(error));
    }
  }


  signUserout = () => {
    auth.signOut().then(() => {
      console.log('logged out successful');
    }).catch((error) => {
      console.log('Error:', error);
    });

  };


  async loginwithfacebook (){

      
    Facebook.initializeAsync('APP ID');
    
    const{type, token} = await Facebook.logInWithReadPermissionsAsync(
      'APP ID',
      { permissions: ['public_Profile']}
    );
    if (type==='success'){
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      auth.signInWithCredential(credentials).catch((error)=>{
        console.log('Error',error);
      });
    }
  }

  
  render(){
    return (
      <View style={styles.container}>
      {this.state.loggedin == true ? (
        <View>
        <Text>Logged in ...</Text>
        <Button 
          title = "Sign out"
          onPress = { () => this.signUserout() }
        />
        </View>
      ):
      (
        <View>
        {this.state.emailloginview == true(
        ////() => this.SignUp(this.state.email, this.state.password)////
        <View>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({email: text})}
          value = {this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({pass: text})}
          value = {this.state.pass}
        />
        <Button
          onPress = {() => this.loginUser(this.state.email, this.state.pass)} 
          title = 'Login'
        /> 
        </View>
        )}

        <Button
          title='Login with Email'
          onPress={this.setState({emailloginview: true})}
        />
        
        <Button
          onPress = {() => this.loginwithfacebook()} 
          title = 'Login With Facebook'
        />
        </View>
      )
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})