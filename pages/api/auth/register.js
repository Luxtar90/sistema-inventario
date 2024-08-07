import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Usuario creado con éxito', newUser });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
