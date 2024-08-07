import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notificaciones = await prisma.stockBajoNotificacion.findMany({
        include: { producto: true },
      });
      res.status(200).json(notificaciones);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
      res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.body;
    try {
      const notificacion = await prisma.stockBajoNotificacion.update({
        where: { id },
        data: { status: 'Resuelto' },
      });
      await prisma.stockBajoNotificacion.delete({
        where: { id },
      });
      res.status(200).json(notificacion);
    } catch (error) {
      console.error('Error al actualizar la notificación:', error);
      res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
  } else if (req.method === 'POST') {
    const { productoId } = req.body;
    try {
      // Verificar si ya existe una notificación para este producto
      const notificacionExistente = await prisma.stockBajoNotificacion.findFirst({
        where: { productoId, status: 'Pendiente' },
      });

      if (notificacionExistente) {
        // Si ya existe una notificación pendiente, no crear una nueva
        res.status(200).json({ message: 'Notificación ya existente', notificacionExistente });
      } else {
        // Si no existe, crear una nueva notificación
        const nuevaNotificacion = await prisma.stockBajoNotificacion.create({
          data: {
            productoId,
          },
        });
        res.status(201).json(nuevaNotificacion);
      }
    } catch (error) {
      console.error('Error al crear la notificación:', error);
      res.status(500).json({ error: 'Error al crear la notificación' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
