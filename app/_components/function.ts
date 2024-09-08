import { Drug } from "@/data/drug";

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
};

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
  return {
    first: `ครั้งละ ${(calculatedEatWithRange.lower / 5).toFixed(1)} - ${(
      calculatedEatWithRange.upper / 5
    ).toFixed(1)} ช้อนชา (${calculatedEatWithRange.lower.toFixed(
      1
    )} - ${calculatedEatWithRange.upper.toFixed(1)} ml)`,
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

// Pure function to handle calculations
export function calculateDrug(
  drug: Drug,
  weight: number
): CalculatedDrug | null {
  if (drug.type === "calculateByAge") {
    return drug;
  }

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

    return {
      ...drug,
      calculatedDoseWithRange,
      calculatedEatWithRange,
      howToTake,
    };
  }

  if (drug.dose && drug.divider) {
    const calculatedEat = calculateSingleDose(drug.dose, weight, drug.divider);
    const howToTake = formatSingleDoseHowToTake(
      calculatedEat,
      drug.label ?? "",
      drug.meal ?? ""
    );

    return {
      ...drug,
      calculatedDose: drug.dose * weight,
      calculatedEat,
      howToTake,
    };
  }

  return null;
}
