# Tienda en Línea

Este es un proyecto de una tienda en línea creada con Next.js, Prisma y Tailwind CSS. Permite gestionar productos, clientes y pedidos de manera eficiente y con una interfaz moderna.

## Características

- Listar productos
- Agregar nuevos productos
- Listar clientes
- Agregar nuevos clientes
- Crear pedidos
- Ver pedidos

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Requisitos Previos

- Node.js (>= 18.17.0)
- npm o yarn

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tienda-en-linea.git
    cd tienda-en-linea
    ```

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
tienda-en-linea/
├── node_modules/
├── pages/
│   ├── api/
│   │   ├── productos.js
│   │   ├── clientes.js
│   │   └── pedidos.js
│   ├── index.tsx
│   ├── productos.tsx
│   ├── nuevo-producto.tsx
│   ├── clientes.tsx
│   ├── nuevo-cliente.tsx
│   └── hacer-pedido.tsx
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
