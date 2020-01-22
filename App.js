import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
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

    /*auth.signOut().then(() => {
      console.log('logged out successful');
    }).catch((error) => {
      console.log('Error:', error);
    });*/

    f.auth().onAuthStateChanged(function(user){
      if(user){
        //logged in
        console.log('you are logged in');
      }
      else{
        //logged out
        console.log('you are logged out');
      }
    });  
  }

  onChangeText(key, val){
    this.setState({ [key]: val });
  }
  
  async loginwithfacebook () {

      
    Facebook.initializeAsync('2509115979215233');
    
    const{type, token} = await Facebook.logInWithReadPermissionsAsync(
      '2509115979215233',
      { permissions: ['public_Profile']}
    );
    if (type==='success'){
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      auth.signInWithCredential(credentials).catch((error)=>{
        console.log('Error',error);
      });
    }
  }


  SignUp(email, password) {
    try {
          auth.createUserWithEmailAndPassword(email, password).then(user => {console.log(user);});
    } catch (error) {
      alert(error.toString(error));
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign Up'
          onPress={() => this.SignUp(this.state.email, this.state.password)}
        />
        <Button
          onPress = {() => this.loginwithfacebook()} 
          title = 'Login With Facebook'
        />
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