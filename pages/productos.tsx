import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      .then(data => setProductos(data))
      .catch(error => setError(error.message));
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}
