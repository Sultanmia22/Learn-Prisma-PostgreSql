import type { Request, Response } from "express";
import { prisma } from "../db.ts";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product Create Successfully!",
      data: product,
    });
  } catch (er: unknown) {
    const errorMsg = er instanceof Error ? er.message : "Something went wrong!";
    res.status(500).json({ success: false, message: errorMsg });
  }
};

const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const tag = await prisma.tag.create({
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: "Tag Create Successfully!",
      data: tag,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      const errorMsg = er.message;
      res.status(500).json({
        success: false,
        message: errorMsg || "Something went wrong!",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const addTagToProduct = async (req: Request, res: Response) => {
  try {
    const { productId, tagId } = req.body;
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },

      include: { tags: true },
    });

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: product,
    });
  } catch (er: unknown) {
    const errorMsg = er instanceof Error ? er.message : "Something went wrong!";
    res.status(500).json({ success: false, message: errorMsg });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { tags: true },
    });
    res.json(product);
  } catch (er: unknown) {
    const errorMsg = er instanceof Error ? er.message : "Something went wrong!";
    res.status(500).json({ success: false, message: errorMsg });
  }
};

const getTagById = async (req: Request, res: Response) => {
  try {
    const tag = await prisma.tag.findUnique({
        where: {id: Number(req.params.id)},
        include: {products: true}
    });

    res.status(200).json({
        success: true,
        message: 'Tag get Successfully!',
        data: tag
    })

  } catch (er: unknown) {
    const errorMsg = er instanceof Error ? er.message : "Something went wrong!";
    res.status(500).json({ success: false, message: errorMsg });
  }
};

export const proudctController = { createProduct, createTag, addTagToProduct, getProductById,getTagById };
