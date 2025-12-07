import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Vehicle } from '../types';
import { VehicleContext } from '../context/VehicleContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: (vehicleId: string) => void;
}

export const calculateCountdown = (targetDate: string): string => {

  const formattedDate = targetDate.replace(/\//g, '-');
  const diffMs = new Date(formattedDate).getTime() - new Date().getTime();

  if (diffMs < 0) return 'Ended';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days} day ${hours}h`;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress }) => {
  const { dispatch } = useContext(VehicleContext);
  const countdown = calculateCountdown(vehicle.auctionDateTime!);

  const isFavourite = vehicle.favourite;

  const handleFavouritePress = () => {
    if (isFavourite) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: vehicle });
    } else {
      dispatch({ type: 'ADD_FAVOURITE', payload: vehicle });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(vehicle.id)}>
      <View style={styles.imagePlaceholder}>
        <View
          style={styles.image}
        />
        <View style={styles.countdownBadge}>
          <Text style={styles.countdownIcon}>⏱️</Text>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
        <TouchableOpacity style={styles.heartButton} onPress={handleFavouritePress}>
          <Text style={styles.heartIcon}>{isFavourite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        {vehicle.favourite && <View style={styles.featuredBadge}><Text style={styles.featuredText}>⭐ Featured</Text></View>}
      </View>
      <View style={styles.content}>
        <Text style={styles.makeModel}>{vehicle.make}</Text>
        <Text style={styles.modelName}>{vehicle.model}</Text>
        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specIcon}>📅</Text>
          <Text style={styles.specText}>Year: <Text style={styles.specValue}>{vehicle.year}</Text></Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specIcon}>🛣️</Text>
          <Text style={styles.specText}>Mileage: <Text style={styles.specValue}>{vehicle.mileage?.toLocaleString()} km</Text></Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specIcon}>⛽</Text>
          <Text style={styles.specText}>Fuel: <Text style={styles.specValue}>{vehicle.fuel}</Text></Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specIcon}>🔧</Text>
          <Text style={styles.specText}>Engine: <Text style={styles.specValue}>{vehicle.engineSize}</Text></Text>
        </View>

        <View style={styles.bidContainer}>
          <Text style={styles.bidLabel}>Starting Bid</Text>
          <Text style={styles.bidPrice}>${vehicle.startingBid?.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  imagePlaceholder: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#f0f0f0',
    flex: 0,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    backgroundColor: '#d8d8d8',
    
  },
  countdownBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 56, 56, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countdownIcon: {
    fontSize: 16,
  },
  countdownText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  heartIcon: {
    fontSize: 28,
  },
  content: {
    padding: 18,
  },
  makeModel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  modelName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginTop: 4,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 14,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  specIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 24,
  },
  specText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  specValue: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
  bidContainer: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: 'rgba(46, 204, 113, 0.06)',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderRadius: 10,
  },
  bidLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  bidPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2ecc71',
    marginTop: 6,
    letterSpacing: -0.5,
  },
});

export default VehicleCard;