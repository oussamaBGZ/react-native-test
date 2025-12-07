import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { VehicleProvider } from './context/VehicleContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <VehicleProvider>
        <AppNavigator />
      </VehicleProvider>
    </NavigationContainer>
  );
};

export default App;