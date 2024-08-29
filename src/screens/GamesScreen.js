/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles'; // Importe os estilos comuns

const GamesScreen = ({ navigation }) => {
    const games = [
        { name: 'Milhar', screen: 'Milhar' },
        { name: 'Centena', screen: 'Centena' },
        { name: 'Milhar Centena', screen: 'MilharCentena' },
        { name: 'Milhar Invertida', screen: 'MilharInvertidaScreen' },
        { name: 'Centena Invertida', screen: 'CentenaInvertidaScreen' },
        { name: 'Dezena', screen: 'DezenaScreen' },
        { name: 'Duque de Dezena', screen: 'DuqueDeDezenaScreen' },
        { name: 'Terno de Dezena', screen: 'TernoDeDezenaScreen' },
        { name: 'Milhar e Dezena', screen: 'MilharDezenaScreen' },
        { name: 'Milhar, Centena e Dezena', screen: 'MilharCentenaDezenaScreen' },
        { name: 'Centena Dezena', screen: 'CentenaDezenaScreen' },
        { name: 'Grupo', screen: 'GrupoScreen' },
        { name: 'Duque de Grupo', screen: 'DuqueDeGrupoScreen' },
        { name: 'Terno de Grupo', screen: 'TernoDeGrupoScreen' },
        // Adicione mais jogos aqui se necessário
    ];

    const navigateToGame = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <ScrollView contentContainerStyle={localStyles.scrollContainer}>
            <View style={localStyles.container}>
                <Text style={localStyles.title}>Escolha seu Jogo</Text>
                <View style={localStyles.gridContainer}>
                    {games.map((game, index) => (
                        <TouchableOpacity
                            key={index}
                            style={localStyles.gameButton}
                            onPress={() => navigateToGame(game.screen)}
                        >
                            <Text style={localStyles.gameButtonText}>{game.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={localStyles.footerText}>Desenvolvido por Evolved World</Text>
            </View>
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
        paddingBottom: 50, // Ajuste para garantir espaço para o rodapé
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gameButton: {
        backgroundColor: '#6c63ff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: '30%', // Mantém 3 botões por linha
        aspectRatio: 1, // Garantindo que os botões sejam quadrados
        padding: 10, // Espaçamento interno ajustado
    },
    gameButtonText: {
        color: '#fff',
        fontSize: 14, // Ajuste para acomodar títulos maiores
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footerText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
    },
});

export default GamesScreen;
