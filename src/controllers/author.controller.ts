import type { Request, Response } from "express";
import { prisma } from "../db.ts";

const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const author = await prisma.author.create({
      data: { name },
    });

    res
      .status(201)
      .json({ success: true, message: "Author Created", data: author });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json({ success: true, message: "Fetched", data: authors });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ success: true, message: "Fetched", data: author });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const author = await prisma.author.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });

    res
      .status(200)
      .json({ success: true, message: "Author Updated", data: author });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.delete({
      where: { id: Number(req.params.id) },
    });
    res
      .status(200)
      .json({ success: true, message: "Author Deleted", data: author });
  } catch (er: unknown) {
    const errorMessage =
      er instanceof Error ? er.message : "Something went wrong";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const authorController = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
