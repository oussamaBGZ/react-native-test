import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { VehicleContext } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../types';

const FavouritesScreen = () => {
  const { state } = useContext(VehicleContext);
  const favouriteVehicles = state.vehicles.filter(vehicle => vehicle.favourite);

  const renderItem = ({ item }: { item: Vehicle }) => (
    <VehicleCard vehicle={item} onPress={() => {}} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Vehicles</Text>
      <FlatList
        data={favouriteVehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default FavouritesScreen;