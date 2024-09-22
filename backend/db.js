const mongoose= require('mongoose');
const { URL } = require('./config');


mongoose.connect(URL)

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
      
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
});



//bank account schema

const accountSchema= new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})




// create a model from the schema

const User=mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);







module.exports={
    User,Account
}