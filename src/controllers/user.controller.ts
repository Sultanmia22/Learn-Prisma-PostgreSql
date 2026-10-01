import type { Request, Response } from "express";
import { prisma } from "../db.ts";
import { success } from "zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, role } = req.body;

    const users = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return res.status(500).json({
        success: false,
        message: er.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const createProfile = async (req: Request, res: Response) => {
  try {
    const { bio, userId } = req.body;

    const profile = await prisma.profile.create({
      data: { bio, userId },
    });

    res.status(200).json({
      success: true,
      message: "Profile Created Successfully!",
      data: profile,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return res.status(500).json({
        success: false,
        message: er.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, published, authorId } = req.body;

    const posts = await prisma.post.create({
      data: {
        title,
        published,
        authorId,
      },
    });

    res.status(200).json({
      success: false,
      message: "Post Create Successfully!",
      data: posts,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      res.status(500).json({
        success: false,
        message: er.message || "Something went wrong!",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const createCategories = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const categories = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(200).json({
      success: false,
      message: "Category create successfully!",
      data: categories,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return res.status(500).json({
        success: false,
        message: er.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//  Get API endpoint
const getUser = async (req: Request, res: Response) => {
  try {
    
    const users = await prisma.user.findMany({
        where: {
            /* name: {
                contains: "n",
            } */

            /* id: {
                notIn: [1,2]
            } */

            /* id: {
                not: {
                    gt: 2
                }
            } */

           /*  OR: [
                {
                    id: {
                        not: {
                            gt: 2
                        }
                    }
                },

                {
                    name: {
                        contains: "a"
                    }
                }
            ] */
        }
    })

    res.status(200).json({
        success: true,
        message: "Fetched Successfully!",
        data: users
    })

  } catch (er: unknown) {
    if (er instanceof Error) {
      return res.status(500).json({
        success: false,
        message: er.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const userController = {
  createUser,
  createProfile,
  createPost,
  createCategories,
  getUser
};
