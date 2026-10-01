import express from 'express'
import { userRoute } from './user.route.ts'


const router = express.Router()

const moduleRoute = [
    {
        path: '/users',
        route: userRoute
    }
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router