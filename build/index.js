"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var variable = {
    notaFiscal: 0,
    placa: "",
    hodometro: 0,
    data: "",
    obs: ""
};
app.get("/", function (req, res) { return res.send("OK"); });
app.listen(process.env.PORT);
