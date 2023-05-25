import { createContext } from "react";

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  onlyOpen: boolean;
  setOnlyOpen: (onlyOpen: boolean) => void;
  bikeQuantity: number;
  setBikeQuantity: (bikeQuantity: number) => void;
}

const FilterContext = createContext<FilterContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
  onlyOpen: false,
  setOnlyOpen: () => {},
  bikeQuantity: 0,
  setBikeQuantity: () => {},
});

export default FilterContext;
