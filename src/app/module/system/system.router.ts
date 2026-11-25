import { Router } from "express";
import * as systemController from "@/app/module/system/system.controller.js";

const systemRouter = Router();

systemRouter.get("/", systemController.dbConnection);

export default systemRouter;
