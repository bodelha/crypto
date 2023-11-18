import axios from 'axios';

const POLYGON_API_KEY = '';

const symbol_map = {
  "BTC": "X:BTCUSD",
  "ETH": "X:ETHUSD",
  "ADA": "X:ADAUSD",
  "DOGE": "X:DOGEUSD",
  "SOL": "X:SOLUSD",
}

const getHistoricalData = async (symbol) => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const formattedThreeMonthsAgo = threeMonthsAgo.toISOString().split('T')[0];

    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol_map[symbol]}/range/1/day/${formattedThreeMonthsAgo}/${formattedCurrentDate}?apiKey=${POLYGON_API_KEY}`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };


    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.error('Erro na solicitação:', error.message);
    throw error;
  }
};

export default getHistoricalData;