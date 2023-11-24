import axios from 'axios';

const POLYGON_API_KEY = '';

export const getHistoricalData = async (symbol) => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const sixMonthsAgo = new Date(currentDate.getTime() - 180 * 24 * 60 * 60 * 1000);
    const formattedSixMonthsAgo = sixMonthsAgo.toISOString().split('T')[0];

    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/X:${symbol}USD/range/1/day/${formattedSixMonthsAgo}/${formattedCurrentDate}?apiKey=${POLYGON_API_KEY}`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.log('Erro na solicitação, usando dados mockados:', error.message);
    return null
  }
};

export const transformDataForLineChart = (data, label, days = null) => {
  // If days parameter is not provided, assume data.resultsCount value
  const daysToUse = days || data.resultsCount;

  // Limit the data to the specified number of days
  const filteredData = data.results.slice(-daysToUse);

  const result = filteredData.map(item => ({
    "value": item[label],
    "dataPointText": String(item[label].toFixed(2)),
  }));

  return result;
};