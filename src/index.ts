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
    const requiscaoModelAss: ModelAssinatura = req.body

    if(req.body.sec != process.env.SEC) {
        return res.status(400).send({result: "Algo falta no sistema"})
    }else if (req.body.setor != "assinatura") {
        return res.status(400).send({result: "Setor Errado"})
    }

    //PROCESSO DB
    try {
        await prisma.assinatura.create({
            data: {
                assinatura_img: requiscaoModelAss.assinatura_img,
                notaFiscal: Number(requiscaoModelAss.notaFiscal),
                responsavel: requiscaoModelAss.responsavel
            }
        })
    } catch (error) {
        res.status(400).send({result: error})
    } finally {
        res.status(201).send({result: "Criado Com Sucesso"})
    }
})

app.post("/registrarConfirmacao", async (req: Request, res: Response) => {
    const requiscaoModelConfir: ModelConfirmacaoEntrega = req.body

    if(req.body.sec != process.env.SEC) {
        return res.status(400).send({result: "Algo falta no sistema"})
    }else if (req.body.setor != "confirmacao") {
        return res.status(400).send({result: "Setor Errado"})
    }

    //PROCESSO DB
    try {
        await prisma.confirmacaoEntrega.create({
            data: {
                cidade: requiscaoModelConfir.cidade,
                entregaConcluida: requiscaoModelConfir.entregaConcluida,
                motorista: requiscaoModelConfir.motorista,
                notaFiscal: Number(requiscaoModelConfir.notaFiscal),
                obs: requiscaoModelConfir.obs,
            }
        }) 
    } catch (error) {
        res.status(400).send({result: error})
    } finally {
        res.status(201).send({result: "Criado Com Sucesso"})
    } //*/
})

app.post("/registrarRetorno", async (req: Request, res: Response) => {
    const {
        data,hodometro,
        notaFiscal,obs,
        placa
    }: ModelRetorno = req.body

    if(req.body.sec != process.env.SEC) {
        return res.status(400).send({result: "Algo falta no sistema"})
    }else if (req.body.setor != "retorno") {
        return res.status(400).send({result: "Setor Errado"})
    }

    //PROCESSO DB
    try {
        await prisma.retorno.create({
            data: {
                data: data,
                hodometro: Number(hodometro),
                notaFiscal: Number(notaFiscal),
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