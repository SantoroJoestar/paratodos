/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, Alert, FlatList, ScrollView } from 'react-native';
import styles from '../styles'; // Import common styles

const PrizesScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedPrizes, setSelectedPrizes] = useState([]);
  const [betAmount, setBetAmount] = useState('');
  const [betValues, setBetValues] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePrizeSelection = (prizeNumber) => {
    if (selectedPrizes.includes(prizeNumber)) {
      setSelectedPrizes(selectedPrizes.filter((item) => item !== prizeNumber));
    } else {
      setSelectedPrizes([...selectedPrizes, prizeNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedPrizes.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um prêmio.');
    } else if (!betAmount) {
      Alert.alert('Erro', 'Informe o valor da aposta.');
    } else {
      const newBet = {
        prizes: selectedPrizes,
        betAmount: parseFloat(betAmount).toFixed(2),
      };
      setBetValues([...betValues, newBet]);
      setSelectedPrizes([]);
      setBetAmount('');
      toggleModal();
    }
  };

  const deleteBet = (index) => {
    setBetValues(betValues.filter((_, i) => i !== index));
  };

  const handleProceed = () => {
    if (betValues.length === 0) {
      Alert.alert('Erro', 'Faça pelo menos uma aposta antes de prosseguir.');
    } else {
      navigation.navigate('FinalizeGameMilharScreen', { numbers: route.params.numbers, betValues });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
              <Text style={localStyles.modalText}>Selecione os prêmios desejados:</Text>
              {[1, 2, 3, 4, 5].map((prizeNumber) => (
                <TouchableOpacity
                  key={prizeNumber}
                  style={[localStyles.prizeButton, selectedPrizes.includes(prizeNumber) && localStyles.selectedPrize]}
                  onPress={() => handlePrizeSelection(prizeNumber)}
                >
                  <Text style={localStyles.prizeButtonText}>{`${prizeNumber}º Prêmio`}</Text>
                </TouchableOpacity>
              ))}
              <TextInput
                style={localStyles.input}
                placeholder="Informe o valor da aposta"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={betAmount}
                onChangeText={setBetAmount}
              />
              <TouchableOpacity style={[styles.actionButton, localStyles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.actionButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, localStyles.closeButton]} onPress={toggleModal}>
                <Text style={styles.actionButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Text style={styles.title}>Você está participando dos prêmios:</Text>
          <FlatList
            data={betValues}
            renderItem={({ item, index }) => (
              <View style={localStyles.betItem}>
                <View>
                  <Text style={localStyles.betItemText}>Prêmios: {item.prizes.join(', ')}</Text>
                  <Text style={localStyles.betItemText}>Valor da Aposta: R$ {item.betAmount}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteBet(index)}>
                  <Text style={localStyles.deleteButton}>Apagar</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            style={[styles.actionButton, localStyles.proceedButton]}
            onPress={handleProceed}
          >
            <Text style={styles.actionButtonText}>Prosseguir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, localStyles.prizesButton]}
            onPress={toggleModal}
          >
            <Text style={styles.actionButtonText}>Prêmios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prizeButton: {
    backgroundColor: '#6c63ff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  prizeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedPrize: {
    backgroundColor: '#4CAF50',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 10,
  },
  confirmButton: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: '#FF5733',
    marginVertical: 10,
    paddingHorizontal: 20  },
    betItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    betItemText: {
      fontSize: 16,
    },
    deleteButton: {
      color: 'red',
      fontWeight: 'bold',
    },
    proceedButton: {
      marginVertical: 10,
      backgroundColor: '#4CAF50',
      paddingHorizontal: 20,
    },
    prizesButton: {
      marginVertical: 10,
      backgroundColor: '#6c63ff',
      paddingHorizontal: 20,
    },
  });
  export default PrizesScreen;
