import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NuevoProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, precio: parseFloat(precio), stock: parseInt(stock) }),
    });
    router.push('/productos');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Nuevo Producto</h1>
        <Link href="/">
          <span className="bg-gray-500 text-white p-2 rounded cursor-pointer">Volver al Home</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Precio:</label>
          <input 
            type="text" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Stock:</label>
          <input 
            type="text" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar</button>
      </form>
    </div>
  );
}
