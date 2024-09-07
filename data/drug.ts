export type Drug = {
  type: "calculateByAge" | "calculateByWeight";
  displayName: string;
  description: string;
  doseUnit?: string;
  remark?: string;
  meal?: "หลังอาหาร" | "ก่อนอาหาร";
  label?: string;
  dose?: number;
  divider?: number;
  calculatedDose?: number;
  calculatedEat?: number;
  originalDoseWithRange?: {
    lower: number;
    upper: number;
  };
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

export const drugs: Drug[] = [
  {
    type: "calculateByAge",
    displayName: "Albendazole 200mg/5ml syr",
    description: "> 2 y: 10 mL with meal single dose or BID 3 Days",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByWeight",
    displayName: "Amoxicillin 125mg/5ml syr",
    description: "6.6 - 13.3 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 6.6,
      upper: 13.3,
    },
    remark: "max 2-3 g/day",
    meal: "หลังอาหาร",
    label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
  },
  {
    type: "calculateByWeight",
    displayName: "Amoxicillin 250mg/5ml syr",
    description: "6.6 - 13.3 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 6.6,
      upper: 13.3,
    },
    remark: "max 2-3 g/day",
    meal: "หลังอาหาร",
    label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
  },
  {
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
  {
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
  {
    type: "calculateByWeight",
    displayName: "Amox/clav 228.5 mg/5ml syr BID",
    description: "8.3 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 8.3,
      upper: 15,
    },
    meal: "หลังอาหาร",
    label: "วันละ 2 ครั้ง เช้า เย็น",
  },
  {
    type: "calculateByWeight",
    displayName: "Amox/clav 457 mg/5ml syr BID",
    description: "8.3 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 8.3,
      upper: 15,
    },
    meal: "หลังอาหาร",
    label: "วันละ 2 ครั้ง เช้า เย็น",
  },
  {
    type: "calculateByWeight",
    displayName: "Amox/clav 600 mg/5ml syr BID 10 day for AOM",
    description: "45 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    meal: "หลังอาหาร",
    label: "วันละ 2 ครั้ง เช้า เย็น",
    dose: 45,
    divider: 120,
  },
  {
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
  {
    type: "calculateByAge",
    displayName: "Ambroxal 30mg/5ml syr",
    description:
      "2-6 y: 2.5 mL TID, 6-12 y: 5 mL BID-TID, >12 y: 5 mL TID or 10 mL BID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByWeight",
    displayName: "Azithromycin 200mg/5ml syr for GAS infection",
    description: "12 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    meal: "หลังอาหาร",
    label: "วันละ 1 ครั้ง เช้า",
    dose: 12,
    divider: 40,
  },
  {
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
  {
    type: "calculateByAge",
    displayName: "Bromhexine 4mg/5ml syr",
    description: "2-6 y: 2.5 mL TID, 6-12 y: 5 mL TID, >12 y: 10 mL TID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
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
  {
    type: "calculateByAge",
    displayName: "Carbocisteine 100mg/5ml syr",
    description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByAge",
    displayName: "Carbocisteine 200mg/5ml syr",
    description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByAge",
    displayName: "Carbocisteine 250mg/5ml syr",
    description: "1-5 y: 5  mL OD - BID, >5 y: 5 mL TID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByAge",
    displayName: "Carbocisteine 500mg/5ml syr",
    description: "1-5 y: 5 mL OD - BID, >5 y: 5 mL TID",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
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
  {
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
  {
    type: "calculateByWeight",
    displayName: "Cephalexin 125mg/5ml syr",
    description: "8.3 - 16.6 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    remark: "max 2-3 g/day",
    meal: "หลังอาหาร",
    label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
    originalDoseWithRange: {
      lower: 8.3,
      upper: 16.6,
    },
  },
  {
    type: "calculateByWeight",
    displayName: "Cephalexin 250mg/5ml syr",
    description: "8.3 - 16.6 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 8.3,
      upper: 16.6,
    },
    remark: "max 2-3 g/day",
    meal: "หลังอาหาร",
    label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
  },
  {
    type: "calculateByAge",
    displayName: "Cetirizine 5mg/5ml syr",
    description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
    remark: "คำนวณตามอายุ; 2-6 y max 5 mg/day",
    meal: "หลังอาหาร",
  },
  {
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
  {
    type: "calculateByWeight",
    displayName: "Cloxacillin 125mg/5ml syr",
    description: "12.5 - 25 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 12.5,
      upper: 25,
    },
    remark: "max 2 - 3 g/day",
    meal: "ก่อนอาหาร",
    label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
  },
  {
    type: "calculateByWeight",
    displayName: "Dicloxacillin 62.5mg/5ml syr",
    description: "6.25 - 12.5 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 6.25,
      upper: 12.5,
    },
    remark: "max 100 mg/kg/day",
    meal: "ก่อนอาหาร",
    label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
  },
  {
    type: "calculateByAge",
    displayName: "Desloratadine 0.5mg/ml syr",
    description:
      "6 - 11 m: 2 mL OD, 1 - 5 y: 2.5 mL OD, 6 - 11 y: 5 mL OD, >12 y: 10 mL OD",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByWeight",
    displayName: "Domperidone 1mg/ml syr",
    description: "0.2 - 0.4 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 0.2,
      upper: 0.4,
    },
    meal: "ก่อนอาหาร",
    label: "วันละ 3 ครั้ง เช้า เที่ยง เย็น",
  },
  {
    type: "calculateByWeight",
    displayName: "Guaifenesin 100mg/5ml syr ",
    description: "2.5 - 5 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 2.5,
      upper: 5,
    },
    meal: "หลังอาหาร",
    label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
  },
  {
    type: "calculateByWeight",
    displayName: "Hydroxyzine (Atarax) 10mg/5ml syr",
    description: "0.6 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    meal: "หลังอาหาร",
    label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
    dose: 0.6,
    divider: 2,
  },
  {
    type: "calculateByWeight",
    displayName: "Ibuprofen 100mg/5ml syr",
    description: "7 - 10 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 7,
      upper: 10,
    },
    meal: "หลังอาหาร",
    label: "เวลาปวดหรือมีไข้ทุก 6-8 ช.ม.",
  },
  {
    type: "calculateByAge",
    displayName: "Loratadine 5mg/5ml syr",
    description: "2-6 y: 5 mL OD, >6 y: 10 mL OD",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByAge",
    displayName: "Mebendazole 100mg/5ml syr",
    description: "> 2 y: 5 mL with meal single dose or BID 3 Days",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByWeight",
    displayName: "Paracetamol 100mg/ml syr",
    description: "10 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 10,
      upper: 15,
    },
    remark: "max 4 g/day",
    label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
  },
  {
    type: "calculateByWeight",
    displayName: "Paracetamol 120mg/5ml syr",
    description: "10 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 10,
      upper: 15,
    },
    remark: "max 4 g/day",
    label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
  },
  {
    type: "calculateByWeight",
    displayName: "Paracetamol 160mg/5ml syr",
    description: "10 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 10,
      upper: 15,
    },
    remark: "max 4 g/day",
    label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
  },
  {
    type: "calculateByWeight",
    displayName: "Paracetamol 250mg/5ml syr",
    description: "10 - 15 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 10,
      upper: 15,
    },
    remark: "max 4 g/day",
    label: "เวลาปวดหรือมีไข้ทุก 4-6 ช.ม.",
  },
  {
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
  {
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
  {
    type: "calculateByAge",
    displayName: "Simethicone 40mg/0.6ml syr",
    description:
      "<2 y: 0.3 mL PRN QID, 2-12 y: 0.6 mL PRN QID, >12 y: 0.6 - 1.8 mL PRN QID",
    remark: "คำนวณตามอายุ; < 2 y max 240 mg/day",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByAge",
    displayName: "Simethicone/Dicyclomine 50/5mg /5ml syr",
    description: "<4 y: 2.5 mL TID - QID AC, 4-12 y: 5 mL TID - QID AC",
    remark: "คำนวณตามอายุ",
    meal: "หลังอาหาร",
  },
  {
    type: "calculateByWeight",
    displayName: "Terbutaline 1.5mg/5ml syr",
    description: "0.07 - 0.1 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 0.07,
      upper: 0.1,
    },
    remark: "max 2.5 mg/dose",
    meal: "หลังอาหาร",
    label: "วันละ 4 ครั้ง เช้า เที่ยง เย็น ก่อนนอน",
  },
  {
    type: "calculateByWeight",
    displayName: "Trimethoprim/sulfa (bactrim) 40/200 mg/5ml syr",
    description: "3 - 6 mg/kg/dose",
    doseUnit: "mg/kg/dose",
    originalDoseWithRange: {
      lower: 3,
      upper: 6,
    },
    remark: "max 320 mg Trimethoprim/day",
    meal: "หลังอาหาร",
    label: "วันละ 2 ครั้ง เช้า เย็น",
  },
];
