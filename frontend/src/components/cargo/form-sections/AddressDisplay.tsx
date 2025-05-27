import React from 'react';

interface Address {
  city: string;
  street: string;
  building: string;
  country?: string;
}

interface AddressDisplayProps {
  address: Address;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  if (!address) return null;
  
  return (
    <div className="w-full text-center font-medium px-4 py-2 bg-primary/5 rounded-lg">
      {`${address.city}, ${address.street}, ${address.building}`}
      {address.country && `, ${address.country}`}
    </div>
  );
}; 