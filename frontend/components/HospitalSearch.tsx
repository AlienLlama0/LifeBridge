"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BedDouble, Wind, Snowflake, Siren } from "lucide-react";

const filters = [
  { key: "bed", icon: BedDouble, label: "সাধারণ বেড" },
  { key: "icu", icon: Snowflake, label: "আইসিইউ" },
  { key: "ventilator", icon: Wind, label: "ভেন্টিলেটর" },
  { key: "oxygen", icon: Siren, label: "অক্সিজেন" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function HospitalSearch() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<FilterKey[]>([]);

  const toggleFilter = (key: FilterKey) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.filter((f) => f !== key)
        : [...prev, key]
    );
  };

  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  selected.forEach((filter) => params.append("filter", filter));

  return (
    <>
      <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 pl-4">
        <Search size={18} className="text-ink/40" />

        <input
          type="text"
          placeholder="হাসপাতাল বা এলাকার নাম লিখুন…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 py-2.5 text-ink text-sm outline-none placeholder:text-ink/40"
        />

        <Link
          href={`/hospitals?${params.toString()}`}
          className="focus-ring bg-clinical-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-clinical-700 transition-colors whitespace-nowrap"
        >
          খুঁজুন
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {filters.map((filter) => {
          const active = selected.includes(filter.key);

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => toggleFilter(filter.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                ${
                  active
                    ? "bg-vital text-white border border-vital"
                    : "bg-white/10 border border-white/15 text-white hover:bg-white/20"
                }`}
            >
              <filter.icon size={13} />
              {filter.label}
            </button>
          );
        })}
      </div>
    </>
  );
}