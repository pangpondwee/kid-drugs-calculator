"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historyDrugAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { Trash2Icon } from "lucide-react";
import { nanoid } from "nanoid";

export function History() {
  const [historyDrug, setHistoryDrug] = useAtom(historyDrugAtom);

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex gap-4 items-baseline">
        <h2 className="text-xl font-bold w-full">ประวัติการคำนวณ</h2>
        <Button variant="link" onClick={() => setHistoryDrug([])}>
          ล้างทั้งหมด
        </Button>
      </div>
      {historyDrug.length === 0 && (
        <div className="flex flex-1 justify-center items-center">
          <p className="text-base font-bold text-slate-600">ยังไม่มีประวัติ</p>
        </div>
      )}
      {historyDrug.map((drug, index) => (
        <Card key={nanoid()}>
          <CardHeader className="flex justify-between flex-row items-center border-b p-4">
            <CardTitle className="text-md font-bold">
              {index + 1}. {drug.displayName}
            </CardTitle>
            <Button
              variant={"outline"}
              size={"icon"}
              className="p-0 size-[36px]"
              onClick={() => {
                setHistoryDrug(historyDrug.filter((_, i) => i !== index));
              }}
            >
              <Trash2Icon size={20} />
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800">
                ขนาดยาตั้งต้น
              </span>
              <span className="text-sm text-slate-600">{drug.description}</span>
            </div>
            {drug.type === "calculateByWeight" && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">
                  ขนาดยาที่ใช้ในเด็กคนนี้
                </span>
                {drug.calculatedDose ? (
                  <span className="text-sm text-slate-600">
                    {drug.calculatedDose.toFixed(1)} {drug.doseUnit}
                  </span>
                ) : (
                  <span className="text-sm text-slate-600">
                    {drug.calculatedDoseWithRange?.lower.toFixed(1)} -{" "}
                    {drug.calculatedDoseWithRange?.upper.toFixed(1)}{" "}
                    {drug.doseUnit}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800">
                วิธีรับประทาน
              </span>
              <span className="text-sm text-slate-600">
                {drug.type === "calculateByAge" ? (
                  drug.meal
                ) : (
                  <div className="flex flex-col gap-1">
                    <span>{drug.howToTake?.first}</span>
                    <span>{drug.howToTake?.second}</span>
                  </div>
                )}
              </span>
            </div>
            {drug.remark && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">
                  หมายเหตุ
                </span>
                <span className="text-sm text-slate-600">{drug.remark}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
