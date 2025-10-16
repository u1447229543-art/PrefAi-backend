import asyncHandler from "express-async-handler";
import { createUserTokens } from "../common/services/passport-jwt.service";
import { createResponse } from "../common/helper/response.hepler";
import { type Request, type Response } from "express";
import * as userService from "../user/user.service";
import * as adminService from "./admin.service";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = createUserTokens(req.user!);
  const updateData: any = { refreshToken: tokens.refreshToken };

  await userService.editUser(req.user!._id, updateData);
  let userInfo = await userService.getUserById(req.user!._id);
  res.send(
    createResponse({
      ...tokens,
      userInfo,
    })
  );
});

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res.send(createResponse(result, "User created sucssefully"));
});

export const getAllDocuments = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllDocuments();
    res.send(createResponse(result, "Documents retrieved successfully"));
  }
);

export const deleteDocument = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "File ID is required",
      });
      return;
    }

    const result = await adminService.deleteDocument({ id });
    res.send(createResponse(result, "Documents deleted successfully"));
  }
);
