import React from 'react';
import {TextInput,ActivityIndicator,Text, View, Image, TouchableOpacity} from 'react-native';
import {auth,database,f, storage} from "../config/config";
import {ImagePicker, Permissions} from 'expo'; //need these permissions in order to pick images and grant permissions from user's phone


class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false,
            imageID: this.uniqueID(),
            imageSelected: false,
            uploading: false,
            caption: ''
        };
    }

    _checkPermissions = async() => {
        //this need to be async because we have to wait for the user to grant permission
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({camera: status})

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        this.setState({cameraRoll: statusRoll})       
    }

    randomgenerator = () => {
        //generates a random unique image id
        return (Math.floor((Math.random() + 1)*100000)
        .toString(16)
        .substring(1));
    }

    uniqueID = () => {
        return this.randomgenerator() + ' - '+ this.randomgenerator() + ' - ' + this.randomgenerator();
    }

    findNewImage = async() => {
        this._checkPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            quality: 1 //highest quality image
        });

        if(!result.cancelled){
            console.log('upload image');
            this.setState({
                imageSelected: true,
                imageID: this.imageID(),
                uri: result.uri
            });
            //this.uploadImage(result.uri);
        }
        else{
            console.log('cancel');
            this.setState({
                imageSelected: false
            });
        }
    }

    uploadImage = async(uri) => {
        //instructions for storage inside the database
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageID = this.state.imageID;

        //extensions allowed
        var re = /(?:\.([^.]+))?$/; //this will check the last dot and the extension after it
        var ext = re.exec(uri)[1]; // [1] means the 2nd part of the array which is evrything after the dot
        this.setState({
            currentFileType: ext
        });
        const response = await fetch(uri);
        const blob = await response.blob(); //returning the response to a blob to upload in our storage
        var filePath = imageID + '.' + that.state.currentFileType;

        const ref = storage.ref('user/'+ userid+'/img').child(filePath);
        var snapshot = ref.put(blob).on('state_changed', snapshot => {
            console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
        });
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
                <Text>Upload</Text>
                <TouchableOpacity
                    onPress = {()=> this.findNewImage()}
                ><Text>Select photo</Text></TouchableOpacity>
                </View>
            ):(
                <Text>Login first</Text>
            )}
            </View>
        )
    }
}

export default Upload;