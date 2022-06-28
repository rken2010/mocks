import { Router } from 'express'
import { generateProduct } from '../utils/mocks.js'

const routerTest = new Router()

routerTest.get('/api/productos-test', (req, res) => { 
    res.json(generateProduct(5))
    console.log('test')
})

export default routerTest;