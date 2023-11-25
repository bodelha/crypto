import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import CryptoHistoricalDataPage from './historical';

const Home = () => {
  const navigation = useNavigation()
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', icon: require('./images/btc.png') },
    { name: 'Ethereum', symbol: 'ETH', icon: require('./images/eth.png') },
    { name: 'Cardano', symbol: 'ADA', icon: require('./images/ada.png') },
    { name: 'Doge', symbol: 'DOGE', icon: require('./images/doge.png') },
    { name: 'Solana', symbol: 'SOL', icon: require('./images/sol.png') },
  ];

  const navigateToHistoricalChart = (cryptoSymbol) => {
    // Navigating to HistoricalChart component using the clicked button's symbol
    navigation.navigate('CryptoHistoricalDataPage', { symbol: cryptoSymbol });
  };

  const openPolygonLink = () => {
    Linking.openURL('https://polygon.io/');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./images/logo.png')} style={styles.logo} />

      <Text style={styles.paragraph}>
        Aqui você encontrará informações e dados sobre as criptomoedas mais populares. Explore o mundo das finanças digitais e fique atualizado com as últimas tendências do mercado.
      </Text>
      {cryptoData.map((crypto, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigateToHistoricalChart(crypto.symbol)}
          style={styles.cryptoCard}
        >
          <Text style={styles.cryptoName}>{crypto.name}</Text>
          <View style={styles.cryptoDiv}>
            <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
            <Image source={crypto.icon} style={styles.cryptoIcon} />
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={openPolygonLink} style={styles.polygonPhraseContainer}>
        <Text style={styles.polygonPhrase}>
          Powered by <Image source={require('./images/polygon.png')} style={styles.polygonLogo} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
