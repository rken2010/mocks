const sqlite = {
    client: 'sqlite3',
    connection: {
        filename: './db/Ecommerce.sqlite'
    },
    useNullAsDefault: true
};

module.exports = sqlite;