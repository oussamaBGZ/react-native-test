import { Vehicle } from '../types';

export const fetchVehicles = (): Vehicle[] => {
    const vehicles: Vehicle[] = require('../../vehicles.json');
    return vehicles;
};