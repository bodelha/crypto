import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home.js';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Crypto App',
    },
  },
  // ... (adicionar outras rotas aqui)
});

export default createAppContainer(AppNavigator);