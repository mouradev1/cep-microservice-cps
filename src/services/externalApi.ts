import axios from "axios";
import { ViaCepResponse, BrasilApiResponse, ApiCepResponse } from "../types/cep";
import { CepModel } from "../models/Cep";


const PROVIDERS = [
    {
        name: "viacep",
        fn: async (cep: string) => {
            try {
                const res = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
                if (!res.data.erro) {
                    return {
                        cep: res.data.cep,
                        logradouro: res.data.logradouro,
                        bairro: res.data.bairro,
                        localidade: res.data.localidade,
                        uf: res.data.uf,
                        ibge: res.data.ibge || "",
                        ddd: res.data.ddd || ""
                    };
                }
                return null;
            } catch {
                return null;
            }
        }
    },
    {
        name: "brasilapi",
        fn: async (cep: string) => {
            try {
                const res = await axios.get<BrasilApiResponse>(`https://brasilapi.com.br/api/cep/v1/${cep}`);
                return {
                    cep: res.data.cep,
                    logradouro: res.data.street,
                    bairro: res.data.neighborhood,
                    localidade: res.data.city,
                    uf: res.data.state,
                    ibge: res.data.ibge || "",
                    ddd: res.data.ddd || ""
                };
            } catch {
                return null;
            }
        }
    },
    {
        name: "apicep",
        fn: async (cep: string) => {
            try {
                const res = await axios.get(`https://cdn.apicep.com/file/apicep/${cep}.json`);
                const data = res.data as ApiCepResponse;
                if (data.ok && data.status === 200) {
                    return {
                        cep: data.code.replace("-", ""),
                        logradouro: data.address,
                        bairro: data.district,
                        localidade: data.city,
                        uf: data.state,
                        ibge: "",
                        ddd: ""
                    };
                }
                return null;
            } catch {
                return null;
            }
        }
    }
];


async function getLastProvider(cep: string): Promise<string | null> {
    const doc = await CepModel.findOne({ cep });
    return doc?.lastProvider || null;
}

async function setLastProvider(cep: string, provider: string) {
    await CepModel.updateOne({ cep }, { $set: { lastProvider: provider } }, { upsert: true });
}

export const fetchFromExternalApis = async (cep: string) => {

    const lastProvider = await getLastProvider(cep);

    let startIdx = 0;
    if (lastProvider) {
        const idx = PROVIDERS.findIndex(p => p.name === lastProvider);
        startIdx = (idx + 1) % PROVIDERS.length;
    }

    const orderedProviders = [
        ...PROVIDERS.slice(startIdx),
        ...PROVIDERS.slice(0, startIdx)
    ];

    for (const provider of orderedProviders) {
        const result = await provider.fn(cep);
        if (result) {
            await setLastProvider(cep, provider.name);
            return result;
        }
    }

    return null;
};
