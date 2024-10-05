import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Box, Button, useToast } from "native-base";
import { RootStackParamList } from "../types/routes.type";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { login } from "../services/user";
import { useAuth } from "../providers/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default ({ navigation }: Props) => {
  const toast = useToast();
  const { login: loginAuth } = useAuth();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const user = await login(form);
      loginAuth(user);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="4" py="2" rounded="sm" mb={5}>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Login feito com sucesso!
              </Text>
            </Box>
          );
        },
      });
    } catch (error: unknown) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="4" py="2" rounded="sm" mb={5}>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                {(error as Error)?.message || ""}
              </Text>
            </Box>
          );
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../media/logoHeaderFooter.jpg")}
          style={styles.logo}
        />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              placeholderTextColor="#ccc"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.login}
              onChangeText={(text) => setForm({ ...form, login: text })}
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
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
          </View>
          <Button
            bg={"yellow.600"}
            onPress={handleLogin}
            disabled={form.login.trim() === "" || form.password.trim() === ""}
          >
            Entrar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start", // Alinhar os itens ao topo
    // paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logo: {
    width: "100%",
    height: 202,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
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
    color: "black",
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 16,
  },
});
