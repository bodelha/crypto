import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import mockedData from './sol';
import { transformDataForLineChart, getHistoricalData } from './scripts';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native'; // Importe useRoute do '@react-navigation/native'

import styles from './styles';

const CryptoHistoricalDataPage = () => {
  const route = useRoute(); // Use useRoute para acessar as propriedades da rota
  const { symbol } = route.params;

  const [closureData, setClosureData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const intervalOptions = [
    { 'label': 'semana', 'value': 7 },
    { 'label': 'Mês', 'value': 30 },
    { 'label': '3 Meses', 'value': 90 },
    { 'label': '6 Meses', 'value': 180 }
  ];
  const [interval, setInterval] = useState(180);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalData(symbol);
        const cData = await transformDataForLineChart(data || mockedData, 'c', interval); // Use interval em vez de days
        setClosureData(cData);
        const vData = await transformDataForLineChart(data || mockedData, 'v', interval); // Use interval em vez de days
        setVolumeData(vData);
      } catch (error) {
        console.error('Error fetching or transforming historical data:', error.message);
      }
    };

    fetchData();
  }, [symbol, interval]); // Adicione symbol e interval como dependências do useEffect

  if (!closureData || closureData.length === 0) {
    return <Text>Loading closure data...</Text>;
  } else if (!volumeData || volumeData.length === 0) {
    return <Text>Loading volumeData data...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>

        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              placeholder={'Intervalo'}
              items={intervalOptions}
              value={'value'}
              open={open}
              setOpen={setOpen}
              onOpen={() => setOpen(true)}
              containerStyle={styles.DropDownPicker}
              style={{ ...styles.DropDownPicker, ...styles.DropDownPickerOpen }}
            />
          </View>
        </TouchableWithoutFeedback>

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
          />
        </View>
      </View>
    </View>
  );
};

export default CryptoHistoricalDataPage;
