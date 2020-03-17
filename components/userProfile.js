import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { database } from '../config/config';

class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loaded: false,

        };
    }

    checkParams = () => {
        //to check what data has been sent through feed
        //to receive the user id from feed and pass it to next function
        var params = this.props.navigation.state.params;
        if(params){
            if(params.userID){
                this.setState({
                    userID:params.userID,
                });
                
                this.fetchUserInfo(params.userID);
            }
        }
    }

    fetchUserInfo = (userID) => {
        var that = this;
        database.ref('users').child(userID).child('username').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                username: data,
            });
        }).catch(error => console.log(error));

        
        database.ref('users').child(userID).child('name').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                name: data,
            });
        }).catch(error => console.log(error));

        
        database.ref('users').child(userID).child('avatar').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                avatar: data,
                loaded: true
            });
        }).catch(error => console.log(error));
    };

    componentDidMount = () => {

        this.checkParams();


        });
    }
    render(){
        return(
            <View>
            {this.state.loaded == true ? (

                <View>
                <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>Go Back</TouchableOpacity>
                <Text>Photos of user</Text>
                <Image source = {this.state.avatar} />
                <Text>{this.state.name}</Text>
                <Text>{this.state.username}</Text>
                </View>

            ):(
                <Text>Loading</Text>
            )}
            </View>
        )
    }
}

export default Upload;