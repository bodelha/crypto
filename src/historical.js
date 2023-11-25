import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { transformDataForLineChart, getHistoricalData } from './scripts';
import mockedData from './sol';
import styles from './styles';

const CryptoHistoricalDataPage = () => {
  const route = useRoute();
  const { symbol } = route.params;
  const navigation = useNavigation();

  const [closureData, setClosureData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [interval, setInterval] = useState(180);
  const [closureMin, setClosureMin] = useState(0); // Adicionado
  const [closureMax, setClosureMax] = useState(0); // Adicionado
  const [volumeMin, setVolumeMin] = useState(0);   // Adicionado
  const [volumeMax, setVolumeMax] = useState(0);   // Adicionado

  const intervalOptions = [
    { 'label': 'Semana', 'value': 7 },
    { 'label': 'Mês', 'value': 30 },
    { 'label': '3 Meses', 'value': 90 },
    { 'label': '6 Meses', 'value': 180 }
  ];

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalData(symbol);
        const cData = await transformDataForLineChart(data || mockedData, 'c', interval);
        setClosureData(cData);
        const vData = await transformDataForLineChart(data || mockedData, 'v', interval);
        setVolumeData(vData);

        const closureMaxValue = Math.max(...cData.map((entry) => entry.value));
        const closureMinValue = Math.min(...cData.map((entry) => entry.value));
        const volumeMaxValue = Math.max(...vData.map((entry) => entry.value));
        const volumeMinValue = Math.min(...vData.map((entry) => entry.value));

        // Define os valores no estado
        setClosureMin(closureMinValue);
        setClosureMax(closureMaxValue);
        setVolumeMin(volumeMinValue);
        setVolumeMax(volumeMaxValue);
      } catch (error) {
        console.error('Error fetching or transforming historical data:', error.message);
      }
    };

    fetchData();
  }, [symbol, interval]);

  if (!closureData || closureData.length === 0) {
    return <Text>Loading closure data...</Text>;
  } else if (!volumeData || volumeData.length === 0) {
    return <Text>Loading volumeData data...</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        {intervalOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.intervalButton}
            onPress={() => handleIntervalChange(option.value)}
          >
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.histTitle}>{`${symbol} Closure Prices`}</Text>
          <LineChart
            data={closureData}
            color={'#177AD5'}
            thickness={3}
            height={450}
            hideYAxisText
            hideDataPoints
            rotateLabel
            curved
            adjustToWidth
            isAnimated
            showVerticalLines
            yAxisOffset={closureMin*0.85}  // Usa os valores calculados para o gráfico de fechamento
            maxValue={closureMax*1.15}
          />

          <Text style={styles.volTitle}>{`${symbol} Negotiation Volumes`}</Text>
          <LineChart
            areaChart
            data={volumeData}
            color={'green'}
            height={150}
            hideYAxisText
            hideDataPoints
            rotateLabel
            adjustToWidth
            isAnimated
            showVerticalLines
            yAxisOffset={volumeMin*0.85}  // Usa os valores calculados para o gráfico de volume
            maxValue={volumeMax*1.15}
          />
        </View>
      </View>
    </View>
  );
};

export default CryptoHistoricalDataPage;
