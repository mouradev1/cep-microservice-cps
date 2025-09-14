import mongoose from "mongoose";

const CepSchema = new mongoose.Schema({
    cep: { type: String, unique: true },
    logradouro: String,
    bairro: String,
    localidade: String,
    uf: String,
    ibge: String,
    ddd: String,
    createdAt: { type: Date, default: Date.now }
});

export const CepModel = mongoose.model("Cep", CepSchema);
