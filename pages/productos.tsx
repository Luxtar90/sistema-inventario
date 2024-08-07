import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
        verificarStockBajo(data); // Verificar el stock bajo después de cargar los productos
      })
      .catch(error => setError(error.message));
  }, []);

  const verificarStockBajo = async (productos: Producto[]) => {
    productos.forEach(async (producto) => {
      if (producto.stock <= 5) {
        try {
          const response = await fetch('/api/notificaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productoId: producto.id }),
          });

          if (response.ok) {
            toast.warning(`El producto ${producto.nombre} está en stock bajo!`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          } else {
            console.error('Error al crear la notificación:', await response.json());
          }
        } catch (error) {
          console.error('Error en la conexión al crear la notificación:', error);
        }
      }
    });
  };

  const eliminarProducto = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProductos(productos.filter(producto => producto.id !== id));
          toast.success('Producto eliminado con éxito');
        } else {
          toast.error('Error al eliminar el producto');
        }
      } catch (error) {
        toast.error('Error de conexión al eliminar el producto');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/">
          <span className="bg-gray-500 text-white p-2 rounded cursor-pointer">Volver al Home</span>
        </Link>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map(producto => (
          <div key={producto.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <div className="flex justify-between mt-4">
              <Link href={`/editar-producto/${producto.id}`}>
                <button className="bg-yellow-500 text-white p-2 rounded">Editar Producto</button>
              </Link>
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
