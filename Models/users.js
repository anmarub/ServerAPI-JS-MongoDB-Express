//importo mongose para poder usar el modelo 
const mongoose = require('mongoose');

//creo el esquema de la coleccion users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);