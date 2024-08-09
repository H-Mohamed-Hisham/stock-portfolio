-- CreateTable
CREATE TABLE "Index" (
    "index_id" UUID NOT NULL,
    "index_symbol" TEXT NOT NULL,
    "index_name" TEXT NOT NULL,

    CONSTRAINT "Index_pkey" PRIMARY KEY ("index_id")
);

-- CreateTable
CREATE TABLE "OptionTransaction" (
    "transaction_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "index_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "OptionTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Index_index_symbol_key" ON "Index"("index_symbol");

-- CreateIndex
CREATE INDEX "index_id" ON "OptionTransaction"("index_id");

-- CreateIndex
CREATE INDEX "option_user_id" ON "OptionTransaction"("user_id");

-- AddForeignKey
ALTER TABLE "OptionTransaction" ADD CONSTRAINT "OptionTransaction_index_id_fkey" FOREIGN KEY ("index_id") REFERENCES "Index"("index_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionTransaction" ADD CONSTRAINT "OptionTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
