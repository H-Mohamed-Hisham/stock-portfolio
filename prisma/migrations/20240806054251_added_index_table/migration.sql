-- CreateTable
CREATE TABLE "Index" (
    "index_id" UUID NOT NULL,
    "index_symbol" TEXT NOT NULL,
    "index_name" TEXT NOT NULL,

    CONSTRAINT "Index_pkey" PRIMARY KEY ("index_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Index_index_symbol_key" ON "Index"("index_symbol");
