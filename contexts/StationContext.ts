import { createContext } from "react";
import Station from "../types/Station";

interface StationContextType {
  stations: Station[];
}

const StationContext = createContext<StationContextType>({
  stations: [],
});

export default StationContext;
