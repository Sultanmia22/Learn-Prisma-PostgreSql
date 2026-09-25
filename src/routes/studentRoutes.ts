import express from 'express'
import { studentController } from '../controllers/studentController.ts'

const router = express.Router()

router.post('/createStudent',studentController.createStudent)

router.post('/createIdCard',studentController.createIdCard)

router.get('/students/:id',studentController.getStudentById)

router.post('/createstudent_id',studentController.createStudentWithIdCard)

router.delete('/delete-student/:id',studentController.deleteStudent)

router.post('/student/add-to-group',studentController.addStudentToGroup)

router.post('/add/student/group',studentController.addStudentToGroup)

export const studentRouter = router