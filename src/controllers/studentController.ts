import type { Request, Response } from "express";
import { prisma } from "../db.ts";
import { date } from "zod";

const createStudent = async(req: Request, res: Response) => {
    const {name} = req.body;

    const student = await prisma.student.create({
        data: {
            name
        }
    })
}


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