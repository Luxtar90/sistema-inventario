readme_content = """
# Sistema de Gestión de Inventario

Este es un sistema web integral diseñado para gestionar inventarios de productos, incluyendo funcionalidades de registro y login de usuarios, un dashboard personalizado, y notificaciones de stock bajo. El sistema fue desarrollado siguiendo el estándar ISO 12207.

## Características

- **Registro y Login de Usuarios:** Permite a los usuarios registrarse y autenticarse en el sistema.
- **Dashboard Personalizado:** Visualiza un resumen del inventario con opciones para gestionar productos, clientes y proveedores.
- **Gestión de Productos:** Añade, edita y elimina productos del inventario.
- **Gestión de Clientes:** Añade y gestiona la información de los clientes.
- **Gestión de Proveedores:** Añade y gestiona la información de los proveedores.
- **Generación de Reportes:** Genera reportes de stock de productos.
- **Notificaciones de Stock Bajo:** Notifica cuando un producto tiene un stock menor o igual a 5 unidades.
- **Sistema de Notificaciones:** Muestra y gestiona las notificaciones dentro de la aplicación.

## Requisitos Previos

- Node.js (>= 18.17.0)
- npm o yarn
- Prisma

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Luxtar90/sistema-inventario.git
   cd sistema-inventario

2. Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```

3. Configura Prisma:
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

## Uso

1. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    # o
    yarn dev
    ```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

```plaintext
sistema-inventario/
├── node_modules/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   ├── productos.js
│   │   ├── clientes.js
│   │   ├── pedidos.js
│   │   ├── proveedores.js
│   │   └── notificaciones.js
│   ├── index.tsx
│   ├── dashboard.tsx
│   ├── productos.tsx
│   ├── nuevo-producto.tsx
│   ├── clientes.tsx
│   ├── nuevo-cliente.tsx
│   ├── hacer-pedido.tsx
│   ├── proveedores.tsx
│   └── notificaciones.tsx
├── prisma/
│   ├── schema.prisma
│   └── dev.db (este archivo se generará después de la migración)
├── public/
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── package.json
└── README.md
