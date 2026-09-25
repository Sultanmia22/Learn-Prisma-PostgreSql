import express from 'express'
import { studentRouter } from './studentRoutes.ts'
import { productRouter } from './productRoutes.ts'

const router = express.Router()

const moduleRoute = [
    {
        path: '/student',
        route : studentRouter
    },

    {
        path: '/product',
        route: productRouter
    }
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router