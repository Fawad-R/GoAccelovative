// pages/api/signup.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
