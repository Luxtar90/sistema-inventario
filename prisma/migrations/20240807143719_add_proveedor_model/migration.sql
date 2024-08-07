/*
  Warnings:

  - You are about to drop the `_PedidoToProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_PedidoToProducto_B_index";

-- DropIndex
DROP INDEX "_PedidoToProducto_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PedidoToProducto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT,
    "telefono" TEXT,
    "direccion" TEXT
);

-- CreateTable
CREATE TABLE "_ProductoPedidos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductoPedidos_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductoPedidos_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "proveedorId" INTEGER,
    CONSTRAINT "Producto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("id", "nombre", "precio", "stock") SELECT "id", "nombre", "precio", "stock" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductoPedidos_AB_unique" ON "_ProductoPedidos"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductoPedidos_B_index" ON "_ProductoPedidos"("B");
