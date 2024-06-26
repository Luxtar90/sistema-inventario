import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } else if (req.method === 'POST') {
    const { nombre, email } = req.body;
    const nuevoCliente = await prisma.cliente.create({
      data: { nombre, email },
    });
    res.status(201).json(nuevoCliente);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
