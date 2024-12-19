// pages/api/editTask.js

import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, title } = req.body;
    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { title },
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update task' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
