/* eslint-disable @typescript-eslint/no-explicit-any */ 
import { Drug, drugs } from "@/data/drug";
import { describe, expect, it } from "vitest";
import { calculateDrug, calculateDrugs } from "./calculator";

type TestCase = {
  drugDisplayName: string;
  weight: number;
  expectedResult: any;
};

// Helper function to find drug by display name
function findDrugByDisplayName(displayName: string): Drug {
  const drug = drugs.find(d => d.displayName === displayName);
  if (!drug) {
    throw new Error(`Drug with displayName "${displayName}" not found in drugs array`);
  }
  return drug;
}

// Test cases for calculateByAge drugs - these should return the drug as-is
const calculateByAgeTestCases: TestCase[] = [
  {
    drugDisplayName: "Albendazole 200mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Albendazole 200mg/5ml syr",
      description: "> 2 y: 10 mL with meal single dose or BID 3 Days",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    drugDisplayName: "Ambroxal 30mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Ambroxal 30mg/5ml syr",
      description: "2-6 y: 2.5 mL TID, 6-12 y: 5 mL BID-TID, >12 y: 5 mL TID or 10 mL BID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    drugDisplayName: "Bromhexine 4mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Bromhexine 4mg/5ml syr",
      description: "2-6 y: 2.5 mL TID, 6-12 y: 5 mL TID, >12 y: 10 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    drugDisplayName: "Carbocisteine 100mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Carbocisteine 100mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    drugDisplayName: "Carbocisteine 200mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Carbocisteine 200mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    },
  },
  {
    drugDisplayName: "Carbocisteine 250mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Carbocisteine 250mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    },
  },
  {
    drugDisplayName: "Carbocisteine 500mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Carbocisteine 500mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    },
  },
  {
    drugDisplayName: "Cetirizine 5mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Cetirizine 5mg/5ml syr",
      description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
      remark: "คำนวณตามอายุ; 2-6 y max 5 mg/day",
      meal: "หลังอาหาร",
    },
  },
  {
    drugDisplayName: "Desloratadine 0.5mg/ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Desloratadine 0.5mg/ml syr",
      description: "6 - 11 m: 2 mL OD, 1 - 5 y: 2.5 mL OD, 6 - 11 y: 5 mL OD, >12 y: 10 mL OD",
    },
  },
  {
    drugDisplayName: "Loratadine 5mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Loratadine 5mg/5ml syr",
      description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
    },
  },
  {
    drugDisplayName: "Mebendazole 100mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Mebendazole 100mg/5ml syr",
      description: "> 2 y: 5 mL with meal single dose or BID 3 Days",
    },
  },
  {
    drugDisplayName: "Simethicone 40mg/0.6ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Simethicone 40mg/0.6ml syr",
      description: "<2 y: 0.3 mL PRN QID, 2-12 y: 0.6 mL PRN QID, >12 y: 0.6 - 1.8 mL PRN QID",
    },
  },
  {
    drugDisplayName: "Simethicone/Dicyclomine 50/5mg /5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Simethicone/Dicyclomine 50/5mg /5ml syr",
      description: "<4 y: 2.5 mL TID - QID AC, 4-12 y: 5 mL TID - QID AC",
    },
  },
  {
    drugDisplayName: "Brompheniramine/phenylephrine 4/10 mg/5ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Brompheniramine/phenylephrine 4/10 mg/5ml syr",
      description: "2-6 y: 1.25-2.5 mL PRN QID, 6-12 y: 2.5-5 mL PRN QID",
    },
  },
  {
    drugDisplayName: "Lactulose 66.7 g/100 ml syr",
    weight: 10,
    expectedResult: {
      type: "calculateByAge",
      displayName: "Lactulose 66.7 g/100 ml syr",
      description: "<1 y: 5 mL/dose, 1-6 y: 5-10 mL/dose, 7-14 y: 10-15 mL/dose",
    },
  },
];

