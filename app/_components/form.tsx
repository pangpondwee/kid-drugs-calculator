"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { DrugSelect } from "./drug-select";
import { SearchInput } from "./search-input";
import { DrugList } from "./drug-list";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { drugAtom, historyDrugAtom } from "@/store/atoms";
import { useState } from "react";

interface DrugDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DrugDrawer({ open, onOpenChange }: DrugDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full bg-white">
        <DrawerHeader className="pt-4 pb-3 w-full flex justify-center border-b">
          <DrawerTitle>เลือกยาที่ต้องการใช้</DrawerTitle>
        </DrawerHeader>
        <SearchInput />
        <DrugList />
      </DrawerContent>
    </Drawer>
  );
}

interface CustomInputProps {
  name: string;
  value: number | null;
  unit: string;
  label: string;
  placeholder?: string;
  onChange: (value: number) => unknown;
}

function CustomInput({ ...props }: CustomInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="weight">น้ำหนัก</Label>
      <div className="flex items-center border-b-2 px-2 gap-2">
        <input
          id="weight"
          type="number"
          value={props.value?.toString() || ""}
          placeholder={props.placeholder}
          className="text-right w-full focus:text-right border-0 p-0 rounded-none appearance-none text-3xl font-bold text-indigo-600 placeholder:text-3xl placeholder:font-bold placeholder:text-slate-300"
          onChange={(e) => props.onChange(e.target.valueAsNumber)}
        />
        <Label>กิโลกรัม</Label>
      </div>
    </div>
  );
}

export default function Form() {
  const [weight, setWeight] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [historyDrug, setHistoryDrug] = useAtom(historyDrugAtom);
  const [currentDrug, setCurrentDrug] = useAtom(drugAtom);

  function resetForm() {
    setWeight(null);
    setCurrentDrug(null);
  }

  function calculateDose(dose: number, weight: number): number {
    return dose * weight;
  }

  function handleCalculate() {
    if (!currentDrug || !weight) return;

    const { type, originalDoseWithRange, dose, divider, label, meal } =
      currentDrug;

    if (type === "calculateByAge") {
      setHistoryDrug([...historyDrug, currentDrug]);
      resetForm();
      return;
    }

    if (originalDoseWithRange) {
      const calculatedDoseWithRange = {
        lower: calculateDose(originalDoseWithRange.lower, weight),
        upper: calculateDose(originalDoseWithRange.upper, weight),
      };
      const calculatedEatWithRange = {
        lower: calculatedDoseWithRange.lower / 25,
        upper: calculatedDoseWithRange.upper / 25,
      };
      const howToTake = {
        first: `ครั้งละ ${(calculatedEatWithRange.lower / 5).toFixed(1)} - ${(
          calculatedEatWithRange.upper / 5
        ).toFixed(1)} ช้อนชา (${calculatedEatWithRange.lower.toFixed(
          1
        )} - ${calculatedEatWithRange.upper.toFixed(1)} ml)`,
        second: `${label} ${meal}`,
      };
      setHistoryDrug([
        ...historyDrug,
        {
          ...currentDrug,
          calculatedDoseWithRange,
          calculatedEatWithRange,
          howToTake,
        },
      ]);
      resetForm();
      return;
    }

    if (dose && divider) {
      const calculatedDose = calculateDose(dose, weight);
      const calculatedEat = calculatedDose / divider;
      const howToTake = {
        first: `ครั้งละ ${(calculatedEat / 5).toFixed(
          1
        )} ${meal} ช้อนชา (${calculatedEat.toFixed(1)} ml)`,
        second: `${label} ${meal}`,
      };
      setHistoryDrug([
        ...historyDrug,
        { ...currentDrug, calculatedDose, calculatedEat, howToTake },
      ]);
      resetForm();
      return;
    }
  }

  return (
    <>
      <DrugDrawer open={open} onOpenChange={setOpen} />
      <div className="flex flex-col p-4 gap-6 bg-white/95 rounded-xl ">
        <CustomInput
          name="weight"
          label="น้ำหนัก"
          unit="กิโลกรัม"
          value={weight}
          placeholder="0.00"
          onChange={setWeight}
        />
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>ยาที่ต้องการใช้</Label>
          <DrugSelect onClick={() => setOpen(true)} />
        </div>
        <Button onClick={handleCalculate} disabled={!currentDrug || !weight}>
          คำนวณ
        </Button>
      </div>
    </>
  );
}
