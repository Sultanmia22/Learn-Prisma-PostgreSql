import type { Request, Response } from "express";
import { prisma } from "../db.ts";
import { date } from "zod";

// Create Student Api End Point
const createStudent = async(req: Request, res: Response) => {
    const {name} = req.body;

    const student = await prisma.student.create({
        data: {
            name
        }
    })
}

// Create Student  ID Card Api End Point
const createIdCard = async (req: Request, res: Response) => {
    try{

        const {cardNumber, studentId} = req.body

        const idCard = await prisma.idCard.create({
            data: {
                cardNumber,
                studentId
            }
        })

        res.status(500).json({
            success: true,
            messsage: 'Fetch Data Successfully',
            data: idCard
        })

    } catch(er: unknown) {
        if(er instanceof Error) {
            const errorMessage = er.message
            res.status(500).json({
                success: false,
                message: errorMessage || "Something went wrong"
            })
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Get Student Api End Point
const getStudentById = async (req: Request, res: Response) => {
    try{
        const student = await prisma.student.findUnique({
            where: {id: Number(req.params.id)},
            include: {idCard: true}
        });

        res.status(200).json({
            success: true,
            message: 'Find your Information',
            data: student
        })
    }
    catch(er: unknown) {
        if(er instanceof Error) {
            const errorMessage = er.message

            res.status(500).json({
                success: false,
                message: errorMessage || 'Something went worng' 
            })
        }

        res.status(500).json({
            success: false,
            message: 'Something went worng'
        })
    }
}

// Create student and idCard Api end Point (Nested Write)
const createStudentWithIdCard  = async (req: Request, res: Response) => {
    const {name,cardNumber} = req.body;

    console.log("name",name,"cardNumber")

    if(!name || cardNumber) {
        return res.status(400).json({
            success: false,
            message: 'name and cardNumber are required!'
        })
    }

    const student = await prisma.student.create({
        data: {
            name,
            idCard: {
                create: {
                    cardNumber
                }
            }
        },

        include: {idCard: true}
    })

    res.status(200).json({
        success: true,
        message: 'Create Student Successfully!',
        data: student
    });
}

//Delete Student 
const deleteStudent = async (req: Request, res: Response) => {
    try{
        const student = await prisma.student.delete({
            where: {id: Number(req.params.id)}
        })

        res.status(200).json({
            success: true,
            message: "Student Delete Successfully!",
            data: student
        })
    }
    catch(er: unknown) {
        if(er instanceof Error) {
            res.status(500).json({
                success: true,
                message: er.message || 'Something went Wrong'
            })
        }
    }
} 

export const studentController = {
    createStudent,
    createIdCard,
    getStudentById,
    createStudentWithIdCard,
    deleteStudent
}