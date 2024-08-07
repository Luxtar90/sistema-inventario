import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importa Link para la navegación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Notificacion {
  id: number;
  producto: {
    nombre: string;
  };
  creadoEn: string;
  status: string;
}

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/notificaciones')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotificaciones(data);
        } else {
          setNotificaciones([]);
        }
      })
      .catch(error => setError('Error al cargar las notificaciones'));
  }, []);

  const marcarComoResuelto = async (id: number) => {
    try {
      const response = await fetch('/api/notificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Eliminar la notificación del estado después de que se haya marcado como resuelta
        setNotificaciones(notificaciones.filter(n => n.id !== id));
        toast.success('Notificación marcada como resuelta y eliminada', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        setError('Error al actualizar la notificación');
        toast.error('Error al actualizar la notificación', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      setError('Error al actualizar la notificación');
      toast.error('Error de conexión al actualizar la notificación', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Notificaciones de Stock Bajo</h1>
        <Link href="/">
          <button className="bg-blue-500 text-white p-2 rounded">
            Volver al Home
          </button>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notificaciones.map((notificacion) => (
          <div key={notificacion.id} className="bg-white p-6 rounded shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800">Producto: {notificacion.producto.nombre}</h2>
            <p className="text-gray-600">Fecha: {new Date(notificacion.creadoEn).toLocaleString()}</p>
            <button
              onClick={() => marcarComoResuelto(notificacion.id)}
              className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition-colors duration-200"
            >
              Marcar como Resuelto
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}