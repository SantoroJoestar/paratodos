/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import styles from '../styles'; // Import common styles

const DuqueDeDezenaScreen = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([]);

  const addNumber = (num) => {
    setNumbers([...numbers, num]);
    setNumber('');
  };

  const handleNext = () => {
    if (numbers.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um duque de dezena.');
    } else {
      navigation.navigate('PrizesDuqueDeDezenaScreen', { numbers });
    }
  };

  const handleInputChange = (text) => {
    // Remove qualquer traço do texto para validar corretamente o comprimento
    const sanitizedText = text.replace('-', '');
    setNumber(text);

    if (sanitizedText.length === 4) { // Espera o formato "XX-XX"
      addNumber(text);
    } else if (sanitizedText.length === 2) {
      setNumber(text + '-');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite dois números de 2 dígitos:</Text>
      <TextInput
        style={[styles.input, localStyles.input]}
        keyboardType="numeric"
        maxLength={5} // Ajustado para incluir o traço
        value={number}
        onChangeText={handleInputChange}
      />
      <FlatList
        data={numbers}
        renderItem={({ item }) => (
          <View style={localStyles.numberItem}>
            <Text style={localStyles.numberText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
        <Text style={styles.actionButtonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  numberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  numberText: {
    fontSize: 18,
  },
});

export default DuqueDeDezenaScreen;
