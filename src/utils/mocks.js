import  util from 'util';
import { faker } from "@faker-js/faker";
faker.locale ="es";

function generateProduct( quantity) {
   let products = [];
    for (let i = 0; i < quantity; i++) {
        let product = {
            id: faker.random.numeric(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumnail: faker.image.imageUrl(),
        };
        products.push(product);
    }
    return products
}

function generateMessage( quantity) {
    let messages = [];
    for (let i = 0; i < quantity; i++) {
        let message = {
            author: {
                id: faker.internet.exampleEmail(),
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                edad: faker.mersenne.rand(18, 80),
                alias: faker.internet.userName(),
                avatar: faker.image.avatar(),
            },
            text: faker.lorem.sentence(),
        }
        messages.push(message);
    }
    return messages
}
function print( obj ){
    console.log(util.inspect(obj, false, 12 , true));
}

export { generateProduct, generateMessage, print };

//------------- PRUEBA DE FUNCIONALIDADES -----------------//
/*
const products = generateProduct(10);
const messages = generateMessage(10);

print(messages);


*/