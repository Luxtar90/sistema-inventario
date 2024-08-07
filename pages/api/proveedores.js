import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener todos los proveedores
    try {
      const proveedores = await prisma.proveedor.findMany();
      res.status(200).json(proveedores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los proveedores' });
    }
  } else if (req.method === 'POST') {
    // Crear un nuevo proveedor
    const { nombre, contacto, telefono, direccion } = req.body;
    try {
      const nuevoProveedor = await prisma.proveedor.create({
        data: { nombre, contacto, telefono, direccion },
      });
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el proveedor' });
    }
  } else if (req.method === 'PUT') {
    // Actualizar un proveedor existente
    const { id, nombre, contacto, telefono, direccion } = req.body;
    try {
      const proveedorActualizado = await prisma.proveedor.update({
        where: { id: parseInt(id) },
        data: { nombre, contacto, telefono, direccion },
      });
      res.status(200).json(proveedorActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar un proveedor
    const { id } = req.body;
    try {
      await prisma.proveedor.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Proveedor eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
