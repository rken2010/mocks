import { generateProduct , print, generateMessage } from './mocks.js';
import { normalize, schema } from 'normalizr';

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author');

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize({ id: 'mensajes', mensajes: mensajesConId }, schemaMensajes)

export { normalizarMensajes }



// //------------- PRUEBA DE FUNCIONALIDADES -----------------//
const mjeNorm = normalizarMensajes(generateMessage(2));

console.log(print( mjeNorm) );

