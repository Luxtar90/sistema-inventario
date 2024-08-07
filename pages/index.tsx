import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Bienvenido a la Tienda en Línea</h1>
        <p className="mb-4">Debes estar registrado y autenticado para acceder al contenido.</p>
        <div className="flex space-x-4">
          <Link href="/auth/register">
            <button className="bg-blue-500 text-white p-2 rounded">Registrarse</button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-gray-500 text-white p-2 rounded">Iniciar Sesión</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Tienda en Línea</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/productos">
              <span className="text-blue-500 hover:underline cursor-pointer">Productos</span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-producto">
              <span className="text-blue-500 hover:underline cursor-pointer">Nuevo Producto</span>
            </Link>
          </li>
          <li>
            <Link href="/clientes">
              <span className="text-blue-500 hover:underline cursor-pointer">Clientes</span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-cliente">
              <span className="text-blue-500 hover:underline cursor-pointer">Nuevo Cliente</span>
            </Link>
          </li>
          <li>
            <Link href="/pedidos">
              <span className="text-blue-500 hover:underline cursor-pointer">Pedidos</span>
            </Link>
          </li>
          <li>
            <Link href="/hacer-pedido">
              <span className="text-blue-500 hover:underline cursor-pointer">Hacer Pedido</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
