import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
}

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error al cargar los productos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const totalProductos = productos.length;
  const bajoStock = productos.filter(producto => producto.stock < 5).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Productos</h2>
          <p className="text-2xl">{totalProductos}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Productos con Bajo Stock</h2>
          <p className="text-2xl">{bajoStock}</p>
        </div>
        {/* Agrega más estadísticas y componentes aquí */}
      </div>
      <ToastContainer />
    </div>
  );
}
