import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

async function handler(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.status(200).json(user);
}

export default withAuth(handler);
