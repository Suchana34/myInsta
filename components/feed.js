import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {auth,database,f} from "../config/config";

class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photo_feed: [0,1,2,3,4],
            refresh: false, //default setting
            loading: true
        };
    }

    componentDidMount = () => {
        //load feed from database
        this.loadFeed();
    }

    pluralCheck = (s) => {
        if(s==1){
            return ' ago';
        }
        else{
            return  's ago';
        }
    };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp*1000);
        var seconds = Math.floor((new Date() - a)/ 1000);
        var interval = Math.floor(seconds/365*24*60*60);
        if(interval > 1){
            return interval + ' year' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds/30*24*60*60);
        if(interval > 1){
            return interval + ' month' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds/24*60*60);
        if(interval > 1){
            return interval + ' day' + this.pluralCheck(interval);
        }
        
        var interval = Math.floor(seconds/60*60);
        if(interval > 1){
            return interval + ' hour' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds/60);
        if(interval > 1){
            return interval + ' min' + this.pluralCheck(interval);
        }
    };

    loadFeed = () => {
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var that = this;
        //fetch photos from the photos child element in the database
        database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() ! == null);
            if(exists) data = snapshot.val();
            var photo_feed = that.state.photo_feed;

            for(var photo in data){
                var photoObj =data[photo];
                database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
                    
                    const exists = (snapshot.val() ! == null);
                    if(exists) data = snapshot.val();

                        photo_feed.push({
                            id: photo,
                            url: photoObj.url,
                            caption: photoObj.caption,
                            posted: that.timeConverter(photoObj.posted),
                            author: data
                        });

                    that.setState({
                        refresh: false,
                        loading: false
                    });

                }).catch(error => console.log(error));
            }
        });
    };

    //function in order to refresh the page/result after the page is being refreshed
    loadNew = () => {
        this.loadFeed();    
    }

    render(){
        return(
            <View style = {{flex: 1}}>

                <View>
                    <Text>Feed</Text>
                </View>

                {this.state.loading == true ? (
                    <View>
                        <Text>Loading...</Text>
                    </View>

                    ):(

                    <FlatList 
                        refreshing = {this.state.refresh}
                        onRefresh = {this.loadNew}
                        data = {this.state.photo_feed}
                        keyExtractor = {(item, index) => index.toString()}
                        style = {{flex: 1, }}
                        renderItem = {({item, index}) => (

                            <View key={index}>

                                <Text>{item.posted}</Text>
                                <Text>{item.author}</Text>

                                <View><Image source = {{url: item.url}}
                                        style = {{
                                            resizeMode: 'cover',
                                            width: '100%',
                                            height: '275px',
                                        }}>
                                        </Image>
                                </View>
                                <View>
                                        <Text>{item.caption}</Text>
                                        <Text>View comments here</Text>
                                </View>
                            </View>
                            
                        )}
                    ></FlatList>

                )}

            </View>
        )
    }
}

export default Feed;