export interface Vehicle {
  id: string;
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year?: number;
  mileage?: number;
  auctionDateTime?: string;
  startingBid?: number;
  favourite: boolean;
}

export interface FilterData {
  make?: string;
  model?: string;
  minBid?: string;
  maxBid?: string;
};

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterData) => void;
}


export type VehicleAction =
  | { type: 'ADD_FAVOURITE'; payload: Vehicle }
  | { type: 'REMOVE_FAVOURITE'; payload: Vehicle }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] };