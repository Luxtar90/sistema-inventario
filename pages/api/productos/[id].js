// pages/api/productos/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.producto.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  } else if (req.method === 'PUT') {
    const { stock } = req.body;
    try {
      const productoActualizado = await prisma.producto.update({
        where: { id: parseInt(id) },
        data: { stock },
      });
      res.status(200).json(productoActualizado);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
