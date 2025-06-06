import { Drug } from "@/data/drug";
import { atom } from "jotai";

export type CalculatedDrug = Drug & {
  calculatedDoseWithRange?: {
    lower: number;
    upper: number;
  };
  calculatedEatWithRange?: {
    lower: number;
    upper: number;
  };
  howToTake?: {
    first: string;
    second?: string;
  };
  secondaryData?: CalculatedDrug;
};

export const drugsAtom = atom<Drug[]>([]);

export const drugsHistoryAtom = atom<CalculatedDrug[]>([]);

// Alias for backward compatibility
export const historyDrugAtom = drugsHistoryAtom;
