import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { ModelRetorno, ModelAssinatura, ModelConfirmacaoEntrega } from "./models/setoresInterfaceInfra"
import bodyParser from "body-parser"
import { PrismaClient } from "@prisma/client"

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const prisma = new PrismaClient()

app.post("/registrarAssinatura", async (req: Request, res: Response) => {
    const requiscaoModel: ModelAssinatura = req.body
    //PROCESSO DB
    try {
        await prisma.assinatura.create({
            data: {
                assinatura_img: requiscaoModel.assinatura_img,
                notaFiscal: Number(requiscaoModel.notaFiscal),
                responsavel: requiscaoModel.responsavel
            }
        })
    } catch (error) {
        res.status(400).send({result: error})
    } finally {
        res.status(201).send({result: "Criado Com Sucesso"})
    }
})

app.post("/registrarConfirmacao", async (req: Request, res: Response) => {
    const {
        cidade,entregaConcluida,
        motorista,notaFiscal,obs
    }: ModelConfirmacaoEntrega = req.body

    //PROCESSO DB
    try {
        await prisma.confirmacaoEntrega.create({
            data: {
                cidade: cidade,
                entregaConcluida: entregaConcluida,
                motorista: motorista,
                notaFiscal: notaFiscal,
                obs: obs,
            }
        })
    } catch (error) {
        res.status(400).send({result: error})
    } finally {
        res.status(201).send({result: "Criado Com Sucesso"})
    }
})

app.post("/registrarRetorno", async (req: Request, res: Response) => {
    const {
        data,hodometro,
        notaFiscal,obs,
        placa
    }: ModelRetorno = req.body

    //PROCESSO DB
    try {
        await prisma.retorno.create({
            data: {
                data: data,
                hodometro: hodometro,
                notaFiscal: notaFiscal,
                obs: obs,
                placa: placa
            }
        })
    } catch (error) {
        res.status(400).send({result: error})
    } finally {
        res.status(201).send({result: "Criado Com Sucesso"})
    }
})

app.listen(process.env.PORT)