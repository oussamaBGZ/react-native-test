import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types';

type VehicleDetailsScreenProps = {
  route: any;
  navigation: any;
};

const VehicleDetailsScreen: React.FC<VehicleDetailsScreenProps> = ({ route }) => {
  const { vehicleId } = route.params;
  const { state } = useContext(VehicleContext);
  const vehicle: Vehicle | undefined = state.vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Vehicle not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Vehicle Image</Text>
      </View>
      <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
      <Text>Year: {vehicle.year}</Text>
      <Text>Engine Size: {vehicle.engineSize}</Text>
      <Text>Fuel: {vehicle.fuel}</Text>
      <Text>Mileage: {vehicle.mileage} km</Text>
      <Text>Auction Date: {vehicle.auctionDateTime}</Text>
      <Text>Starting Bid: ${vehicle.startingBid}</Text>
      <Text>Favourite: {vehicle.favourite ? 'Yes' : 'No'}</Text>
      <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non rerum accusamus provident repudiandae. Sunt, expedita suscipit. Quibusdam laborum eaque adipisci nobis, veritatis eveniet excepturi ex molestiae ea quas unde. Dignissimos?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#d8d8d8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VehicleDetailsScreen;