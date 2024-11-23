import { CommandInput } from "@/components/ui/command";
import { Search } from 'lucide-react';

interface MultiSelectProps {
  selected: string[];
  onRemove: (value: string) => void;
  placeholder: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const MultiSelect = ({ 
  selected, 
  onRemove, 
  placeholder,
  value,
  onValueChange 
}: MultiSelectProps) => {
  return (
    <div className="flex items-center p-2 gap-2">
      <Search className="h-4 w-4 shrink-0 opacity-50" />
      <div className="flex flex-wrap gap-2 items-center flex-1">
        {selected.map((item) => (
          <div
            key={item}
            className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {item}
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemove(item);
              }}
              className="hover:text-indigo-950"
            >
              ×
            </button>
          </div>
        ))}
        <div className="relative flex-1">
          <CommandInput 
            value={value}
            onValueChange={onValueChange}
            placeholder={selected.length === 0 ? placeholder : ""} 
            className="bg-transparent min-w-[200px] p-0 focus:ring-0 focus:border-0"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none hidden">
            <Search className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};