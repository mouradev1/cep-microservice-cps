function isCepDataComplete(data: any) {
  return (
    data &&
    typeof data.cep === "string" && data.cep.length === 8 &&
    data.logradouro && data.logradouro.trim() !== "" &&
    data.bairro && data.bairro.trim() !== "" &&
    data.localidade && data.localidade.trim() !== "" &&
    data.uf && data.uf.trim() !== ""
  );
}
import { redisClient } from "../config/redis";
import { CepModel } from "../models/Cep";
import { fetchFromExternalApis } from "./externalApi";

export const getCepData = async (cep: string) => {
  const key = `cep:${cep}`;


  const cached = await redisClient.get(key);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed === null) throw new Error("CEP não encontrado");
    if (isCepDataComplete(parsed)) return parsed;

  }


  let cepDoc = await CepModel.findOne({ cep });
  if (cepDoc && isCepDataComplete(cepDoc)) {
    await redisClient.setEx(key, 3600, JSON.stringify(cepDoc));
    return cepDoc;
  }


  const externalData = await fetchFromExternalApis(cep);

  if (!isCepDataComplete(externalData)) {
    await redisClient.setEx(key, 43200, JSON.stringify(null));
    throw new Error("CEP não encontrado");
  }

  cepDoc = await CepModel.findOneAndUpdate(
    { cep },
    { $set: { ...externalData, cep } },
    { upsert: true, new: true }
  );
  await redisClient.setEx(key, 3600, JSON.stringify(cepDoc));

  return cepDoc;
};
