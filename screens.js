import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Feed from './components/feed';
import Upload from './components/upload';
import Profile from './components/profile';
import userProfile from './components/userProfile';
import comments from './components/comments';

import {auth} from './config/config';

import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

const TabStack = createBottomTabNavigator(
  {
    Feed: {screen: Feed},
    Upload: {screen: Upload},
    Profile: {screen: Profile}
  }
);

const MainStack = createStackNavigator(
  {
    Home: {screen: TabStack},
    User: {screen: userProfile},
    Comments: {screen: comments}
  },

  {
    initialRouteName: 'Home',
    mode: 'modal',

  }
);

export default class screen extends React.Component{

  login = async() => {
    //force user to log in
    try{
      let user = await auth.signInWithEmailAndPassword('test@gmail.com', 'password');
    }
    catch(error){
      console.log(error);
    }
  }

  constructor(props){
    super(props)

    this.login();
  }

  render(){
    return(
      <div>
        <MainStack />
      </div>
    )
  }
}

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});