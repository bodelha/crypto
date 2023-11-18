import getHistoricalData from './scripts';

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const CryptoHistoricalDataPage = () => {
  const [historicalData, setHistoricalData] = useState(null);

  const handleGetHistoricalData = async () => {
    try {
      // Chamando a função para obter dados históricos para o BTC
      const data = await getHistoricalData('SOL');
      setHistoricalData(data);
      console.log('Dados históricos para BTC:', data);
    } catch (error) {
      console.error('Erro ao obter dados históricos:', error.message);
    }
  };

  return (
    <View>
      <Text>Página de Dados Históricos de Cripto</Text>
      <Button title="Obter Dados Históricos BTC" onPress={handleGetHistoricalData} />
      {historicalData && (
        <View>
          <Text>Dados Históricos:</Text>
          <Text>{JSON.stringify(historicalData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default CryptoHistoricalDataPage;