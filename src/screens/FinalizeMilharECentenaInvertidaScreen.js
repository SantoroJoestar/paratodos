/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles'; // Import common styles

const FinalizeMilharECentenaInvertidaScreen = ({ route }) => {
  const { numbers, betValues } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({ '14h': false, '19h': false });
  const [randomizedNumbers, setRandomizedNumbers] = useState([]);

  useEffect(() => {
    const randomizeNumbers = () => {
      const randomizeArray = (arr) => arr.map(num => num.split('').sort(() => 0.5 - Math.random()).join(''));
      const uniqueNumbers = new Set(randomizeArray(numbers));
      setRandomizedNumbers([...uniqueNumbers]);
    };
    randomizeNumbers();
  }, [numbers]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleTime = (time) => {
    setSelectedTimes({ ...selectedTimes, [time]: !selectedTimes[time] });
  };

  const confirmBets = () => {
    if (betValues.length === 0) {
      Alert.alert('Erro', 'Você deve fazer pelo menos uma aposta para prosseguir.');
      return;
    }
    Alert.alert('Apostas confirmadas');
    // Aqui você pode adicionar a lógica para confirmar as apostas
  };

  const calculateTotalBetAmount = () => {
    let total = 0;
    betValues.forEach((item) => {
      total += parseFloat(item.betAmount);
    });
    return total.toFixed(2);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Finalizar Jogo</Text>
        <Text style={styles.subtitle}>Data do sorteio:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={localStyles.dateButton}>
          <Text style={localStyles.dateButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.subtitle}>Horários do sorteio:</Text>
        <View style={localStyles.timesContainer}>
          {Object.keys(selectedTimes).map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                localStyles.timeButton,
                selectedTimes[time] && localStyles.timeButtonSelected,
              ]}
              onPress={() => toggleTime(time)}
            >
              <Text style={localStyles.timeButtonText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subtitle}>Números:</Text>
        <FlatList
          data={randomizedNumbers}
          renderItem={({ item }) => (
            <View style={localStyles.numberItem}>
              <Text style={localStyles.numberText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.subtitle}>Apostas:</Text>
        <FlatList
          data={betValues}
          renderItem={({ item }) => (
            <View style={localStyles.betItem}>
              <Text style={localStyles.betItemText}>Prêmios: {item.prizes.join(', ')}</Text>
              <Text style={localStyles.betItemText}>Valor da Aposta: R$ {item.betAmount}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={localStyles.totalText}>Total Apostado: R$ {calculateTotalBetAmount()}</Text>
        <TouchableOpacity style={[styles.actionButton, localStyles.confirmButton]} onPress={confirmBets}>
          <Text style={styles.actionButtonText}>Confirmar Apostas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 18,
  },
  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  timeButtonSelected: {
    backgroundColor: '#6c63ff',
  },
  timeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  numberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  numberText: {
    fontSize: 18,
  },
  betItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  betItemText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  confirmButton: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default FinalizeMilharECentenaInvertidaScreen;
