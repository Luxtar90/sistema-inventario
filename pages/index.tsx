import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Tienda en Línea</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/productos">
              <span className="text-blue-500 hover:underline cursor-pointer">Productos</span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-producto">
              <span className="text-blue-500 hover:underline cursor-pointer">Nuevo Producto</span>
            </Link>
          </li>
          <li>
            <Link href="/clientes">
              <span className="text-blue-500 hover:underline cursor-pointer">Clientes</span>
            </Link>
          </li>
          <li>
            <Link href="/nuevo-cliente">
              <span className="text-blue-500 hover:underline cursor-pointer">Nuevo Cliente</span>
            </Link>
          </li>
          <li>
            <Link href="/pedidos">
              <span className="text-blue-500 hover:underline cursor-pointer">Pedidos</span>
            </Link>
          </li>
          <li>
            <Link href="/hacer-pedido">
              <span className="text-blue-500 hover:underline cursor-pointer">Hacer Pedido</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