// Test cases for calculateByWeight drugs with dose ranges
const calculateByWeightRangeTestCases: TestCase[] = [
  {
    drugDisplayName: "Amoxicillin 125mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 66,
        upper: 133,
      },
      calculatedEatWithRange: {
        lower: 2.6,
        upper: 5.3,
      },
      howToTake: {
        first: "ครั้งละ 0.5 - 1.1 ช้อนชา (2.6 - 5.3 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Amoxicillin 250mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 66,
        upper: 133,
      },
      calculatedEatWithRange: {
        lower: 1.3,
        upper: 2.7,
      },
      howToTake: {
        first: "ครั้งละ 0.3 - 0.5 ช้อนชา (1.3 - 2.7 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Amox/clav 228.5 mg/5ml syr BID",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 83,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 1.8,
        upper: 3.3,
      },
      howToTake: {
        first: "ครั้งละ 0.4 - 0.7 ช้อนชา (1.8 - 3.3 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Amox/clav 457 mg/5ml syr BID",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 83,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 0.9,
        upper: 1.6,
      },
      howToTake: {
        first: "ครั้งละ 0.2 - 0.3 ช้อนชา (0.9 - 1.6 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Cephalexin 125mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 83,
        upper: 166,
      },
      calculatedEatWithRange: {
        lower: 3.3,
        upper: 6.6,
      },
      howToTake: {
        first: "ครั้งละ 0.7 - 1.3 ช้อนชา (3.3 - 6.6 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Cephalexin 250mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 83,
        upper: 166,
      },
      calculatedEatWithRange: {
        lower: 1.7,
        upper: 3.3,
      },
      howToTake: {
        first: "ครั้งละ 0.3 - 0.7 ช้อนชา (1.7 - 3.3 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Cloxacillin 125mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 125,
        upper: 250,
      },
      calculatedEatWithRange: {
        lower: 5.0,
        upper: 10.0,
      },
      howToTake: {
        first: "ครั้งละ 1.0 - 2.0 ช้อนชา (5.0 - 10.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน ก่อนอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Dicloxacillin 62.5mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 62.5,
        upper: 125,
      },
      calculatedEatWithRange: {
        lower: 5.0,
        upper: 10.0,
      },
      howToTake: {
        first: "ครั้งละ 1.0 - 2.0 ช้อนชา (5.0 - 10.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน ก่อนอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Domperidone 1mg/ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 2.0,
        upper: 4.0,
      },
      calculatedEatWithRange: {
        lower: 2.0,
        upper: 4.0,
      },
      howToTake: {
        first: "ครั้งละ 0.4 - 0.8 ช้อนชา (2.0 - 4.0 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น ก่อนอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Guaifenesin 100mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 25.0,
        upper: 50.0,
      },
      calculatedEatWithRange: {
        lower: 1.3,
        upper: 2.5,
      },
      howToTake: {
        first: "ครั้งละ 0.3 - 0.5 ช้อนชา (1.3 - 2.5 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Ibuprofen 100mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 70.0,
        upper: 100.0,
      },
      calculatedEatWithRange: {
        lower: 3.5,
        upper: 5.0,
      },
      howToTake: {
        first: "ครั้งละ 0.7 - 1.0 ช้อนชา (3.5 - 5.0 ml)",
        second: "เวลาปวดหรือมีไข้ทุก 6-8 ช.ม. หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Paracetamol 100mg/ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 100,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 1.0,
        upper: 1.5,
      },
      howToTake: {
        first: "ครั้งละ 0.2 - 0.3 ช้อนชา (1.0 - 1.5 ml)",
        second: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
      },
    },
  },
  {
    drugDisplayName: "Paracetamol 120mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 100,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 4.2,
        upper: 6.3,
      },
      howToTake: {
        first: "ครั้งละ 0.8 - 1.3 ช้อนชา (4.2 - 6.3 ml)",
        second: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
      },
    },
  },
  {
    drugDisplayName: "Paracetamol 160mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 100,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 3.1,
        upper: 4.7,
      },
      howToTake: {
        first: "ครั้งละ 0.6 - 0.9 ช้อนชา (3.1 - 4.7 ml)",
        second: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
      },
    },
  },
  {
    drugDisplayName: "Paracetamol 250mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 100,
        upper: 150,
      },
      calculatedEatWithRange: {
        lower: 2.0,
        upper: 3.0,
      },
      howToTake: {
        first: "ครั้งละ 0.4 - 0.6 ช้อนชา (2.0 - 3.0 ml)",
        second: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.", 
      },
    },
  },
  {
    drugDisplayName: "Terbutaline 1.5mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 0.7,
        upper: 1.0,
      },
      calculatedEatWithRange: {
        lower: 2.3,
        upper: 3.3,
      },
      howToTake: {
        first: "ครั้งละ 0.5 - 0.7 ช้อนชา (2.3 - 3.3 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Trimethoprim/sulfa (bactrim) 40/200 mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 30.0,
        upper: 60.0,
      },
      calculatedEatWithRange: {
        lower: 3.8,
        upper: 7.5,
      },  
      howToTake: {
        first: "ครั้งละ 0.8 - 1.5 ช้อนชา (3.8 - 7.5 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Dextromethorphan 15 mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 2.5,
        upper: 5.0,
      },
      calculatedEatWithRange: {
        lower: 0.8,
        upper: 1.7,
      },
      howToTake: {
        first: "ครั้งละ 0.2 - 0.3 ช้อนชา (0.8 - 1.7 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    }
  },
  {
    drugDisplayName: "Erythromycin 125 mg/5 ml susp",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 75.0,
        upper: 125.0,
      },
      calculatedEatWithRange: {
        lower: 3.0,
        upper: 5.0,
      },
      howToTake: {
        first: "ครั้งละ 0.6 - 1.0 ช้อนชา (3.0 - 5.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน ก่อนอาหาร",
      },
    }
  },
  {
    drugDisplayName: "Penicillin V 125 mg/5 ml susp",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 62.5,
        upper: 125.0,
      },
      calculatedEatWithRange: {
        lower: 2.5,
        upper: 5.0,
      },
      howToTake: {
        first: "ครั้งละ 0.5 - 1.0 ช้อนชา (2.5 - 5.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน ก่อนอาหาร",
      },
    }
  },
];

