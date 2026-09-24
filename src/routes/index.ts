import express from 'express'
import { studentRouter } from './studentRoutes.ts'

const router = express.Router()

const moduleRoute = [
    {
        path: '/student',
        route : studentRouter
    }
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router