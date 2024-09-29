import prisma from '@/lib/prisma';
import { generateToken } from '@/lib/utils';
import { validate_snippet } from '@/lib/validate';
import isAuthorized from '@/middleware/auth/authorized';
import { Request, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post('/', isAuthorized, async (req, res, next) => {
  try {
    const parsedData = validate_snippet.parse(req.body);
    const { title, lang, code, token } = parsedData;
    let uuid = token;
    if (!req.token) {
      throw new Error('Unauthorized: You are already logged in');
    }

    if (!uuid) {
      uuid = generateToken(16);
    }

    const userId = req.token.id;

    const snippet = await prisma.snippets.upsert({
      where: { uuid, userId },
      create: { uuid, userId, title, lang, code },
      update: { uuid, title, lang, code },
    });

    res.status(StatusCodes.CREATED).json(snippet);
  } catch (error) {
    next(error);
  }
});

router.get('/', isAuthorized, async (req, res, next) => {
  try {
    if (!req.token) {
      throw new Error('Unauthorized: You are already logged in');
    }
    const userId = req.token.id;

    const snippets = await prisma.snippets.findMany({ where: { userId } });
    res.status(StatusCodes.OK).json(snippets);
  } catch (error) {
    next(error);
  }
});

export default router;
