import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/appStyles';

const Home = () => {
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', icon: 'btc-icon' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'eth-icon' },
    { name: 'Cardano', symbol: 'ADA', icon: 'ada-icon' },
    { name: 'Binance Coin', symbol: 'BNB', icon: 'bnb-icon' },
    { name: 'Solana', symbol: 'SOL', icon: 'sol-icon' },
  ];

  const openPolygonLink = () => {
    Linking.openURL('https://polygon.io/');
  };

  return (
    <View style={styles.container}>
      <Image source={require('src/images/logo.png')} style={styles.logo} />

      <Text style={styles.paragraph}>
        Aqui você encontrará informações e dados sobre as criptomoedas mais populares. Explore o mundo das finanças digitais e fique atualizado com as últimas tendências do mercado.
      </Text>
      {cryptoData.map((crypto, index) => (
        <View key={index} style={styles.cryptoCard}>
          <Text style={styles.cryptoName}>{crypto.name}</Text>
          <Text>{crypto.symbol}</Text>
          <Image source={require(`../images/${crypto.symbol.toLowerCase()}.png`)} style={styles.cryptoIcon} />
        </View>
      ))}
      <TouchableOpacity onPress={openPolygonLink}>
        <Image source={require('../images/polygon.svg')} style={styles.polygonLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;