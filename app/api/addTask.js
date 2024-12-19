// pages/api/addTask.js

import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'POST') {
    const { title } = req.body;
    try {
      const newTask = await prisma.task.create({
        data: {
          title,
        },
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Unable to add task' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
