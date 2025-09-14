import axios from "axios";
import { ViaCepResponse, BrasilApiResponse } from "../types/cep";

export const fetchFromExternalApis = async (cep: string) => {
    const providers = [
        async () => {
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
            } catch (error) {
                return null;
            }
        },
        async () => {
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
            } catch (error) {
                return null;
            }
        },
    ];

    for (const prov of providers) {
        const result = await prov();
        if (result) {
            return result;
        }
    }

    return null;
};
