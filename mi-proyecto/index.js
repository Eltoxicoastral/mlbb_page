const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia si tienes otro usuario
    password: '', // Cambia si tienes una contraseña
    database: 'mobile_legends'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para manejar el formulario
app.post('/usuarios', (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const query = 'INSERT INTO usuarios (nombre, correo, mensaje) VALUES (?, ?, ?)';
    
    connection.query(query, [nombre, correo, mensaje], (err, results) => {
        if (err) {
            return res.status(500).send('Error al guardar los datos');
        }
        // Retornar el ID del nuevo registro
        res.status(200).send(`Datos guardados correctamente con ID: ${results.insertId}`);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
