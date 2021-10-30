const router = require('express').Router();
const Person = require('../Models/person')


router.get('/list', async function(req, res) {

    const listPersons = await Person.find();

    if(listPersons) {   
        res.send(listPersons);
    }else{
        res.status(404).json({Message: 'No existen Personas'});
    }
    
});

router.get('/:id', async (req, res) => {
    
    const SearchPerson = await Person.findById(req.params.id);
    
    if(!SearchPerson){
        res.status(404).json({Message: 'Persona no encontrada'});
    }else{
        res.send(SearchPerson);
    }
});

router.post('/new', async (req, res) => {
    
    const NewPerson = new Person({
        typeDocument: req.body.typeDocument,
        idDocument: req.body.idDocument,
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        cellPhone: req.body.cellPhone,
        linkWeb: req.body.linkWeb,
        description: req.body.description,
    });

    try{
        const SavePerson = await NewPerson.save();
        res.send(SavePerson);
    }catch(error){
        res.status(400).json({error})
    }

});

router.put('/:id', async (req, res) => {
    
    const SearchPerson = await Person.findById(req.params.id);

    if(!SearchPerson){
    SearchPerson.typeDocument = req.body.typeDocument;
    SearchPerson.idDocument = req.body.idDocument;
    SearchPerson.name = req.body.name;
    SearchPerson.lastName = req.body.lastName;
    SearchPerson.address = req.body.address;
    SearchPerson.email = req.body.email;
    SearchPerson.phone = req.body.phone;
    SearchPerson.cellPhone = req.body.cellPhone;
    SearchPerson.linkWeb = req.body.linkWeb;
    SearchPerson.description = req.body.description;

    const UpdatePerson = await SearchPerson.save();
    res.status(200).json(UpdatePerson);

    }else{
        res.status(400).json({mensaje: 'La Persona Buscada no se encuentra en la Base de Datos'})
    }


});

router.delete('/:id', async (req, res) => {
    const DeletePerson = await Person.findByIdAndDelete(req.params.id);
    if(DeletePerson){
        res.status(200).json({message: 'Persona Eliminada Correctamente!!!'});
    }else{
        res.status(400).json({message: 'El usuario no se encuentra en la base de datos'});
    }
});


module.exports = router;