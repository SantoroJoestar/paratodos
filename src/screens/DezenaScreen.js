/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import styles from '../styles'; // Import common styles

const DezenaScreen = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([]);

  const addNumber = (num) => {
    setNumbers([...numbers, num]);
    setNumber('');
  };

  const handleNext = () => {
    if (numbers.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um número de 2 dígitos.');
    } else {
      navigation.navigate('PrizesDezenaScreen', { numbers });
    }
  };

  const handleInputChange = (text) => {
    setNumber(text);
    if (text.length === 2) {
      addNumber(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite um número de 2 dígitos:</Text>
      <TextInput
        style={[styles.input, localStyles.input]}
        keyboardType="numeric"
        maxLength={2}
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

export default DezenaScreen;
