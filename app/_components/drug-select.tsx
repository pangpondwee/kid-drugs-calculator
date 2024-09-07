"use client";

import { cn } from "@/lib/utils";
import { drugAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { ChevronDownIcon } from "lucide-react";

interface DrugSelectProps {
  onClick: () => void;
}

export function DrugSelect({ onClick }: DrugSelectProps) {
  const [drug] = useAtom(drugAtom);

  return (
    <div
      className="flex py-2 items-center border-b-2 px-2 gap-2 cursor-pointer"
      onClick={onClick}
    >
      <p
        className={cn("text-md text-slate-300 flex-1 font-bold", {
          "text-indigo-600": !!drug?.displayName?.length,
        })}
      >
        {!!drug?.displayName?.length
          ? drug?.displayName
          : "เลือกยาที่ต้องการใช้"}
      </p>
      <ChevronDownIcon className="size-6 text-slate-500" />
    </div>
  );
}
