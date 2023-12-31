import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './home.js';
import CryptoHistoricalDataPage from './historical.js';



const Stack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} /> 
        <Stack.Screen name='CryptoHistoricalDataPage' component={CryptoHistoricalDataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}