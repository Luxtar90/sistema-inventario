import { useEffect, useState } from 'react';

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

interface Pedido {
  id: number;
  cliente_id: number;
  fecha_pedido: string;
  Cliente: Cliente;
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/pedidos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPedidos(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="space-y-2">
        {pedidos.map(pedido => (
          <li key={pedido.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                Pedido #{pedido.id} - Cliente: {pedido.Cliente.nombre} - Fecha: {new Date(pedido.fecha_pedido).toLocaleDateString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
