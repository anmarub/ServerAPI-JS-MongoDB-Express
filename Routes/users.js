const router = require('express').Router()
const User = require('../Models/users')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Validacion Esquema de nuevo Usuario
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


router.get('/list', async (req, res) => {
    try{
        const listUser = await User.find()
        res.json(listUser);
    }catch(err){
        res.status(404).json({message: err});
        console.log(err, "Error Al Obtener la informacion");
    }
});

router.get('/:id', async (req, res) => {
    try{
        const SearchUser = await User.findById(req.params.id);
        res.json(SearchUser);
    }catch(err){
        res.status(404).json({message: err});
        console.log(err, "Error Al Obtener la informacion");
    }
})

router.post('/new', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        
        const SearchUser = await User.findById(req.params.id);
        SearchUser.name = req.body.name;
        SearchUser.email = req.body.email;
        SearchUser.password = req.body.password;

        const updatedUser = await SearchUser.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({error})
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser){
            res.status(200).json({message: 'Usuario Eliminado Correctamente!!!'});
        }
        
    }catch{
        res.status(400).json({message: 'Error al eliminar el usuario'});
    }
});

module.exports = router;
