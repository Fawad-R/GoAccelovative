// pages/api/tasks.js

import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const email = req.query.email;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const tasks = await prisma.task.findMany({
        where: {
          user: {
            email: email
          }
        }
      });

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch tasks' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);