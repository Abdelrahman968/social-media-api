import { Router } from "express";
import systemRouter from "@/app/module/system/system.router.js";
import authRouter from "@/app/module/auth/auth.router.js";

const router = Router();

router.use("/system", systemRouter);
router.use("/auth", authRouter);

export default router;
