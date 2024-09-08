import { Drug } from "@/data/drug";
import { describe, expect, it } from "vitest";
import { calculateDrug } from "./function";

type CalculateByAgeTestCase = {
  weight: number;
  drug: Drug;
};

type CalculateByWeightTestCase = {
  weight: number;
  drug: Drug;
  result: {
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
};

type CalculateSingleDoseTestCase = {
  weight: number;
  drug: Drug;
  result: {
    calculatedDose: number;
    calculatedEat: number;
    howToTake: {
      first: string;
      second?: string;
    };
  };
};

const calculateByAgeTestCases: CalculateByAgeTestCase[] = [
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Albendazole 200mg/5ml syr",
      description: "> 2 y: 10 mL with meal single dose or BID 3 Days",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Ambroxal 30mg/5ml syr",
      description:
        "2-6 y: 2.5 mL TID, 6-12 y: 5 mL BID-TID, >12 y: 5 mL TID or 10 mL BID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Bromhexine 4mg/5ml syr",
      description: "2-6 y: 2.5 mL TID, 6-12 y: 5 mL TID, >12 y: 10 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Bromhexine 4mg/5ml syr",
      description: "2-6 y: 2.5 mL TID, 6-12 y: 5 mL TID, >12 y: 10 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Carbocisteine 100mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Carbocisteine 200mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Carbocisteine 250mg/5ml syr",
      description: "1-5 y: 5  mL OD - BID, >5 y: 5 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Carbocisteine 500mg/5ml syr",
      description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Cetirizine 5mg/5ml syr",
      description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
      remark: "คำนวณตามอายุ; 2-6 y max 5 mg/day",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Desloratadine 0.5mg/ml syr",
      description:
        "6 - 11 m: 2 mL OD, 1 - 5 y: 2.5 mL OD, 6 - 11 y: 5 mL OD, >12 y: 10 mL OD",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Loratadine 5mg/5ml syr",
      description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Mebendazole 100mg/5ml syr",
      description: "> 2 y: 5 mL with meal single dose or BID 3 Days",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Simethicone 40mg/0.6ml syr",
      description:
        "<2 y: 0.3 mL PRN QID, 2-12 y: 0.6 mL PRN QID, >12 y: 0.6 - 1.8 mL PRN QID",
      remark: "คำนวณตามอายุ; < 2 y max 240 mg/day",
      meal: "หลังอาหาร",
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByAge",
      displayName: "Simethicone/Dicyclomine 50/5mg /5ml syr",
      description: "<4 y: 2.5 mL TID - QID AC, 4-12 y: 5 mL TID - QID AC",
      remark: "คำนวณตามอายุ",
      meal: "หลังอาหาร",
    },
  },
];

