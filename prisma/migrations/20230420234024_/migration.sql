-- CreateTable
CREATE TABLE "Assinatura" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "responsavel" TEXT NOT NULL,
    "assinatura_img" TEXT NOT NULL,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmacaoEntrega" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "motorista" TEXT NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "entregaConcluida" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "ConfirmacaoEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retorno" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "Retorno_pkey" PRIMARY KEY ("id")
);
