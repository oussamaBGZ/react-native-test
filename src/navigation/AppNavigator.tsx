import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VehicleDetailsScreen" component={VehicleDetailsScreen} />
      <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;