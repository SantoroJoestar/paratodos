/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import styles from '../styles'; // Import common styles

const TernoDeGrupoScreen = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([]);

  const addNumber = (num) => {
    const parts = num.split('-');
    const firstNumber = parseInt(parts[0], 10);
    const secondNumber = parseInt(parts[1], 10);
    const thirdNumber = parseInt(parts[2], 10);
    if (
      firstNumber >= 1 && firstNumber <= 25 &&
      secondNumber >= 1 && secondNumber <= 25 &&
      thirdNumber >= 1 && thirdNumber <= 25
    ) {
      setNumbers([...numbers, num]);
      setNumber('');
    } else {
      Alert.alert('Erro', 'Insira três números entre 01 e 25.');
    }
  };

  const handleNext = () => {
    if (numbers.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um Terno de Grupo.');
    } else {
      navigation.navigate('PrizesTernoDeGrupoScreen', { numbers });
    }
  };

  const handleInputChange = (text) => {
    setNumber(text);
    if (text.length === 8) {
      addNumber(text);
    } else if (text.length === 2 && number.length === 1) {
      setNumber(text + '-');
    } else if (text.length === 5 && number.length === 4) {
      setNumber(text + '-');
    } else if (text.length === 8 && number.length === 7) {
      const numberInt = parseInt(text.split('-')[2], 10);
      if (numberInt >= 1 && numberInt <= 25) {
        addNumber(text);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite três números de 01 a 25:</Text>
      <TextInput
        style={[styles.input, localStyles.input]}
        keyboardType="numeric"
        maxLength={8}
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

export default TernoDeGrupoScreen;
