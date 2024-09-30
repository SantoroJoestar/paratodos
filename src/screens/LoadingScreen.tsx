import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f5", // Cor de fundo da SplashScreen
  },
  text: {
    fontSize: 20,
    marginTop: 20, // Espaço entre o texto e o ActivityIndicator
    color: "#333",
  },
});
