"use client";

import { DrawerClose } from "@/components/ui/drawer";
import { Drug, drugs } from "@/data/drug";
import { drugAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { CheckIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export function DrugList() {
  const [selectedDrug, setDrug] = useAtom(drugAtom);
  const [search, setSearch] = useQueryState("s", {
    defaultValue: "",
    shallow: true,
  });

  const filteredDrugs = drugs.filter((drug) =>
    drug.displayName.toLowerCase().startsWith(search?.toLowerCase() ?? "")
  );

  const isSelected = (drug: Drug) => {
    return selectedDrug?.displayName === drug.displayName;
  };

  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, [setSearch]);

  return (
    <div className="flex flex-col h-[70vh] overflow-y-auto">
      {filteredDrugs.length > 0 ? (
        filteredDrugs.map((drug) => (
          <DrawerClose key={nanoid()} asChild>
            <div
              className="flex items-center gap-3 border-b py-3 px-4 cursor-pointer"
              onClick={() => setDrug(drug)}
            >
              {isSelected(drug) ? (
                <CheckIcon className="size-4 text-indigo-600" strokeWidth={2} />
              ) : (
                <div className="size-4" />
              )}
              <div className="text-md text-slate-800">{drug.displayName}</div>
            </div>
          </DrawerClose>
        ))
      ) : (
        <div className="flex items-center text-base font-bold justify-center h-full py-3 px-4 text-md text-slate-800">
          ไม่พบยาที่ค้นหา
        </div>
      )}
    </div>
  );
}
