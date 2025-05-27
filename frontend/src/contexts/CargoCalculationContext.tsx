import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AddressData {
  city: string;
  street: string;
  building: string;
  country: string;
}

interface CargoCalculationData {
  cargoTypeId: string;
  vehicleTypeId: string;
  weight: number;
  volume: number;
  fromAddress: AddressData;
  toAddress: AddressData;
  calculatedCost: number;
}

interface CargoCalculationContextType {
  calculationData: CargoCalculationData | null;
  setCalculationData: (data: CargoCalculationData | null) => void;
  clearCalculationData: () => void;
}

const CargoCalculationContext = createContext<CargoCalculationContextType | undefined>(undefined);

export function CargoCalculationProvider({ children }: { children: ReactNode }) {
  const [calculationData, setCalculationData] = useState<CargoCalculationData | null>(null);

  const clearCalculationData = () => {
    setCalculationData(null);
  };

  return (
    <CargoCalculationContext.Provider 
      value={{ 
        calculationData, 
        setCalculationData,
        clearCalculationData
      }}
    >
      {children}
    </CargoCalculationContext.Provider>
  );
}

export function useCargoCalculation() {
  const context = useContext(CargoCalculationContext);
  if (context === undefined) {
    throw new Error('useCargoCalculation must be used within a CargoCalculationProvider');
  }
  return context;
} 