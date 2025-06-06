"use client";

import { cn } from "@/lib/utils";
import { drugsAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { ChevronDownIcon } from "lucide-react";

interface DrugSelectProps {
  onClick: () => void;
}

export function DrugSelect({ onClick }: DrugSelectProps) {
  const [drugs] = useAtom(drugsAtom);

  const getDisplayText = () => {
    if (!drugs?.length) {
      return "เลือกยาที่ต้องการใช้";
    }
    
    if (drugs.length === 1) {
      return drugs[0].displayName;
    }
    
    return `${drugs[0].displayName} และอีก ${drugs.length - 1} `;
  };

  return (
    <div
      className="flex py-2 items-center border-b px-2 gap-2 cursor-pointer min-h-[2.5rem]"
      onClick={onClick}
    >
      <p
        className={cn("text-md text-slate-300 flex-1 font-bold leading-tight", {
          "text-indigo-600": !!drugs?.length,
        })}
      >
        {getDisplayText()}
      </p>
      <div className="flex items-center gap-2">
        <ChevronDownIcon className="size-6 text-slate-500" />
      </div>
    </div>
  );
}
