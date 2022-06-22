const socket = io.connect();

//----------PRODUCTO-------------------//

const title = document.getElementById("nombre")
const price = document.getElementById("precio")
const thumbnail = document.getElementById("foto")
const formulario = document.getElementById("formAgregarProducto")

formulario.addEventListener( "submit", e => {
    e.preventDefault()
    const producto = {
        title: formulario[0].value,
        price: formulario[1].value,
        thumbnail: formulario[2].value
    }
    console.log(producto)
    socket.emit("update", producto)
    formulario.reset()
})

socket.on('productos', productos => {

    tablaProductos(productos).then(htmlProductos => {
        document.getElementById('productos').innerHTML = htmlProductos
    })
});

function tablaProductos(productos) {
    return fetch('views/productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const htmlProductos = template({ productos })
            return htmlProductos
        })
}

// ------------- CHAT ----------------//

const username = document.getElementById("username");
const message = document.getElementById("texto");


const formChat = document.getElementById('formChat')
formChat.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { autor: username.value, texto: texto.value }
    socket.emit('nuevoMensaje', mensaje);
    formChat.reset()
    
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = addMessage(mensajes)
    document.getElementById('messages').innerHTML = html;
})

function addMessage(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}