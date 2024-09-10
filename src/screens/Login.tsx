/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { RootStackParamList } from "../types/routes.type";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { print } from "../utils/print";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login = ({ navigation }: Props) => {
  const navigateToMainMenu = () => {
    navigation.navigate("MainMenu"); // Redireciona para MainMenuScreen
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../media/logoHeaderFooter.jpg")} // Caminho para a imagem
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              placeholderTextColor="#ccc"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#ccc"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={navigateToMainMenu}
          >
            <Text style={styles.actionButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    justifyContent: "flex-start", // Alinhar itens ao topo
    // padding: 16,
  },
  logo: {
    width: 500, // Largura desejada da imagem
    height: 232, // Altura desejada da imagem
    resizeMode: "contain", // Modo de redimensionamento da imagem
    alignSelf: "center", // Alinhamento centralizado
    marginBottom: 24, // Espaço abaixo da imagem
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#6c63ff",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Adiciona fundo branco para melhor visibilidade
  },
  footerText: {
    fontSize: 12,
    color: "#000", // Texto preto
  },
});
