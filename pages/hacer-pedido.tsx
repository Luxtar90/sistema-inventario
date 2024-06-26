import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface Cliente {
  id: number;
  nombre: string;
}

export default function HacerPedido() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>('');
  const [selectedProductos, setSelectedProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleProductoChange = (producto: Producto) => {
    setSelectedProductos(prevSelected => {
      if (prevSelected.includes(producto)) {
        return prevSelected.filter(p => p.id !== producto.id);
      } else {
        return [...prevSelected, producto];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCliente || selectedProductos.length === 0) {
      setError('Seleccione un cliente y al menos un producto.');
      return;
    }

    await fetch('/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cliente_id: parseInt(selectedCliente),
        productos: selectedProductos.map(p => p.id),
      }),
    });

    router.push('/pedidos');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Hacer Pedido</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Seleccione Cliente:</label>
          <select
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Seleccione Productos:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.map(producto => (
              <div key={producto.id} className="bg-white p-4 rounded shadow">
                <input
                  type="checkbox"
                  id={`producto-${producto.id}`}
                  value={producto.id}
                  onChange={() => handleProductoChange(producto)}
                  className="mr-2"
                />
                <label htmlFor={`producto-${producto.id}`} className="cursor-pointer">
                  {producto.nombre} - ${producto.precio}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Hacer Pedido</button>
        <Link href="/">
          <span className="bg-gray-500 text-white p-2 rounded cursor-pointer">Volver al Home</span>
        </Link>
      </form>
    </div>
  );
}
