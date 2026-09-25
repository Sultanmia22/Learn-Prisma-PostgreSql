import express from 'express'
import { proudctController } from '../controllers/productController.ts'

const router = express.Router()

router.post('/create-product',proudctController.createProduct)
router.post('/create-tag',proudctController.createTag)
router.post('/product/add-tag',proudctController.addTagToProduct)
router.get('/product/:id',proudctController.getProductById)
router.get('/tag/:id',proudctController.getTagById)

export const productRouter = router