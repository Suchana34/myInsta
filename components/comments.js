import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';

class Upload extends React.Component{
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
                <Text>Comment</Text>
            ):(
                <Text>Please login to comment on a photo</Text>
            )}
            </View>
        )
    }
}

export default Upload;