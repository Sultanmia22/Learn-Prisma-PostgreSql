import express from 'express'
import { studentRouter } from './studentRoutes.ts'
import { productRouter } from './productRoutes.ts'
import { authorRouter } from './author.routes.ts'

const router = express.Router()

const moduleRoute = [
    {
        path: '/student',
        route : studentRouter
    },

    {
        path: '/product',
        route: productRouter
    },

    {
        path: '/authors',
        route: authorRouter
    }
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router