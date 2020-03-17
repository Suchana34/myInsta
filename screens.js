import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Feed from './components/feed';
import Upload from './components/upload';
import Profile from './components/profile';

import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

const MainStack = createBottomTabNavigator(
  {
    Feed: {screen: Feed},
    Upload: {screen: Upload},
    Profile: {screen: Profile}
  }
);

export default class screen extends React.Component{
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