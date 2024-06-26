import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pedidos = await prisma.pedido.findMany({
      include: { Cliente: true, productos: true },
    });
    res.status(200).json(pedidos);
  } else if (req.method === 'POST') {
    const { cliente_id, productos } = req.body;

    try {
      // Verificar el stock de todos los productos
      const productosStock = await prisma.producto.findMany({
        where: {
          id: { in: productos },
        },
        select: {
          id: true,
          stock: true,
        },
      });

      const outOfStock = productosStock.some(producto => producto.stock <= 0);
      if (outOfStock) {
        return res.status(400).json({ error: 'Uno o más productos están fuera de stock.' });
      }

      // Crear el pedido y actualizar el stock en una transacción
      const nuevoPedido = await prisma.$transaction(async (prisma) => {
        const pedido = await prisma.pedido.create({
          data: {
            cliente_id: cliente_id,
            productos: {
              connect: productos.map((productoId) => ({ id: productoId })),
            },
          },
        });

        for (const producto of productosStock) {
          await prisma.producto.update({
            where: { id: producto.id },
            data: { stock: producto.stock - 1 },
          });
        }

        return pedido;
      });

      res.status(201).json(nuevoPedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al procesar el pedido.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
