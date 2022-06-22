const Contenedor = require('./Contenedor.js');

const mysql = require('../options/mysql');
const sqlite = require('../options/sqlite');

const catalogo = new Contenedor(mysql, 'products');
const mensajes = new Contenedor(sqlite, 'messages');

catalogo.crearTabla(
    (tabla) => {
        tabla.increments('id').primary();
        tabla.string('name', 50).notNullable();
        tabla.float('price').notNullable();
        tabla.string('thumbnail', 255).notNullable();
    }
);

mensajes.crearTabla(
    (tabla) => {
        tabla.increments('id').primary();
        tabla.string('email', 50).notNullable();
        tabla.string('text', 200).notNullable();
        tabla.string('date', 25).notNullable();
    }
);

module.exports = { catalogo, mensajes };