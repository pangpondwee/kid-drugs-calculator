"use client";

import {
  Drawer,
  DrawerClose,
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
import { drugsAtom, drugsHistoryAtom } from "@/store/atoms";
import { useState } from "react";
import { calculateDrugs } from "../_lib/calculator";
import { Card, CardContent } from "@/components/ui/card";

interface DrugDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DrugDrawer({ open, onOpenChange }: DrugDrawerProps) {
  const [drugs, setDrugs] = useAtom(drugsAtom);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full bg-white">
        <DrawerHeader className="pt-4 pb-3 w-full items-center flex justify-between border-b">
          <DrawerClose onClick={() => setDrugs([])}>
            <span className="text-md text-indigo-800 cursor-pointer">ยกเลิก</span>
          </DrawerClose>
          <DrawerTitle>เลือกยาที่ต้องการใช้</DrawerTitle>
          <DrawerClose asChild>
            <span className="text-md text-indigo-800 font-bold cursor-pointer">ตกลง</span>
          </DrawerClose>
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
      <div className="flex items-baseline border-b px-2 gap-2">
        <input
          id="weight"
          type="number"
          inputMode="decimal"
          value={props.value?.toString() || ""}
          placeholder={props.placeholder}
          className="text-right w-full focus:text-right border-0 p-0 rounded-none appearance-none text-3xl font-bold text-indigo-600 placeholder:text-3xl placeholder:font-bold placeholder:text-slate-300 outline-none"
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

  const [drugsHistory, setDrugsHistory] = useAtom(drugsHistoryAtom);
  const [drugs, setDrugs] = useAtom(drugsAtom);

  function resetForm() {
    setWeight(null);
    setDrugs([]);
  }

  function handleCalculate() {
    if (!drugs.length || !weight) return;

    const calculatedDrugs = calculateDrugs(drugs, weight);
    if (calculatedDrugs.length > 0) {
      setDrugsHistory([...drugsHistory, ...calculatedDrugs]);
      resetForm();
    }
  }

  return (
    <>
      <DrugDrawer open={open} onOpenChange={setOpen} />
      <Card>
        <CardContent>
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
          <Button onClick={handleCalculate} disabled={!drugs.length || !weight}>
            คำนวณ
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
