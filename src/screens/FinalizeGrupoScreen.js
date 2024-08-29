/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles'; // Import common styles

const FinalizeGrupoScreen = ({ route }) => {
  const { numbers, betValues } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({ '14h': false, '19h': false });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleTime = (time) => {
    setSelectedTimes({ ...selectedTimes, [time]: !selectedTimes[time] });
  };

  const confirmBets = () => {
    // Verificar se há pelo menos uma aposta selecionada
    if (betValues.length === 0) {
      Alert.alert('Erro', 'Você deve fazer pelo menos uma aposta para prosseguir.');
      return;
    }

    // Aqui você pode adicionar a lógica para confirmar as apostas
    Alert.alert('Apostas confirmadas');
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  // Função para calcular o valor total das apostas
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
        <TouchableOpacity style={localStyles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={localStyles.datePickerButtonText}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <View style={localStyles.timeContainer}>
          {['14h', '19h'].map(time => (
            <TouchableOpacity
              key={time}
              style={[localStyles.timeButton, selectedTimes[time] && localStyles.selectedTimeButton]}
              onPress={() => toggleTime(time)}
            >
              <Text style={localStyles.timeButtonText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={localStyles.summaryContainer}>
          <Text style={localStyles.summaryTitle}>Resumo das Apostas:</Text>
          <FlatList
            data={betValues}
            renderItem={({ item }) => (
              <View style={localStyles.betSummary}>
                <Text style={localStyles.summaryText}>
                  Números: {numbers.join(', ')}
                </Text>
                <Text style={localStyles.summaryText}>
                  Prêmios: {item.prizes.join(', ')}
                </Text>
                <Text style={localStyles.summaryText}>
                  Valor: R$ {item.betAmount}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* Campo para mostrar o valor total das apostas */}
          <Text style={localStyles.totalText}>
            Valor Total das Apostas: R$ {calculateTotalBetAmount()}
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={confirmBets}>
          <Text style={styles.actionButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  datePickerButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  timeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#6c63ff',
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  betSummary: {
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  totalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FinalizeGrupoScreen;
