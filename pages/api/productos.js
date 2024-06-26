import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const productos = await prisma.producto.findMany();
    res.status(200).json(productos);
  } else if (req.method === 'POST') {
    const { nombre, precio, stock } = req.body;
    const nuevoProducto = await prisma.producto.create({
      data: { nombre, precio, stock },
    });
    res.status(201).json(nuevoProducto);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
