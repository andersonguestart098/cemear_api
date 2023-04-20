export interface ModelAssinatura {
    notaFiscal: number
    responsavel: string
    assinatura_img: string
}

export interface ModelConfirmacaoEntrega {
    notaFiscal: number
    motorista: string
    cidade: string
    entregaConcluida: string
    obs: string
}

export interface ModelRetorno {
    notaFiscal: number
    placa: string 
    hodometro: number
    data: string
    obs: string
}