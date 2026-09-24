import express from 'express'
import { studentController } from '../controllers/studentController.ts'

const router = express.Router()

router.post('/createStudent',studentController.createStudent)
router.post('/createIdCard',studentController.createIdCard)
router.post('/students/:id',studentController.getStudentById)

export const studentRouter = router