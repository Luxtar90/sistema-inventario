import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiBell } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notificacionesCount, setNotificacionesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      toast.error('No estás autenticado. Por favor, inicia sesión o regístrate.');
    } else {
      setIsAuthenticated(true);
      toast.success('Bienvenido al Sistema de Gestión de Inventario!');
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/notificaciones/count')
      .then(response => response.json())
      .then(data => setNotificacionesCount(data.count))
      .catch(error => console.error('Error al obtener el número de notificaciones:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Has cerrado sesión');
    setIsAuthenticated(false);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-8">Bienvenido al Sistema de Gestión de Inventario</h1>
        <p className="mb-4">Debes estar registrado y autenticado para acceder al contenido.</p>
        <div className="flex space-x-4">
          <Link href="/auth/register">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-200">
              Registrarse
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-200">
              Iniciar Sesión
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Sistema de Gestión de Inventario</h1>
        <div className="flex items-center space-x-4">
          <Link href="/notificaciones">
            <div className="relative cursor-pointer">
              <FiBell className="text-2xl text-gray-600 hover:text-blue-500 transition duration-200" />
              {notificacionesCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notificacionesCount}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <nav className="mb-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <li>
            <Link href="/dashboard">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/productos">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Productos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-producto">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Nuevo Producto
              </span>
            </Link>
          </li>
          <li>
            <Link href="/clientes">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Clientes
              </span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-cliente">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Nuevo Cliente
              </span>
            </Link>
          </li>
          <li>
            <Link href="/pedidos">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Pedidos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/hacer-pedido">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Hacer Pedido
              </span>
            </Link>
          </li>
          <li>
            <Link href="/proveedores">
              <span className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center shadow-lg transition duration-200 cursor-pointer">
                Proveedores
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
}
