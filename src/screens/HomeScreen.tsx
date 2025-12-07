import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VehicleContext } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { FilterData, Vehicle } from '../types';
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

  const handleFilter = ({ make, model, minBid, maxBid }: FilterData) => {
    const min = minBid ? parseFloat(minBid) : undefined;
    const max = maxBid ? parseFloat(maxBid) : undefined;

    const filtered = state.vehicles.filter(v =>
      (!make || v.make.toLowerCase().includes(make.toLowerCase())) &&
      (!model || v.model.toLowerCase().includes(model.toLowerCase())) &&
      (!min || (v.startingBid ?? 0) >= min) &&
      (!max || (v.startingBid ?? 0) <= max)
    );

    if (filtered.length) setFilters(filtered);
    else {
      Alert.alert('No vehicles found with the applied filters');
      setFilters([]);
    }
  };

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
        onApply={(data) => handleFilter(data)}
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