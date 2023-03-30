const express = require('express');
const Connection = require('./connection');
const app = express();

app.use(express.static(__dirname + '/public')); //Todos tus archivos html, css, js deben estar en una carpeta public
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/review', (req, res) => {
    const { user, movie, rating } = req.body;
    Connection.query(
        'INSERT INTO review (user, movie, rating) VALUES (?, ?, ?)',
        [user, movie, rating],
        (err, result) => {
            console.log(err, result);
            if (err) return res.sendStatus(500);
            if (result?.affectedRows === 1) return res.sendStatus(200);
            else return res.sendStatus(500);
        },
    );
});

//Conexion y consulta a la BD
app.get('/getReviews', async (req, res) => {
    Connection.query('SELECT * FROM review', (err, result) => {
        console.log(err, result);
        if (err) return res.sendStatus(500);
        res.status(200).send(result);
    });
});

const port = 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}.`));
