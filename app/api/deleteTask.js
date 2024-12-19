// pages/api/deleteTask.js

import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete task' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
