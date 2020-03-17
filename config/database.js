import {database} from './config';

//set data
database.ref('pathname/child').set("value!");

//update data
var updates = {};
updates['/testing'] = 'Datbase';
database.ref().update(updates);

//delete data
database.ref('/testing').remove();

//fetch data
database.ref('refname').child('childname').once('value').then(function(snapshot){
    const exists = (snapshot.val()!== null);
    //if the user exists in the database then return the user variable with the returned snapshot
    if(exists) data = snapshot.val();
    console.log('Single value: ' , data);
}).catch(error => console.log(error));