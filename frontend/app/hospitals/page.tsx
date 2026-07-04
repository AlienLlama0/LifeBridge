"use client";
import { useSearchParams } from "next/navigation";

import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { hospitals } from "@/lib/mock-data";
import HospitalCard from "@/components/HospitalCard";

const quickFilters = [
  "সব",
  "আইসিইউ খালি",
  "বেড খালি",
  "সরকারি",
  "বেসরকারি",
  "জরুরি বিভাগ খোলা",
] as const;

export default function HospitalsPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof quickFilters)[number]>("সব");

  const filteredHospitals = useMemo(() => {
    const query = search.toLowerCase().trim();

    return hospitals.filter((hospital) => {
      // Search
      const matchesSearch =
        query === "" ||
        hospital.name.toLowerCase().includes(query) ||
        hospital.namebn.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query);

      // Quick filters
      let matchesFilter = true;

      switch (activeFilter) {
        case "আইসিইউ খালি":
          matchesFilter = hospital.icuAvailable > 0;
          break;

        case "বেড খালি":
          matchesFilter = hospital.availableBeds > 0;
          break;

        case "সরকারি":
          matchesFilter = hospital.ownerType === "সরকারি";
          break;

        case "বেসরকারি":
          matchesFilter = hospital.ownerType === "বেসরকারি";
          break;

        case "জরুরি বিভাগ খোলা":
          matchesFilter = hospital.emergencyOpen;
          break;

        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl sm:text-3xl">
        হাসপাতাল খুঁজুন
      </h1>

      <p className="text-ink/60 mt-1">
        লাইভ বেড ও আইসিইউ অবস্থা অনুযায়ী হাসপাতাল বাছাই করুন।
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-xl px-4 py-3">
          <Search size={18} className="text-ink/40" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="হাসপাতাল বা এলাকা খুঁজুন…"
            className="flex-1 text-sm outline-none placeholder:text-ink/40"
          />
        </div>

        <button className="flex items-center justify-center gap-2 border border-line bg-white rounded-xl px-4 py-3 text-sm font-semibold">
          <SlidersHorizontal size={16} />
          ফিল্টার
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {quickFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              activeFilter === filter
                ? "bg-clinical-900 text-white border-clinical-900"
                : "bg-white border-line text-ink/70 hover:border-clinical-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 mb-4">
        <div className="flex items-center gap-2 text-sm font-medium text-clinical-900 bg-clinical-100 w-fit px-3 py-1.5 rounded-full">
          <Sparkles size={14} />
          AI সাজেশন: নিকটবর্তী ও সবচেয়ে বেশি বেড খালি থাকা হাসপাতাল আগে দেখানো হচ্ছে
        </div>

        <p className="text-sm text-ink/60">
          {filteredHospitals.length} টি হাসপাতাল পাওয়া গেছে
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-dashed border-line py-12 text-center text-ink/60">
            কোনো হাসপাতাল পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}