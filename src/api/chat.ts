import { OPENAI_API_KEY } from "@/lib/env";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { OpenAI } from "openai";

const router = Router();
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

router.post("/generate", async (req, res, next) => {
  try {
    const { prompt, language } = req.body;
    const completion = openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert programmer in ${language}. Your task is to generate new code strictly based on the given instructions. Do not include comments, explanations, or additional information, just clean, functional code.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const result = await completion;
    res
      .status(StatusCodes.OK)
      .json({ message: result.choices[0].message.content });
  } catch (error) {
    next(error);
  }
});

export default router;
