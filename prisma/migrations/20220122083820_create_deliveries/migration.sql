-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3),
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliverers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
