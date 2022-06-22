// -------------------- IMPORTACIONES -----------------------//
const { catalogo, mensajes } = require('./script');
const express = require('express')
const {Router} = express

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')


// ---------------- API -------------------------//

const app = express()

// ---------------- HTTP -------------------------//

const httpServer = new HttpServer(app);

//------------------------- SOCKET---------------------- //

const io = new Socket ( httpServer )



//-------------------------  CONFIGURACION DEL SOCKET---------------------- //

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');
    //------------------Productos ----------------------//
    socket.emit('producto', catalogo.listarAll());
    socket.on('update', producto => {
        catalogo.guardar(producto);
        io.sockets.emit('productos', catalogo.listarAll());
    });
    //------------------Mensajes----------------------//
    socket.emit('mensajes', await mensajes.listarAll());
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajes.listarAll());
    })


});



//------------------------- MIDDLEWARE---------------------- //

app.use ( express.static( `public` ));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//------------------------- RUTAS---------------------- //

const productoTest = Router()

productoTest.get('/api/productos-test', (req, res) => { res.json(generateProducts(5)) })
app.use('/api/productos-test', productoTest)
// ----------------------SERVIDOR ESCUCHANDO---------------------- //

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})
