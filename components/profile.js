import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {auth,database,f} from "../config/config";


class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false,

        };
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedIn: true,
                });
            }
            else{
                that.setState({
                    loggedIn: false,
                });
            }
        });
    }

    render(){
        return(
            <View>
            {this.state.loggedIn == true ? (
                <View style = {{flex: 1}}>

                    <View style = {{paddingTop: 5, height: 40}}>
                        <Image source = {{url:''}} style={{borderRadius: 3}} />
                        <TouchableOpacity>Name</TouchableOpacity>
                        <TouchableOpacity>status</TouchableOpacity>
                    </View>

                </View>


            ):(
                <Text>Login first</Text>
            )}
            </View>
        )
    }
}

export default Profile;