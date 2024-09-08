"use client";

import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";

export function SearchInput() {
  const [search, setSearch] = useQueryState("s", {
    defaultValue: "",
    shallow: true,
  });

  return (
    <div className="flex items-center border-b py-3 px-4 gap-3">
      <SearchIcon className="size-5 text-slate-400" />
      <input
        type="text"
        className="flex-1 border-0 p-0 rounded-none h-fit appearance-none text-md placeholder:text-md  placeholder:text-slate-300 outline-none"
        placeholder="ค้นหาด้วยชื่อ"
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      />
    </div>
  );
}