// Test cases for calculateByWeight drugs with single dose
const calculateByWeightSingleDoseTestCases: TestCase[] = [
  {
    drugDisplayName: "Amoxicillin 250mg/5ml syr BID",
    weight: 10,
    expectedResult: {
      calculatedDose: 225,
      calculatedEat: 4.5,
      howToTake: {
        first: "ครั้งละ 0.9 ช้อนชา (4.5 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Amoxicillin 250mg/5ml syr (high dose)",
    weight: 10,
    expectedResult: {
      calculatedDose: 450,
      calculatedEat: 9.0,
      howToTake: {
        first: "ครั้งละ 1.8 ช้อนชา (9.0 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Amox/clav 600 mg/5ml syr BID 10 day for AOM",
    weight: 10,
    expectedResult: {
      calculatedDose: 450,
      calculatedEat: 3.8,
      howToTake: {
        first: "ครั้งละ 0.8 ช้อนชา (3.8 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Antacid susp (Alu/Mag/Simet)",
    weight: 10,
    expectedResult: {
      calculatedDose: 40,
      calculatedEat: 10.0,
      howToTake: {
        first: "ครั้งละ 2.0 ช้อนชา (10.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Azithromycin 200mg/5ml syr for GAS infection",
    weight: 10,
    expectedResult: {
      calculatedDose: 120,
      calculatedEat: 3.0,
      howToTake: {
        first: "ครั้งละ 0.6 ช้อนชา (3.0 ml)",
        second: "วันละ 1 ครั้ง เช้า หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Hyoscine-N-ButylBr 5mg/5ml syr (Buscopan)",
    weight: 10,
    expectedResult: {
      calculatedDose: 5.0,
      calculatedEat: 5.0,
      howToTake: {
        first: "ครั้งละ 1.0 ช้อนชา (5.0 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Brompheniramine/GG 2/100 mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 1.7,
      calculatedEat: 4.3,
      howToTake: {
        first: "ครั้งละ 0.9 ช้อนชา (4.3 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Cefdinir 125mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 70,
      calculatedEat: 2.8,
      howToTake: {
        first: "ครั้งละ 0.6 ช้อนชา (2.8 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Cefixime 100mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 80,
      calculatedEat: 4.0,
      howToTake: {
        first: "ครั้งละ 0.8 ช้อนชา (4.0 ml)",
        second: "วันละ 1 ครั้ง เช้า หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "CPM 2mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 1.2,
      calculatedEat: 3.0,
      howToTake: {
        first: "ครั้งละ 0.6 ช้อนชา (3.0 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Hydroxyzine (Atarax) 10mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 6.0,
      calculatedEat: 3.0,
      howToTake: {
        first: "ครั้งละ 0.6 ช้อนชา (3.0 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Pseudoephedrine 30mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 10.0,
      calculatedEat: 1.7,
      howToTake: {
        first: "ครั้งละ 0.3 ช้อนชา (1.7 ml)",
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Salbutamol 2mg/5ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 1.0,
      calculatedEat: 2.5,
      howToTake: {
        first: "ครั้งละ 0.5 ช้อนชา (2.5 ml)",
        second: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน หลังอาหาร",
      },
    },
  },
  {
    drugDisplayName: "Procaterol 25 mcg/5 ml syr",
    weight: 10,
    expectedResult: {
      calculatedDose: 12.5,
      calculatedEat: 2.5,
      howToTake: {
        first: "ครั้งละ 0.5 ช้อนชา (2.5 ml)",
        second: "วันละ 2 ครั้ง เช้า เย็น หลังอาหาร",
      },
    },
  },
];

// Test cases for drugs with secondary data
const calculateByWeightWithSecondaryDataTestCases: TestCase[] = [
  {
    drugDisplayName: "Favipiravir 100 mg/ml extemp. for susp",
    weight: 10,
    expectedResult: {
      calculatedDoseWithRange: {
        lower: 350,
        upper: 350,
      },
      calculatedEatWithRange: {
        lower: 3.5,
        upper: 3.5,
      },
      howToTake: {
        first: "ครั้งละ 0.7 ช้อนชา (3.5 ml)",
        second: "วันละ 2 ครั้ง ทุก 12 ช.ม. หลังอาหาร",
      },
      secondaryData: {
        calculatedDoseWithRange: {
          lower: 150,
          upper: 150,
        },
        calculatedEatWithRange: {
          lower: 1.5,
          upper: 1.5,
        },
        howToTake: {
          first: "ครั้งละ 0.3 ช้อนชา (1.5 ml)",
          second: "วันละ 2 ครั้ง ทุก 12 ช.ม. หลังอาหาร",
        },
      },
    },
  },
];

describe("calculateDrug", () => {
  it("should return null for unsupported drug", () => {
    const weight = 10;
    const drug = {
      type: "calculateByWeight",
      displayName: "Unsupported Drug",
      description: "This is an unsupported drug",
      remark: "This is an unsupported drug",
    } as Drug;

    const result = calculateDrug(drug, weight);
    expect(result).toBeNull();
  });

  calculateByAgeTestCases.forEach((testCase, index) => {
    it(`should return the drug as-is for calculateByAge type for case ${index + 1}: ${testCase.drugDisplayName}`, () => {
      const drug = findDrugByDisplayName(testCase.drugDisplayName);
      const result = calculateDrug(drug, testCase.weight);
      expect(result).toMatchObject(testCase.expectedResult);
    });
  });

  calculateByWeightRangeTestCases.forEach((testCase, index) => {
    it(`should calculate dose range correctly for case ${index + 1}: ${testCase.drugDisplayName}`, () => {
      const drug = findDrugByDisplayName(testCase.drugDisplayName);
      const result = calculateDrug(drug, testCase.weight);
      expect(result).toMatchObject(testCase.expectedResult);
    });
  });

  calculateByWeightSingleDoseTestCases.forEach((testCase, index) => {
    it(`should calculate single dose correctly for case ${index + 1}: ${testCase.drugDisplayName}`, () => {
      const drug = findDrugByDisplayName(testCase.drugDisplayName);
      const result = calculateDrug(drug, testCase.weight);
      expect(result).toMatchObject(testCase.expectedResult);
    });
  });

  calculateByWeightWithSecondaryDataTestCases.forEach((testCase, index) => {
    it(`should calculate dose range with secondary data correctly for case ${index + 1}: ${testCase.drugDisplayName}`, () => {
      const drug = findDrugByDisplayName(testCase.drugDisplayName);
      const result = calculateDrug(drug, testCase.weight);
      expect(result).toMatchObject(testCase.expectedResult);
      
      // Check secondary data calculation
      expect(result?.secondaryData).toBeDefined();
      if (testCase.expectedResult.secondaryData && result?.secondaryData) {
        expect(result.secondaryData).toMatchObject(testCase.expectedResult.secondaryData);
      }
    });
  });

  it("should handle nested secondary data", () => {
    const weight = 15;
    const drugWithNestedSecondary: Drug = {
      type: "calculateByAge",
      displayName: "Parent Drug",
      description: "Parent description",
      meal: "หลังอาหาร",
      secondaryData: {
        type: "calculateByWeight",
        displayName: "Child Drug",
        description: "10 mg/kg/dose",
        doseUnit: "mg/kg/dose",
        dose: 10,
        divider: 20,
        meal: "หลังอาหาร",
        label: "วันละ 2 ครั้ง",
        secondaryData: {
          type: "calculateByAge",
          displayName: "Grandchild Drug",
          description: "Grandchild description",
          meal: "ก่อนอาหาร",
        },
      },
    };

    const result = calculateDrug(drugWithNestedSecondary, weight);
    expect(result).toBeDefined();
    expect(result?.secondaryData).toBeDefined();
    expect(result?.secondaryData?.secondaryData).toBeDefined();
    expect(result?.secondaryData?.calculatedDose).toBe(10 * weight);
    expect(result?.secondaryData?.calculatedEat).toBe((10 * weight) / 20);
  });
});

describe("calculateDrugs", () => {
  it("should return empty array for empty input", () => {
    const result = calculateDrugs([], 10);
    expect(result).toEqual([]);
  });

  it("should filter out null results from unsupported drugs", () => {
    const weight = 10;
    const unsupportedDrug = {
      type: "calculateByWeight",
      displayName: "Unsupported Drug",
      description: "This is an unsupported drug",
      remark: "This is an unsupported drug",
    } as Drug;
    const supportedDrug = findDrugByDisplayName("Albendazole 200mg/5ml syr");
    const drugs = [unsupportedDrug, supportedDrug];

    const result = calculateDrugs(drugs, weight);
    expect(result).toHaveLength(1);
    expect(result[0].displayName).toBe("Albendazole 200mg/5ml syr");
  });

  it("should calculate multiple drugs correctly", () => {
    const weight = 10;
    const testDrugs = [
      findDrugByDisplayName("Albendazole 200mg/5ml syr"),
      findDrugByDisplayName("Amoxicillin 125mg/5ml syr"),
      findDrugByDisplayName("Amoxicillin 250mg/5ml syr BID"),
    ];

    const result = calculateDrugs(testDrugs, weight);
    expect(result).toHaveLength(3);

    // First drug (calculateByAge) should be returned as-is
    expect(result[0].displayName).toBe("Albendazole 200mg/5ml syr");
    expect(result[0].type).toBe("calculateByAge");

    // Second drug (calculateByWeight with range) should have calculated values
    expect(result[1].displayName).toBe("Amoxicillin 125mg/5ml syr");
    expect(result[1]).toHaveProperty('calculatedDoseWithRange');
    expect(result[1]).toHaveProperty('calculatedEatWithRange');
    expect(result[1]).toHaveProperty('howToTake');

    // Third drug (calculateByWeight single dose) should have calculated values
    expect(result[2].displayName).toBe("Amoxicillin 250mg/5ml syr BID");
    expect(result[2]).toHaveProperty('calculatedDose');
    expect(result[2]).toHaveProperty('calculatedEat');
    expect(result[2]).toHaveProperty('howToTake');
  });

  it("should handle mixed drug types correctly", () => {
    const weight = 15;
    const testDrugs = [
      findDrugByDisplayName("Ambroxal 30mg/5ml syr"), // calculateByAge
      findDrugByDisplayName("Amoxicillin 250mg/5ml syr"), // calculateByWeight with range
      findDrugByDisplayName("Azithromycin 200mg/5ml syr for GAS infection"), // calculateByWeight single dose
    ];

    const result = calculateDrugs(testDrugs, weight);
    expect(result).toHaveLength(3);

    expect(result[0].type).toBe("calculateByAge");
    expect(result[1]).toHaveProperty('calculatedDoseWithRange');
    expect(result[2]).toHaveProperty('calculatedDose');
  });

  it("should preserve all drug properties when calculating", () => {
    const weight = 12;
    const drug = findDrugByDisplayName("Amox/clav 228.5 mg/5ml syr BID");
    const drugs = [drug];

    const result = calculateDrugs(drugs, weight);
    expect(result).toHaveLength(1);

    const calculatedDrug = result[0];
    
    expect(calculatedDrug.displayName).toBe(drug.displayName);
    expect(calculatedDrug.description).toBe(drug.description);
    expect(calculatedDrug.meal).toBe(drug.meal);
    expect(calculatedDrug.label).toBe(drug.label);
    expect(calculatedDrug.type).toBe(drug.type);
    
    expect(calculatedDrug).toHaveProperty('calculatedDoseWithRange');
    expect(calculatedDrug).toHaveProperty('calculatedEatWithRange');
    expect(calculatedDrug).toHaveProperty('howToTake');
  });

  it("should handle mixed drugs with and without secondary data", () => {
    const weight = 8;
    const testDrugs = [
      findDrugByDisplayName("Albendazole 200mg/5ml syr"), // No secondary data
      findDrugByDisplayName("Favipiravir 100 mg/ml extemp. for susp"), // With secondary data
      findDrugByDisplayName("Amoxicillin 250mg/5ml syr BID"), // No secondary data
    ];

    const result = calculateDrugs(testDrugs, weight);
    expect(result).toHaveLength(3);

    // First drug should not have secondary data
    expect(result[0].displayName).toBe("Albendazole 200mg/5ml syr");
    expect(result[0].secondaryData).toBeUndefined();

    // Second drug should have calculated secondary data
    expect(result[1].displayName).toBe("Favipiravir 100 mg/ml extemp. for susp");
    expect(result[1]).toHaveProperty('calculatedDoseWithRange');
    expect(result[1].secondaryData).toBeDefined();
    expect(result[1].secondaryData).toHaveProperty('calculatedDoseWithRange');

    // Third drug should not have secondary data
    expect(result[2].displayName).toBe("Amoxicillin 250mg/5ml syr BID");
    expect(result[2]).toHaveProperty('calculatedDose');
    expect(result[2].secondaryData).toBeUndefined();
  });
});
