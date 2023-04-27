import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { ModelRetorno, ModelAssinatura, ModelConfirmacaoEntrega } from "./models/setoresInterfaceInfra"
import bodyParser from "body-parser"
import { PrismaClient } from "@prisma/client"
import axios, { AxiosRequestConfig } from "axios"

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const prisma = new PrismaClient()

app.post("/registrarAssinatura", async (req: Request, res: Response) => {
    const requiscaoModelAss: ModelAssinatura = req.body

    //PROCESSO DB
    const config: AxiosRequestConfig = {
        method: "post",
        url: process.env.URL_POST,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: {
            notaFiscal: Number(requiscaoModelAss.notaFiscal),
            responsavel: requiscaoModelAss.responsavel,
            assinatura_img: requiscaoModelAss.assinatura_img,            
            setor: "assinatura"
        },
      };

      let response = await axios(config)

      
    if(response.status == 201 || response.status == 200) {
        res.status(201).send({result: "Criado Com Sucesso"})
    }else {
        res.status(400).send({result: "Ocorreu algum erro"})
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
    const config: AxiosRequestConfig = {
        method: "post",
        url: process.env.URL_POST,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: {
            notaFiscal: requiscaoModelConfir.notaFiscal,
            motorista: requiscaoModelConfir.motorista,
            cidade: requiscaoModelConfir.cidade,
            entregaConcluida: requiscaoModelConfir.entregaConcluida,
            obs: requiscaoModelConfir.obs,
            setor: "confirmacao entrega"
        },
      };

      let response = await axios(config)

      
    if(response.status == 201 || response.status == 200) {
        res.status(201).send({result: "Criado Com Sucesso"})
    }else {
        res.status(400).send({result: "Ocorreu algum erro"})
    }
})

app.post("/registrarRetorno", async (req: Request, res: Response) => {
    const retorno: ModelRetorno = req.body

    if(req.body.sec != process.env.SEC) {
        return res.status(400).send({result: "Algo falta no sistema"})
    }else if (req.body.setor != "retorno") {
        return res.status(400).send({result: "Setor Errado"})
    }

    //PROCESSO DB
    const config: AxiosRequestConfig = {
        method: "post",
        url: process.env.URL_POST,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: {
            notaFiscal:retorno.notaFiscal,
            placa: retorno.placa,
            hodometro: retorno.hodometro,
            data: retorno.data,
            obs: retorno.obs,
            setor: "retorno"
        },
      };

      let response = await axios(config)

      
    if(response.status == 201 || response.status == 200) {
        res.status(201).send({result: "Criado Com Sucesso"})
    }else {
        res.status(400).send({result: "Ocorreu algum erro"})
    }
})


app.listen(process.env.PORT, () => console.log("Iniciou"))