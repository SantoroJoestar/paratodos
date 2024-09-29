export type TypeGames = {
  [id: string]: {
    id: string;
    label: string;
    format: string;
    markAll?: boolean;
    max?: number;
  };
};

export const GAMES: TypeGames = {
  /**
   * @description máximo de 4
   *
   * @example 1000
   * @example 1234
   * @example 2002
   */
  "": {
    id: "",
    label: "",
    format: "",
  },
  Milhar: {
    id: "Milhar",
    label: "Milhar",
    format: "0000",
  },
  Centena: {
    id: "Centena",
    label: "Centena",
    format: "000",
  },
  MilharCentena: {
    id: "MilharCentena",
    label: "Milhar Centena",
    format: "0000",
  },
  MilharInvertida: {
    id: "MilharInvertida",
    label: "Milhar Invertida",
    format: "0000",
  },
  CentenaInvertida: {
    id: "CentenaInvertida",
    label: "Centena Invertida",
    format: "000",
  },
  Dezena: {
    id: "Dezena",
    label: "Dezena",
    format: "00",
  },
  DuqueDeDezena: {
    id: "DuqueDeDezena",
    label: "Duque de Dezena",
    format: "00-00",
    markAll: true
  },
  TernoDeDezena: {
    id: "TernoDeDezena",
    label: "Terno de Dezena",
    format: "00-00-00",
    markAll: true
  },
  MilharDezena: {
    id: "MilharDezena",
    label: "Milhar e Dezena",
    format: "0000",
  },
  MilharCentenaDezena: {
    id: "MilharCentenaDezena",
    label: "Milhar, Centena e Dezena",
    format: "0000",
  },
  CentenaDezena: {
    id: "CentenaDezena",
    label: "Centena Dezena",
    format: "000",
  },
  Grupo: {
    id: "Grupo",
    label: "Grupo",
    max: 25, // 0 a 25
    format: "00",
  },
  DuqueDeGrupo: {
    id: "DuqueDeGrupo",
    label: "Duque de Grupo",
    max: 25, // (0-25)-(0-25)
    format: "00-00",
    markAll: true
  },
  TernoDeGrupo: {
    id: "TernoDeGrupo",
    label: "Terno de Grupo",
    max: 25, // (0-25)-(0-25)-(0-25)
    format: "00-00-00",
    markAll: true
  },
} as const;
