/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "../styles"; // Importe os estilos comuns
import { BottomCart } from "../components/BottomCart";
import { RootStackParamList } from "../types/routes.type";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Button } from "native-base";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const Profile = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={localStyles.profileImageContainer}>
          <Image
            style={localStyles.profileImage}
            source={{ uri: "https://via.placeholder.com/150" }} // Substitua pela URL da foto do usuário
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu login"
            placeholderTextColor="#ccc"
          />
        </View>
        {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu endereço"
              placeholderTextColor="#ccc"
            />
          </View> */}
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua nova senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Button bg={"blue.700"}>Salvar</Button>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  profileImageContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#6c63ff",
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
