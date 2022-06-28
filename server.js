import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as socket } from 'socket.io';
import routerTest from './src/routes/routerTest.js';

// Crear el servidor express y el servidor http //
const app = express();
const httpServer = new HttpServer(app);
const io = new socket(httpServer);

// Configurar el servidor express //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta test productos //

app.use( routerTest );

// inicio el servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})
