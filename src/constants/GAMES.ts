export const GAMES = {
  milhar: {
    id: "milhar",
    label: "Milhar",
    format: "0000",
    markAll: false,
    max: 0,
  },
  centena: {
    id: "centena",
    label: "Centena",
    format: "000",
    markAll: false,
    max: 0,
  },
  milhar_centena: {
    id: "milhar_centena",
    label: "Milhar Centena",
    format: "0000",
    markAll: false,
    max: 0,
  },
  milhar_invertida: {
    id: "milhar_invertida",
    label: "Milhar Invertida",
    format: "0000",
    markAll: false,
    max: 0,
  },
  milhar_centena_invertida: {
    id: "milhar_centena_invertida",
    label: "Milhar e Centena Invertidas",
    format: "0000",
    markAll: false,
    max: 0,
  },
  centena_invertida: {
    id: "centena_invertida",
    label: "Centena Invertida",
    format: "000",
    markAll: false,
    max: 0,
  },
  dezena: {
    id: "dezena",
    label: "Dezena",
    format: "00",
    markAll: false,
    max: 0,
  },
  duque_dezena: {
    id: "duque_dezena",
    label: "Duque de Dezena",
    format: "00-00",
    markAll: true,
    max: 0
  },
  terno_de_dezena: {
    id: "terno_de_dezena",
    label: "Terno de Dezena",
    format: "00-00-00",
    markAll: true,
    max: 0
  },
  milhar_dezena: {
    id: "milhar_dezena",
    label: "Milhar e Dezena",
    format: "0000",
    markAll: false,
    max: 0,
  },
  milhar_centena_dezena: {
    id: "milhar_centena_dezena",
    label: "Milhar, Centena e Dezena",
    format: "0000",
    markAll: false,
    max: 0,
  },
  centena_dezena: {
    id: "centena_dezena",
    label: "Centena Dezena",
    format: "000",
    markAll: false,
    max: 0,
  },
  grupo: {
    id: "grupo",
    label: "Grupo",
    max: 25, // 0 a 25
    format: "00",
    markAll: false,
  },
  duque_de_grupo: {
    id: "duque_de_grupo",
    label: "Duque de Grupo",
    max: 25, // (0-25)-(0-25)
    format: "00-00",
    markAll: true
  },
  terno_de_grupo: {
    id: "terno_de_grupo",
    label: "Terno de Grupo",
    max: 25, // (0-25)-(0-25)-(0-25)
    format: "00-00-00",
    markAll: true
  },
} as const;
