import express from 'express'
import { proudctController } from '../controllers/productController.ts'

const router = express.Router()

router.post('/create-product',proudctController.createProduct)

export const productRouter = router