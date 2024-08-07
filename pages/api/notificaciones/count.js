// pages/api/notificaciones/count.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const count = await prisma.stockBajoNotificacion.count({
        where: { status: 'Pendiente' },
      });
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener el conteo de notificaciones:', error);
      res.status(500).json({ error: 'Error al obtener el conteo de notificaciones' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
