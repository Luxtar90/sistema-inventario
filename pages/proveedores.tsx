import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Proveedor {
  id: number;
  nombre: string;
  contacto?: string;
  telefono?: string;
  direccion?: string;
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/proveedores')
      .then(response => response.json())
      .then(data => {
        setProveedores(data);
        setLoading(false);
        toast.success('Proveedores cargados correctamente', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch(error => {
        toast.error('Error al cargar los proveedores', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setError('Error al cargar los proveedores');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      try {
        const res = await fetch(`/api/proveedores`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
          toast.success('Proveedor eliminado con éxito', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          toast.error('Error al eliminar el proveedor', {
            position: 'bottom-left',
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
        toast.error('Error de conexión. Por favor, intente nuevamente.', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Proveedores</h1>
      <Link href="/nuevo-proveedor">
        <button className="bg-blue-500 text-white p-2 rounded mb-4">Agregar Proveedor</button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {proveedores.map((proveedor) => (
          <div key={proveedor.id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">{proveedor.nombre}</h2>
            {proveedor.contacto && <p>Contacto: {proveedor.contacto}</p>}
            {proveedor.telefono && <p>Teléfono: {proveedor.telefono}</p>}
            {proveedor.direccion && <p>Dirección: {proveedor.direccion}</p>}
            <div className="flex space-x-2 mt-4">
              <Link href={`/editar-proveedor?id=${proveedor.id}`}>
                <button className="bg-yellow-500 text-white p-2 rounded">Editar</button>
              </Link>
              <button
                onClick={() => handleDelete(proveedor.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/">
        <button className="mt-8 bg-gray-500 text-white p-2 rounded">Volver al Home</button>
      </Link>
      <ToastContainer />
    </div>
  );
}
