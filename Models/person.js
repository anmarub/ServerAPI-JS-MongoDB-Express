//importo mongose para poder usar el modelo 
const mongoose = require('mongoose');

//creo el esquema de la coleccion users
const personShema = mongoose.Schema({
    typeDocument: {
        type: String,
        required: true,
        min: 6,
    },
    idDocument: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        requiresd: true,
        min: 6,
    },
    lastname: {
        type: String,
        requiresd: true,
        min: 6,
    },
    address: {
        type: String,
        requiresd: true,
        min: 6,
    },
    email: {
        type: String,
        requiresd: true,
        min: 6,
    },
    phone: {
        type: String,
        requiresd: true,
        min: 6,
    },
    cellPhone: {
        type: String,
        requiresd: true,
        min: 6,
    },
    linkWeb: {
        type: String,
        requiresd: true,
        min: 6,
    },
    description: {
        type: String,
        requiresd: true,
        min: 6,
    },
});

module.exports = mongoose.model('Person', personShema);