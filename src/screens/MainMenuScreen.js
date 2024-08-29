/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles'; // Importe os estilos comuns

const MainMenuScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={() => navigation.navigate('Games')}
      >
        <Text style={localStyles.menuButtonText}>Jogos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={localStyles.menuButtonText}>Meu Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={handleLogout}
      >
        <Text style={localStyles.menuButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderRadius: 10, // Aumentando o raio da borda para deixar mais arredondado
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainMenuScreen;
