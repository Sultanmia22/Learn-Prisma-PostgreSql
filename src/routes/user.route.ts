import express from 'express'
import { userController } from '../controllers/user.controller.ts'

const router = express.Router()

router.post('/create/user',userController.createUser)
router.post('/create/profile',userController.createProfile)
router.post('/create/post',userController.createPost)
router.post('/create/category',userController.createCategories)

//  Get Route
router.get('/getusers',userController.getUser)

export const userRoute = router