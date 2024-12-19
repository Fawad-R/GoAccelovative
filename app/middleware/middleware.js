// lib/middleware.js

import jwt from 'jsonwebtoken';

export function withAuth(handler) {
  return async function (req, res) {
    if (req.method === 'OPTIONS') {
      return res.end();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
