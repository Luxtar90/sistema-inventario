import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login exitoso', token });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
