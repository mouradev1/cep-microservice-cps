export type ViaCepResponse = {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge?: string;
    ddd?: string;
    erro?: boolean;
};

export type BrasilApiResponse = {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    ibge?: string;
    ddd?: string;
};


export type ApiCepResponse = {
    code: string;
    state: string;
    city: string;
    district: string;
    address: string;
    status: number;
    ok: boolean;
    statusText: string;
};