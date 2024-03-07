import { configureStore } from "@reduxjs/toolkit";
import pharmacyReducer from "./features/Inventory/pharmacySlice";
import labReducer from "./features/Inventory/labSlice";

export const store = configureStore({
  reducer: {
    pharmacy: pharmacyReducer,
    laboratory: labReducer,
  },
});
