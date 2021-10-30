//Importacion de modulos necesarios
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
//Importacion de rutas
const dashboardRoutes = require('./Routes/dashboard')
const authRoutes = require('./Routes/auth')
const verifyToken = require('./Routes/validate-token')
const UsersRoutes = require('./Routes/users')
const PersonRoutes = require('./Routes/person')


//crear una constante llamada uri donde almacenaremos el string de conexión a la base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@jireth.xjgqd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Conectado a la base de datos')
})
.catch((e) => {
  console.log('Database error', e)
})

var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}

const app = express()

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas de mi api
app.use('/api', authRoutes);
app.use('/api/user', UsersRoutes);
app.use('/api/person', PersonRoutes);
app.use('/api/dashboard', verifyToken, dashboardRoutes);
app.get('/',verifyToken, (req, res) => {
  res.json({ mensaje: 'Ubicacion raiz de la API' });
});

//configuracion puerto de escucha servidor
const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
