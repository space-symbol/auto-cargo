import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholderText?: string;
  className?: string;
}

export const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ selected, onSelect, placeholderText, className }, ref) => {
    return (
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) => onSelect(date || undefined)}
        customInput={                                                           
          <Button
            ref={ref}
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", className)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {selected ? selected.toLocaleDateString() : placeholderText}
          </Button>
        }
      />
    );
  }
); 