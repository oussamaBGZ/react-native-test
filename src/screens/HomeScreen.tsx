import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VehicleContext } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../types';
import FilterModal from '../components/FilterModel';

type HomeScreenNavigationProp = NativeStackNavigationProp<any, 'Home'>;

const HomeScreen = () => {
  const { state } = useContext(VehicleContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<Array<Vehicle>>([]);

  const handleVehiclePress = (vehicleId: string) => {
    navigation.navigate('VehicleDetailsScreen', { vehicleId });
  };

  const handleFavoritesPress = () => {
    navigation.navigate('FavouritesScreen');
  };

  const renderItem = ({ item }: { item: Vehicle }) => (
    <VehicleCard vehicle={item} onPress={handleVehiclePress} />
  );

  const handelFIlter = (data: any) => {
    setFilters([]);
    let filteredVehicles = state.vehicles;

    if (data.make) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.make.toLowerCase().includes(data.make.toLowerCase()));
    }
    if (data.model) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.model.toLowerCase().includes(data.model.toLowerCase()));
    }
    if (data.minBid) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.startingBid && (vehicle.startingBid >= parseFloat(data.minBid)));
    }
    if (data.maxBid) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.startingBid && (vehicle.startingBid <= parseFloat(data.maxBid)));
    }
debugger;
    filteredVehicles.length > 0 ? setFilters(filteredVehicles) : Alert.alert('No vehicles found with the applied filters');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Vehicles</Text>
        <TouchableOpacity style={styles.favoritesButton} onPress={() => setShowModal(true)} >
          <Text style={styles.favoritesButtonText}>⭐ Open Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoritesButton} onPress={handleFavoritesPress}>
          <Text style={styles.favoritesButtonText}>❤️ Favorites</Text>
        </TouchableOpacity>
      </View>
      <FilterModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onApply={(data) => handelFIlter(data)}
      />
      <FlatList
        data={filters.length > 0 ? filters : state.vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoritesButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;