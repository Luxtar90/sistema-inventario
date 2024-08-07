import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarProducto() {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState({ nombre: '', stock: 0 });

  useEffect(() => {
    if (id) {
      fetch(`/api/productos/${id}`)
        .then(response => response.json())
        .then(data => setProducto(data))
        .catch(error => console.error('Error al cargar el producto:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: parseInt(producto.stock) }),
      });

      if (response.ok) {
        toast.success('Producto actualizado con éxito!');
        router.push('/productos');
      } else {
        toast.error('Error al actualizar el producto');
      }
    } catch (error) {
      toast.error('Error de conexión al actualizar el producto');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            disabled
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Stock:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Actualizar Producto</button>
      </form>
      <ToastContainer />
    </div>
  );
}
