import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import mockedData from './sol';
import transformData from './scripts';

const HistoricalChart = () => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transformedData = await transformData(mockedData, 'c');
        setParsedData(transformedData);
      } catch (error) {
        console.error('Error fetching or transforming historical data:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!parsedData || parsedData.length === 0) {
    return <Text>Loading data...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', margin: 16, fontSize: 18 }}>Cryptocurrency Historical Performance</Text>

      {/* Line Chart for Closing Prices */}
      <LineChart
        data={parsedData}
        color={'#177AD5'}
        thickness={3}
        dataPointsColor={'red'}
        height={500}
        adjustToWidth
        isAnimated
        showVerticalLines
      />
    </View>
  );
};

export default HistoricalChart;