const calculateByWeightTestCases: CalculateByWeightTestCase[] = [
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amoxicillin 125mg/5ml syr",
      description: "6.6 - 13.3 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 25,
      originalDoseWithRange: {
        lower: 6.6,
        upper: 13.3,
      },
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 6.6 * 10,
        upper: 13.3 * 10,
      },
      calculatedEatWithRange: {
        lower: (6.6 * 10) / 25,
        upper: (13.3 * 10) / 25,
      },
      howToTake: {
        first: `ครั้งละ ${((6.6 * 10) / 25 / 5).toFixed(1)} - ${(
          (13.3 * 10) /
          25 /
          5
        ).toFixed(1)} ช้อนชา (${((6.6 * 10) / 25).toFixed(1)} - ${(
          (13.3 * 10) /
          25
        ).toFixed(1)} ml)`,
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amoxicillin 250mg/5ml syr",
      description: "6.6 - 13.3 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 50,
      originalDoseWithRange: {
        lower: 6.6,
        upper: 13.3,
      },
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 6.6 * 10,
        upper: 13.3 * 10,
      },
      calculatedEatWithRange: {
        lower: (6.6 * 10) / 50,
        upper: (13.3 * 10) / 50,
      },
      howToTake: {
        first: `ครั้งละ ${((6.6 * 10) / 50 / 5).toFixed(1)} - ${(
          (13.3 * 10) /
          50 /
          5
        ).toFixed(1)} ช้อนชา (${((6.6 * 10) / 50).toFixed(1)} - ${(
          (13.3 * 10) /
          50
        ).toFixed(1)} ml)`,
        second: "วันละ 3 ครั้ง เช้า เที่ยง เย็น หลังอาหาร",
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amox/clav 228.5 mg/5ml syr BID",
      description: "8.3 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 45.7,
      originalDoseWithRange: {
        lower: 8.3,
        upper: 15,
      },
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 8.3 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (8.3 * 10) / 45.7,
        upper: (15 * 10) / 45.7,
      },
      howToTake: {
        first: `ครั้งละ ${((8.3 * 10) / 45.7 / 5).toFixed(1)} - ${(
          (15 * 10) /
          45.7 /
          5
        ).toFixed(1)} ช้อนชา (${((8.3 * 10) / 45.7).toFixed(1)} - ${(
          (15 * 10) /
          45.7
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amox/clav 457 mg/5ml syr BID",
      description: "8.3 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 91.4,
      originalDoseWithRange: {
        lower: 8.3,
        upper: 15,
      },
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 8.3 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (8.3 * 10) / 91.4,
        upper: (15 * 10) / 91.4,
      },
      howToTake: {
        first: `ครั้งละ ${((8.3 * 10) / 91.4 / 5).toFixed(1)} - ${(
          (15 * 10) /
          91.4 /
          5
        ).toFixed(1)} ช้อนชา (${((8.3 * 10) / 91.4).toFixed(1)} - ${(
          (15 * 10) /
          91.4
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Cephalexin 125mg/5ml syr",
      description: "8.3 - 16.6 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
      divider: 25,
      originalDoseWithRange: {
        lower: 8.3,
        upper: 16.6,
      },
    },
    result: {
      calculatedDoseWithRange: {
        lower: 8.3 * 10,
        upper: 16.6 * 10,
      },
      calculatedEatWithRange: {
        lower: (8.3 * 10) / 25,
        upper: (16.6 * 10) / 25,
      },
      howToTake: {
        first: `ครั้งละ ${((8.3 * 10) / 25 / 5).toFixed(1)} - ${(
          (16.6 * 10) /
          25 /
          5
        ).toFixed(1)} ช้อนชา (${((8.3 * 10) / 25).toFixed(1)} - ${(
          (16.6 * 10) /
          25
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Cephalexin 250mg/5ml syr",
      description: "8.3 - 16.6 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 50,
      originalDoseWithRange: {
        lower: 8.3,
        upper: 16.6,
      },
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 8.3 * 10,
        upper: 16.6 * 10,
      },
      calculatedEatWithRange: {
        lower: (8.3 * 10) / 50,
        upper: (16.6 * 10) / 50,
      },
      howToTake: {
        first: `ครั้งละ ${((8.3 * 10) / 50 / 5).toFixed(1)} - ${(
          (16.6 * 10) /
          50 /
          5
        ).toFixed(1)} ช้อนชา (${((8.3 * 10) / 50).toFixed(1)} - ${(
          (16.6 * 10) /
          50
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Cloxacillin 125mg/5ml syr",
      description: "12.5 - 25 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 25,
      originalDoseWithRange: {
        lower: 12.5,
        upper: 25,
      },
      remark: "max 2 - 3 g/day",
      meal: "ก่อนอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 12.5 * 10,
        upper: 25 * 10,
      },
      calculatedEatWithRange: {
        lower: (12.5 * 10) / 25,
        upper: (25 * 10) / 25,
      },
      howToTake: {
        first: `ครั้งละ ${((12.5 * 10) / 25 / 5).toFixed(1)} - ${(
          (25 * 10) /
          25 /
          5
        ).toFixed(1)} ช้อนชา (${((12.5 * 10) / 25).toFixed(1)} - ${(
          (25 * 10) /
          25
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Dicloxacillin 62.5mg/5ml syr",
      description: "6.25 - 12.5 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 12.5,
      originalDoseWithRange: {
        lower: 6.25,
        upper: 12.5,
      },
      remark: "max 100 mg/kg/day",
      meal: "ก่อนอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 6.25 * 10,
        upper: 12.5 * 10,
      },
      calculatedEatWithRange: {
        lower: (6.25 * 10) / 12.5,
        upper: (12.5 * 10) / 12.5,
      },
      howToTake: {
        first: `ครั้งละ ${((6.25 * 10) / 12.5 / 5).toFixed(1)} - ${(
          (12.5 * 10) /
          12.5 /
          5
        ).toFixed(1)} ช้อนชา (${((6.25 * 10) / 12.5).toFixed(1)} - ${(
          (12.5 * 10) /
          12.5
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Domperidone 1mg/ml syr",
      description: "0.2 - 0.4 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 1,
      originalDoseWithRange: {
        lower: 0.2,
        upper: 0.4,
      },
      meal: "ก่อนอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 0.2 * 10,
        upper: 0.4 * 10,
      },
      calculatedEatWithRange: {
        lower: (0.2 * 10) / 1,
        upper: (0.4 * 10) / 1,
      },
      howToTake: {
        first: `ครั้งละ ${((0.2 * 10) / 1 / 5).toFixed(1)} - ${(
          (0.4 * 10) /
          1 /
          5
        ).toFixed(1)} ช้อนชา (${((0.2 * 10) / 1).toFixed(1)} - ${(
          (0.4 * 10) /
          1
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Guaifenesin 100mg/5ml syr ",
      description: "2.5 - 5 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 20,
      originalDoseWithRange: {
        lower: 2.5,
        upper: 5,
      },
      meal: "หลังอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 2.5 * 10,
        upper: 5 * 10,
      },
      calculatedEatWithRange: {
        lower: (2.5 * 10) / 20,
        upper: (5 * 10) / 20,
      },
      howToTake: {
        first: `ครั้งละ ${((2.5 * 10) / 20 / 5).toFixed(1)} - ${(
          (5 * 10) /
          20 /
          5
        ).toFixed(1)} ช้อนชา (${((2.5 * 10) / 20).toFixed(1)} - ${(
          (5 * 10) /
          20
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Ibuprofen 100mg/5ml syr",
      description: "7 - 10 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 20,
      originalDoseWithRange: {
        lower: 7,
        upper: 10,
      },
      meal: "หลังอาหาร",
      label: "เวลาปวดหรือมีไข้ทุก 6-8 ช.ม.",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 7 * 10,
        upper: 10 * 10,
      },
      calculatedEatWithRange: {
        lower: (7 * 10) / 20,
        upper: (10 * 10) / 20,
      },
      howToTake: {
        first: `ครั้งละ ${((7 * 10) / 20 / 5).toFixed(1)} - ${(
          (10 * 10) /
          20 /
          5
        ).toFixed(1)} ช้อนชา (${((7 * 10) / 20).toFixed(1)} - ${(
          (10 * 10) /
          20
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Paracetamol 100mg/ml syr",
      description: "10 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 100,
      originalDoseWithRange: {
        lower: 10,
        upper: 15,
      },
      remark: "max 4 g/day",
      label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 10 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (10 * 10) / 100,
        upper: (15 * 10) / 100,
      },
      howToTake: {
        first: `ครั้งละ ${((10 * 10) / 100 / 5).toFixed(1)} - ${(
          (15 * 10) /
          100 /
          5
        ).toFixed(1)} ช้อนชา (${((10 * 10) / 100).toFixed(1)} - ${(
          (15 * 10) /
          100
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Paracetamol 120mg/5ml syr",
      description: "10 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 24,
      originalDoseWithRange: {
        lower: 10,
        upper: 15,
      },
      remark: "max 4 g/day",
      label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 10 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (10 * 10) / 24,
        upper: (15 * 10) / 24,
      },
      howToTake: {
        first: `ครั้งละ ${((10 * 10) / 24 / 5).toFixed(1)} - ${(
          (15 * 10) /
          24 /
          5
        ).toFixed(1)} ช้อนชา (${((10 * 10) / 24).toFixed(1)} - ${(
          (15 * 10) /
          24
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Paracetamol 160mg/5ml syr",
      description: "10 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 32,
      originalDoseWithRange: {
        lower: 10,
        upper: 15,
      },
      remark: "max 4 g/day",
      label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 10 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (10 * 10) / 32,
        upper: (15 * 10) / 32,
      },
      howToTake: {
        first: `ครั้งละ ${((10 * 10) / 32 / 5).toFixed(1)} - ${(
          (15 * 10) /
          32 /
          5
        ).toFixed(1)} ช้อนชา (${((10 * 10) / 32).toFixed(1)} - ${(
          (15 * 10) /
          32
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Paracetamol 250mg/5ml syr",
      description: "10 - 15 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 50,
      originalDoseWithRange: {
        lower: 10,
        upper: 15,
      },
      remark: "max 4 g/day",
      label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 10 * 10,
        upper: 15 * 10,
      },
      calculatedEatWithRange: {
        lower: (10 * 10) / 50,
        upper: (15 * 10) / 50,
      },
      howToTake: {
        first: `ครั้งละ ${((10 * 10) / 50 / 5).toFixed(1)} - ${(
          (15 * 10) /
          50 /
          5
        ).toFixed(1)} ช้อนชา (${((10 * 10) / 50).toFixed(1)} - ${(
          (15 * 10) /
          50
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Terbutaline 1.5mg/5ml syr",
      description: "0.07 - 0.1 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 0.3,
      originalDoseWithRange: {
        lower: 0.07,
        upper: 0.1,
      },
      remark: "max 2.5 mg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 0.07 * 10,
        upper: 0.1 * 10,
      },
      calculatedEatWithRange: {
        lower: (0.07 * 10) / 0.3,
        upper: (0.1 * 10) / 0.3,
      },
      howToTake: {
        first: `ครั้งละ ${((0.07 * 10) / 0.3 / 5).toFixed(1)} - ${(
          (0.1 * 10) /
          0.3 /
          5
        ).toFixed(1)} ช้อนชา (${((0.07 * 10) / 0.3).toFixed(1)} - ${(
          (0.1 * 10) /
          0.3
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Trimethoprim/sulfa (bactrim) 40/200 mg/5ml syr",
      description: "3 - 6 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      divider: 8,
      originalDoseWithRange: {
        lower: 3,
        upper: 6,
      },
      remark: "max 320 mg Trimethoprim/day",
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
    },
    result: {
      calculatedDoseWithRange: {
        lower: 3 * 10,
        upper: 6 * 10,
      },
      calculatedEatWithRange: {
        lower: (3 * 10) / 8,
        upper: (6 * 10) / 8,
      },
      howToTake: {
        first: `ครั้งละ ${((3 * 10) / 8 / 5).toFixed(1)} - ${(
          (6 * 10) /
          8 /
          5
        ).toFixed(1)} ช้อนชา (${((3 * 10) / 8).toFixed(1)} - ${(
          (6 * 10) /
          8
        ).toFixed(1)} ml)`,
      },
    },
  },
];
// calculatedDose: dose * weight;
// calculatedEat: dose * weight / divider;
// howToTake: {
//   first: `ครั้งละ ${((dose * weight / divider / 5).toFixed(1))} - ${(
//     (dose * weight / divider / 5).toFixed(1)
//   )} ช้อนชา (${(dose * weight / divider).toFixed(1)} - ${(
//     dose * weight / divider
//   ).toFixed(1)} ml)`;
//   second?: `${label} ${meal}`;
// };
const calculateSingleDoseTestCases: CalculateSingleDoseTestCase[] = [
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amoxicillin 250mg/5ml syr BID",
      description: "22.5 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
      dose: 22.5,
      divider: 50,
    },
    result: {
      calculatedDose: 22.5 * 10,
      calculatedEat: (22.5 * 10) / 50,
      howToTake: {
        first: `ครั้งละ ${((22.5 * 10) / 50 / 5).toFixed(1)} ช้อนชา (${(
          (22.5 * 10) /
          50
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amoxicillin 250mg/5ml syr (high dose)",
      description: "45 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 2-3 g/day",
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
      dose: 45,
      divider: 50,
    },
    result: {
      calculatedDose: 45 * 10,
      calculatedEat: (45 * 10) / 50,
      howToTake: {
        first: `ครั้งละ ${((45 * 10) / 50 / 5).toFixed(1)} ช้อนชา (${(
          (45 * 10) /
          50
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Amox/clav 600 mg/5ml syr BID 10 day for AOM",
      description: "45 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
      dose: 45,
      divider: 120,
    },
    result: {
      calculatedDose: 45 * 10,
      calculatedEat: (45 * 10) / 120,
      howToTake: {
        first: `ครั้งละ ${((45 * 10) / 120 / 5).toFixed(1)} ช้อนชา (${(
          (45 * 10) /
          120
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Antacid susp (Alu/Mag/Simet)",
      description: "4 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 30 mL/dose",
      meal: "หลังอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
      dose: 4,
      divider: 4,
    },
    result: {
      calculatedDose: 4 * 10,
      calculatedEat: (4 * 10) / 4,
      howToTake: {
        first: `ครั้งละ ${((4 * 10) / 4 / 5).toFixed(1)} ช้อนชา (${(
          (4 * 10) /
          4
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Azithromycin 200mg/5ml syr for GAS infection",
      description: "12 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 1 ครั้ง เช้า",
      dose: 12,
      divider: 40,
    },
    result: {
      calculatedDose: 12 * 10,
      calculatedEat: (12 * 10) / 40,
      howToTake: {
        first: `ครั้งละ ${((12 * 10) / 40 / 5).toFixed(1)} ช้อนชา (${(
          (12 * 10) /
          40
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Hyoscine-N-ButylBr 5mg/5ml syr (Buscopan)",
      description: "0.5 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 40 mg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
      dose: 0.5,
      divider: 1,
    },
    result: {
      calculatedDose: 0.5 * 10,
      calculatedEat: (0.5 * 10) / 1,
      howToTake: {
        first: `ครั้งละ ${((0.5 * 10) / 1 / 5).toFixed(1)} ช้อนชา (${(
          (0.5 * 10) /
          1
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Brompheniramine/GG 2/100 mg/5ml syr",
      description: "0.17 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: " <6 y: max 8 mg/day | >6 y: max 16 mg/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
      dose: 0.17,
      divider: 0.4,
    },
    result: {
      calculatedDose: 0.17 * 10,
      calculatedEat: (0.17 * 10) / 0.4,
      howToTake: {
        first: `ครั้งละ ${((0.17 * 10) / 0.4 / 5).toFixed(1)} ช้อนชา (${(
          (0.17 * 10) /
          0.4
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Cefdinir 125mg/5ml sy",
      description: "7 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 600 mg/day",
      meal: "หลังอาหาร",
      label: "วันละ 2 ครั้ง เช้า เย็น",
      dose: 7,
      divider: 25,
    },
    result: {
      calculatedDose: 7 * 10,
      calculatedEat: (7 * 10) / 25,
      howToTake: {
        first: `ครั้งละ ${((7 * 10) / 25 / 5).toFixed(1)} ช้อนชา (${(
          (7 * 10) /
          25
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Cefixime 100mg/5ml syr",
      description: "8 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 400 mg/day",
      meal: "หลังอาหาร",
      label: "วันละ 1 ครั้ง เช้า",
      dose: 8,
      divider: 20,
    },
    result: {
      calculatedDose: 8 * 10,
      calculatedEat: (8 * 10) / 20,
      howToTake: {
        first: `ครั้งละ ${((8 * 10) / 20 / 5).toFixed(1)} ช้อนชา (${(
          (8 * 10) /
          20
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "CPM 2mg/5ml syr",
      description: "0.12 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark:
        "2-6 y: max 6 mg/day | 6-12 y: max 12 mg/day | >12 y: max 24 mg/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
      dose: 0.12,
      divider: 0.4,
    },
    result: {
      calculatedDose: 0.12 * 10,
      calculatedEat: (0.12 * 10) / 0.4,
      howToTake: {
        first: `ครั้งละ ${((0.12 * 10) / 0.4 / 5).toFixed(1)} ช้อนชา (${(
          (0.12 * 10) /
          0.4
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Hydroxyzine (Atarax) 10mg/5ml syr",
      description: "0.6 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
      dose: 0.6,
      divider: 2,
    },
    result: {
      calculatedDose: 0.6 * 10,
      calculatedEat: (0.6 * 10) / 2,
      howToTake: {
        first: `ครั้งละ ${((0.6 * 10) / 2 / 5).toFixed(1)} ช้อนชา (${(
          (0.6 * 10) /
          2
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Pseudoephedrine 30mg/5ml syr",
      description: "1 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "Max: 120 mg/day",
      meal: "หลังอาหาร",
      label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
      dose: 1,
      divider: 6,
    },
    result: {
      calculatedDose: 1 * 10,
      calculatedEat: (1 * 10) / 6,
      howToTake: {
        first: `ครั้งละ ${((1 * 10) / 6 / 5).toFixed(1)} ช้อนชา (${(
          (1 * 10) /
          6
        ).toFixed(1)} ml)`,
      },
    },
  },
  {
    weight: 10,
    drug: {
      type: "calculateByWeight",
      displayName: "Salbutamol 2mg/5ml syr",
      description: "0.1 mg/kg/dose",
      doseUnit: "mg/kg/dose",
      remark: "max 2 mg/dose",
      meal: "หลังอาหาร",
      label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
      dose: 0.1,
      divider: 0.4,
    },
    result: {
      calculatedDose: 0.1 * 10,
      calculatedEat: (0.1 * 10) / 0.4,
      howToTake: {
        first: `ครั้งละ ${((0.1 * 10) / 0.4 / 5).toFixed(1)} ช้อนชา (${(
          (0.1 * 10) /
          0.4
        ).toFixed(1)} ml)`,
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
    it(`should return the drug as-is for calculateByAge type for case ${
      index + 1
    }`, () => {
      const result = calculateDrug(testCase.drug, testCase.weight);
      expect(result).toEqual(testCase.drug);
    });
  });

  calculateByWeightTestCases.forEach((testCase, index) => {
    it(`should calculate dose range correctly for case ${index + 1}`, () => {
      const result = calculateDrug(testCase.drug, testCase.weight);
      expect(result).toMatchObject({
        calculatedDoseWithRange: testCase.result.calculatedDoseWithRange,
        calculatedEatWithRange: testCase.result.calculatedEatWithRange,
        howToTake: testCase.result.howToTake,
      });
    });
  });

  calculateSingleDoseTestCases.forEach((testCase, index) => {
    it(`should calculate single dose correctly for case ${index + 1}`, () => {
      const result = calculateDrug(testCase.drug, testCase.weight);
      expect(result).toMatchObject({
        calculatedDose: testCase.result.calculatedDose,
        calculatedEat: testCase.result.calculatedEat,
        howToTake: testCase.result.howToTake,
      });
    });
  });
});
