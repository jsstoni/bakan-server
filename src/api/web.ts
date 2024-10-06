import { JWT_SECRET } from "@/lib/env";
import prisma from "@/lib/prisma";
import { validate_login, validate_register } from "@/lib/validate";
import isAuthorized from "@/middleware/auth/authorized";
import bcrypt from "bcrypt";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const parsedData = validate_register.parse(req.body);
    let { name, email, password, repassword } = parsedData;

    if (password !== repassword) {
      throw new Error("Passwords do not match");
    }

    password = await bcrypt.hash(password, 10);

    const users = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .send({ name: users.name, email: users.email });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const parsedData = validate_login.parse(req.body);
    const { email, password } = parsedData;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res
      .status(StatusCodes.OK)
      .send({ name: user.name, email: user.email, token });

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/admin", isAuthorized, (_, res) => {
  res.send("admin");
});

export default router;
