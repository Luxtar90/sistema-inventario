-- CreateTable
CREATE TABLE "_PedidoToProducto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PedidoToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PedidoToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoToProducto_AB_unique" ON "_PedidoToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoToProducto_B_index" ON "_PedidoToProducto"("B");
