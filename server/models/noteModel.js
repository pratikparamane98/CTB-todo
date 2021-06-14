const mongoose = require('mongoose')

// A Mongoose schema defines the structure of the document, default values, validators, etc., 
// whereas a Mongoose model provides an interface to the database for creating, querying, updating, 
// deleting records, etc.


const notesSchema = new mongoose.Schema({ //here we are creating a  mongoose schema i.e we are giving a particular structue to our document

    title:String
    // genre:String,
    // year:Number

    

})

const Note = mongoose.model('Note',notesSchema);//here ew are creeating a mongoose model on which we can perform CRUD later on
module.exports = Note;//here we are exporting the model