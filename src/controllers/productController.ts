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
        message: 'Tag Create Successfully!',
        data: tag
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


export { createProduct, createTag };