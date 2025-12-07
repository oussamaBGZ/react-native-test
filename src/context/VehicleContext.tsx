import React, { createContext, useReducer, ReactNode } from 'react';
import { Vehicle, VehicleAction } from '../types';
import { fetchVehicles } from '../utils/api';

interface VehicleState {
  vehicles: Vehicle[];
}

const initialState: VehicleState = {
  vehicles: fetchVehicles(),
};

const VehicleContext = createContext<{
  state: VehicleState;
  dispatch: React.Dispatch<VehicleAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const vehicleReducer = (state: VehicleState, action: VehicleAction): VehicleState => {
  switch (action.type) {
    case 'SET_VEHICLES':
      return { ...state, vehicles: action.payload };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === action.payload.id ? { ...vehicle, favourite: true } : vehicle
        ),
      };
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === action.payload.id ? { ...vehicle, favourite: false } : vehicle
        ),
      };
    default:
      return state;
  }
};

const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  return (
    <VehicleContext.Provider value={{ state, dispatch }}>
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };