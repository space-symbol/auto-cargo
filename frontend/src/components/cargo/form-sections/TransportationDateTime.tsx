import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TransportationDateTimeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TransportationDateTime: React.FC<TransportationDateTimeProps> = ({
  value,
  onChange,
  error,
}) => {
  // Get tomorrow's date as the minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 16);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="transportationDateTime">Дата и время транспортировки</Label>
        <Input
          id="transportationDateTime"
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate}
          className={error ? 'border-red-500' : ''}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
}; 