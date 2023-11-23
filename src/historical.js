import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import mockedData from './sol';
import transformDataForLineChart from './scripts';

const HistoricalChart = () => {
  const [closureData, setClosureData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cData = await transformDataForLineChart(mockedData, 'c');
        setClosureData(cData);
        const vData = await transformDataForLineChart(mockedData, 'v');
        setVolumeData(vData);
      } catch (error) {
        console.error('Error fetching or transforming historical data:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!closureData || closureData.length === 0) {
    return <Text>Loading closure data...</Text>;
  }else if (!volumeData || volumeData.length === 0){
    return <Text>Loading volumeData data...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', marginRight: '5%' }}>
        <Text style={{ textAlign: 'center', margin: 16, fontSize: 18 }}>Cryptocurrency Historical Performance</Text>

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
  );
};

export default HistoricalChart;
