import type { Request, Response } from "express";
import { prisma } from "../db.ts";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const student = await prisma.student.create({ data: { name } });
    res.status(201).json({
      success: true,
      message: "Student Created Successfully!",
      data: student,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const createIdCard = async (req: Request, res: Response) => {
  try {
    const { cardNumber, studentId } = req.body;
    const idCard = await prisma.idCard.create({
      data: { cardNumber, studentId },
    });
    res.status(201).json({
      success: true,
      message: "IdCard Created Successfully",
      data: idCard,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(req.params.id) },
      include: { idCard: true, groups: true },
    });
    res.status(200).json({
      success: true,
      message: "Find your Information",
      data: student,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const createStudentWithIdCard = async (req: Request, res: Response) => {
  try {
    const { name, cardNumber } = req.body;

    if (!name || !cardNumber) {
      return res.status(400).json({
        success: false,
        message: "name and cardNumber are required!",
      });
    }

    const student = await prisma.student.create({
      data: { name, idCard: { create: { cardNumber } } },
      include: { idCard: true },
    });

    res.status(201).json({
      success: true,
      message: "Create Student Successfully!",
      data: student,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({
      success: true,
      message: "Student Delete Successfully!",
      data: student,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};


const createStudentGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const group = await prisma.group.create({
      data: { name },
    });

    res.status(201).json({
            success: true,
            message: 'Group Created Successfully!',
            data: group
        });

  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};


const addStudentToGroup = async (req: Request, res: Response) => {
  try {
    const { studentId, groupId } = req.body;
    const student = await prisma.student.update({
      where: { id: studentId },
      data: { groups: { connect: { id: groupId } } },
      include: { groups: true },
    });
    res.status(200).json({
      success: true,
      message: "Student added to Group Successfully!",
      data: student,
    });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const studentController = {
  createStudent,
  createIdCard,
  getStudentById,
  createStudentWithIdCard,
  deleteStudent,
  addStudentToGroup,
  createStudentGroup
};
