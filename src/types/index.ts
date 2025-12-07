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


export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    make: string;
    model: string;
    minBid: number | null;
    maxBid: number | null;
  }) => void;
}


export type VehicleAction =
  | { type: 'ADD_FAVOURITE'; payload: Vehicle }
  | { type: 'REMOVE_FAVOURITE'; payload: Vehicle }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] };