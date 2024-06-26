import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/clientes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setClientes(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/">
          <span className="bg-gray-500 text-white p-2 rounded cursor-pointer">Volver al Home</span>
        </Link>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map(cliente => (
          <div key={cliente.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{cliente.nombre}</h2>
            <p>Email: {cliente.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
