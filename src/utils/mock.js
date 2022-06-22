const faker = require('faker')
faker.locale = "es"

function generateMessage(quantity) {
    let messages = []
    for (let i = 0; i < quantity; i++) {
        messages.push({
            author: {
                id: faker.internet.email(),
                nombre: faker.name.firsname(), 
                apellido: faker.name.lastname(), 
                edad: faker.datatype.number({ min: 10, max: 80, precision: 0.01 }),
                alias: faker.internet.userName(),
                avatar: faker.image.avatar()
            },
            text: faker.lorem.lines()
        })
        
    }
    return messages
}

function generateProducts(quantity) {
    let products = []
    for (let i = 0; i < quantity; i++) {
        products.push({
            id: faker.random.numeric(),
            title: faker.commerce.productName(),
            price:faker.commerce.price(),
            thumnail: faker.image.imageUrl(),
        })
        
    }
    return messages
}

module.exports = { generateMessage, generateProducts }

  