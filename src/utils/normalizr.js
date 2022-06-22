const { normalize, denormalize, schema } = require('normalizr');

const normalizar = normalizr.normalize;

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });

const schemaMensaje = new schema.Entity('message', { author: schemaAuthor }, { idAttribute: 'id' })

const schemaChat = new schema.Entity('chat', { chat: [message]})

const normalizeChat = normalize(chat, schemaChat);
const desnormalizeChat = denormalize(normalizeChat, schemaChat);

const utils = require('utils');