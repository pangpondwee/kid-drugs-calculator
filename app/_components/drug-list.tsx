"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Drug, drugs } from "@/data/drug";
import { drugsAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export function DrugList() {
  const [selectedDrugs, setSelectedDrugs] = useAtom(drugsAtom);
  const [search, setSearch] = useQueryState("s", {
    defaultValue: "",
    shallow: true,
  });

  const filteredDrugs = drugs
    .filter((drug) =>
      drug.displayName.toLowerCase().startsWith(search?.toLowerCase() ?? "")
    )
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  const isSelected = (drug: Drug) => {
    return selectedDrugs.some((d) => d.displayName === drug.displayName);
  };

  const toggleDrug = (drug: Drug) => {
    if (isSelected(drug)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d.displayName !== drug.displayName));
    } else {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
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
            <div
              key={drug.displayName}
              className="flex items-center gap-3 border-b py-3 px-4 cursor-pointer"
              onClick={() => toggleDrug(drug)}
            >
              <Checkbox checked={isSelected(drug)} />
              <div className="text-md text-slate-800">{drug.displayName}</div>
            </div>
        ))
      ) : (
        <div className="flex items-center text-base font-bold justify-center h-full py-3 px-4 text-md text-slate-800">
          ไม่พบยาที่ค้นหา
        </div>
      )}
    </div>
  );
}
