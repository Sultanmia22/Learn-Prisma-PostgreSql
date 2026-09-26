import express from "express"
import { authorController } from "../controllers/author.controller.ts";

const router = express.Router();

router.post('/create/authors',authorController.createAuthor)
router.get('/getall/authors',authorController.getAllAuthors)
router.get('/getauthor/:id',authorController.getAuthorById)
router.patch('/updateauthor/name/:id',authorController.updateAuthor)
router.delete('/deleteauthor/name/:id',authorController.deleteAuthor)

export const authorRouter = router