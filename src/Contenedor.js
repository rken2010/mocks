const knex = require('knex');

class Contenedor {
    constructor(options, tabla) {
        this.knex = knex( options );
        this.options = options;
        this.tabla = tabla;
      
    }

    crearTabla(cb) {
        return this.knex.schema.hasTable(this.tabla)
        .then(exists => {
            if (!exists) 
                return this.knex.schema.createTable(this.tabla, cb);
            else return false;
        })
        .then((res) => {
            res ? console.log(`La tabla ${this.tabla} fue creada`) 
            : console.log(`La tabla ${this.tabla} ya existe`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.cerrar();
        });
    };

    reconectar() {
        this.knex = knex(this.options)
    }

  
    listar(id) {
        this.reconectar()
        const elem = this.productos.find(elem => elem.id == id)
        return elem || { error: `elemento no encontrado` }
        
    }

    listarAll() {
        this.reconectar()
        return this.knex( this.tabla ).select('*')
        .then((res) => res)
        .catch((err) => console.log(err))
        .finally(() => this.cerrar());
    }

    guardar(prod) {
        this.reconectar()
        return this.knex(this.tabla).insert(prod)
    }

    actualizar(elem, id) {
        const newProd = { id: Number(id), ...elem }
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: `elemento no encontrado` }
        }
    }

    borrar(id) {
        return this.knex.from(this.tabla).where('id', id).del()
    }

    borrarAll() {
        return this.knex.from(this.tabla).del()
    }

    cerrar() {
        this.knex.destroy()
    }
}

module.exports = Contenedor;