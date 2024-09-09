/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";

type Props = NativeStackScreenProps<RootStackParamList, "MainMenu">;

export const MainMenu = ({ navigation }: Props) => {
  const handleLogout = () => {
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={() => navigation.navigate("MenuGames")}
      >
        <Text style={localStyles.menuButtonText}>Jogos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={localStyles.menuButtonText}>Meu Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={localStyles.menuButton} onPress={handleLogout}>
        <Text style={localStyles.menuButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
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
