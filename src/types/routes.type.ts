import { GAMES } from "../constants/GAMES";

export type RootStackParamList = {
  Game: {
    type: keyof typeof GAMES;
    pule: string;
  };
  Prizes: {
    pule: string;
  };
  ConfirmGame: undefined;
  Cart: undefined,
  Login: undefined;
  MainMenu: undefined;
  MenuGames: undefined;
  Profile: undefined;
};

//
