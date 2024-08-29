/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import styles from '../styles'; // Import common styles

const DuqueDeGrupoScreen = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([]);

  const addNumber = (num) => {
    const parts = num.split('-');
    const firstNumber = parseInt(parts[0], 10);
    const secondNumber = parseInt(parts[1], 10);
    if (
      firstNumber >= 1 && firstNumber <= 25 &&
      secondNumber >= 1 && secondNumber <= 25
    ) {
      setNumbers([...numbers, num]);
      setNumber('');
    } else {
      Alert.alert('Erro', 'Insira dois números entre 01 e 25.');
    }
  };

  const handleNext = () => {
    if (numbers.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um Duque de Grupo.');
    } else {
      navigation.navigate('PrizesDuqueDeGrupoScreen', { numbers });
    }
  };

  const handleInputChange = (text) => {
    setNumber(text);
    if (text.length === 5) {
      addNumber(text);
    } else if (text.length === 2 && number.length === 1) {
      setNumber(text + '-');
    } else if (text.length === 5 && number.length === 4) {
      const numberInt = parseInt(text.split('-')[1], 10);
      if (numberInt >= 1 && numberInt <= 25) {
        addNumber(text);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite dois números de 01 a 25:</Text>
      <TextInput
        style={[styles.input, localStyles.input]}
        keyboardType="numeric"
        maxLength={5}
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

export default DuqueDeGrupoScreen;
