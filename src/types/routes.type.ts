import { GAMES } from "../constants/GAMES";
import { BetType } from "../screens/Prizes";

export type RootStackParamList = {
  Game: {
    type: keyof typeof GAMES;
  };
  Prizes: {
    type: keyof typeof GAMES;
    numbers: string[]
  };
  ConfirmGame: {
    numbers: string[]
    betValues: BetType[];
  }
  Cart: undefined,
  Login: undefined;
  MainMenu: undefined;
  MenuGames: undefined;
  Profile: undefined;
};
