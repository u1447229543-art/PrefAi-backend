import { Router } from "express";
import passport from "passport";
import * as adminController from "./admin.controller";
import * as userController from ".././user/user.controller";
const router = Router();

router
  .post(
    "/login",
    passport.authenticate("admin-login", { session: false }),
    adminController.login
  )
  .post("/", adminController.createAdmin)
  .post("/user", userController.createUser)
  .delete("/user/:id", userController.deleteUser)
  .get("/documents", adminController.getAllDocuments)
  .delete("/documents/:id", adminController.deleteDocument);

export default router;
