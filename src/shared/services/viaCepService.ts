export interface ViaCepAddress {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export const viaCepService = {
  fetchAddress: async (cep: string): Promise<ViaCepAddress | null> => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) return null

    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data = await res.json()
    if (data.erro) return null

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    }
  },
}
