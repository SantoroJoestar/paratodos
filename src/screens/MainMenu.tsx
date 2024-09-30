/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { BottomCart } from "../components/BottomCart";
import { Button, Divider } from "native-base";
import { useAuth } from "../providers/AuthContext";
import { UserType } from "../types/user.type";

type Props = NativeStackScreenProps<RootStackParamList, "MainMenu">;

export const MainMenu = ({ navigation }: Props) => {
  const { setUser } = useAuth();

  const handleLogout = () => {
    setUser({} as UserType);
  };

  return (
    <BottomCart navigation={navigation}>
      <View style={styles.container}>
        <Button
          bg={"yellow.600"}
          onPress={() => navigation.navigate("MenuGames")}
        >
          <Text style={localStyles.menuButtonText}>JOGOS</Text>
        </Button>
        <Divider
          my="5"
          _light={{
            bg: "muted.800",
          }}
        />

        <Button bg={"blue.700"}>
          <Text style={localStyles.menuButtonText}>REPETIR PULE</Text>
        </Button>
        <Button bg={"blue.700"} mt={3}>
          <Text style={localStyles.menuButtonText}>VENDAS DO DIA</Text>
        </Button>
        <Button bg={"blue.700"} mt={3}>
          <Text style={localStyles.menuButtonText}>RESULTADO DO DIA</Text>
        </Button>
        <Button bg={"blue.700"} mt={3}>
          <Text style={localStyles.menuButtonText}>MILHARES COTADAS</Text>
        </Button>
        <Button bg={"blue.700"} mt={3}>
          <Text style={localStyles.menuButtonText}>PULE PREMIADA</Text>
        </Button>
        <Button bg={"blue.700"} mt={3}>
          <Text style={localStyles.menuButtonText}>CANCELAMENTO DE PULE</Text>
        </Button>
        <Divider
          my="5"
          _light={{
            bg: "muted.800",
          }}
        />
        <Button
          bg={"blue.700"}
          mt={0}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={localStyles.menuButtonText}>MEU PERFIL</Text>
        </Button>
        <Divider
          my="5"
          _light={{
            bg: "muted.800",
          }}
        />
        <Button bg={"red.500"} onPress={handleLogout}>
          <Text style={localStyles.menuButtonText}>SAIR</Text>
        </Button>
      </View>
    </BottomCart>
  );
};

const localStyles = StyleSheet.create({
  menuButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderRadius: 10, // Aumentando o raio da borda para deixar mais arredondado
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
