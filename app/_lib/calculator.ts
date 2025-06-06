import { Drug } from "@/data/drug";
import { CalculatedDrug } from "@/store/atoms";

// Extract calculation logic into pure functions
function calculateDoseWithRange(
  originalDoseWithRange: { lower: number; upper: number },
  weight: number
) {
  return {
    lower: originalDoseWithRange.lower * weight,
    upper: originalDoseWithRange.upper * weight,
  };
}

function calculateEatWithRange(
  calculatedDoseWithRange: { lower: number; upper: number },
  divider: number
) {
  return {
    lower: calculatedDoseWithRange.lower / divider,
    upper: calculatedDoseWithRange.upper / divider,
  };
}

function formatHowToTake(
  calculatedEatWithRange: { lower: number; upper: number },
  label: string,
  meal: string
) {
  const lowerTeaspoon = (calculatedEatWithRange.lower / 5).toFixed(1);
  const upperTeaspoon = (calculatedEatWithRange.upper / 5).toFixed(1);
  const lowerMl = calculatedEatWithRange.lower.toFixed(1);
  const upperMl = calculatedEatWithRange.upper.toFixed(1);
  
  const teaspoonDisplay = lowerTeaspoon === upperTeaspoon 
    ? lowerTeaspoon 
    : `${lowerTeaspoon} - ${upperTeaspoon}`;
  
  const mlDisplay = lowerMl === upperMl 
    ? lowerMl 
    : `${lowerMl} - ${upperMl}`;
  
  return {
    first: `ครั้งละ ${teaspoonDisplay} ช้อนชา (${mlDisplay} ml)`,
    second: `${label} ${meal}`,
  };
}

function calculateSingleDose(dose: number, weight: number, divider: number) {
  const calculatedDose = dose * weight;
  return calculatedDose / divider;
}

function formatSingleDoseHowToTake(
  calculatedEat: number,
  label: string,
  meal: string
) {
  return {
    first: `ครั้งละ ${(calculatedEat / 5).toFixed(
      1
    )} ช้อนชา (${calculatedEat.toFixed(1)} ml)`,
    second: `${label} ${meal}`,
  };
}

// Pure function to handle calculations for a single drug
export function calculateDrug(
  drug: Drug,
  weight: number
): CalculatedDrug | null {
  console.log("drug", drug);
  if (drug.type === "calculateByAge") {
    return {
      ...drug,
      secondaryData: drug.secondaryData ? calculateDrug(drug.secondaryData, weight) ?? undefined : undefined,
    };
  }

  let calculatedDrug: CalculatedDrug | null = null;

  if (drug.originalDoseWithRange && drug.divider) {
    const calculatedDoseWithRange = calculateDoseWithRange(
      drug.originalDoseWithRange,
      weight
    );
    const calculatedEatWithRange = calculateEatWithRange(
      calculatedDoseWithRange,
      drug.divider
    );
    const howToTake = formatHowToTake(
      calculatedEatWithRange,
      drug.label ?? "",
      drug.meal ?? ""
    );

    calculatedDrug = {
      ...drug,
      calculatedDoseWithRange,
      calculatedEatWithRange,
      howToTake,
    };
  } else if (drug.dose && drug.divider) {
    const calculatedEat = calculateSingleDose(drug.dose, weight, drug.divider);
    const howToTake = formatSingleDoseHowToTake(
      calculatedEat,
      drug.label ?? "",
      drug.meal ?? ""
    );

    calculatedDrug = {
      ...drug,
      calculatedDose: drug.dose * weight,
      calculatedEat,
      howToTake,
    };
  }

  // Handle secondaryData calculation if it exists
  if (calculatedDrug && drug.secondaryData) {
    const calculatedSecondaryData = calculateDrug(drug.secondaryData, weight);
    calculatedDrug.secondaryData = calculatedSecondaryData ?? undefined;
  }

  return calculatedDrug;
}

// Function to calculate multiple drugs
export function calculateDrugs(
  drugs: Drug[],
  weight: number
): CalculatedDrug[] {
  return drugs
    .map(drug => calculateDrug(drug, weight))
    .filter((drug): drug is CalculatedDrug => drug !== null);
}
