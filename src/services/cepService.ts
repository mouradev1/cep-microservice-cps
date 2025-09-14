import { redisClient } from "../config/redis";
import { CepModel } from "../models/Cep";
import { fetchFromExternalApis } from "./externalApi";

export const getCepData = async (cep: string) => {
  const key = `cep:${cep}`;

  const cached = await redisClient.get(key);
  if (cached) {

    const parsed = JSON.parse(cached);
    if (parsed === null) throw new Error("CEP não encontrado1");
    return parsed;
  }

  let cepDoc = await CepModel.findOne({ cep });
  if (cepDoc) {
    await redisClient.setEx(key, 3600, JSON.stringify(cepDoc));
    return cepDoc;
  }

  const externalData = await fetchFromExternalApis(cep);

  if (!externalData) {
    await redisClient.setEx(key, 43200, JSON.stringify(null));
    throw new Error("CEP não encontrado");
  }

  cepDoc = await CepModel.create({ ...externalData, cep });
  await redisClient.setEx(key, 3600, JSON.stringify(cepDoc));

  return cepDoc;
};
