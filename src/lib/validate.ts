import { z } from 'zod';

export const validate_register = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  password: z.string({ message: 'Password is required' }).min(6),
  repassword: z.string({ message: 'Repeat password is required' }).min(6),
});
