import { hospitals } from "@/lib/mock-data";

export default function HospitalDashboard() {
  const h = hospitals[0];
  const fields = [
    { label: "মোট বেড", value: h.totalBeds },
    { label: "ভর্তি আছে", value: h.totalBeds - h.availableBeds },
    { label: "খালি বেড", value: h.availableBeds, tone: "vital" },
    { label: "আইসিইউ খালি", value: h.icuAvailable, tone: "vital" },
    { label: "ভেন্টিলেটর খালি", value: h.ventilatorAvailable, tone: "vital" },
    { label: "অক্সিজেন খালি", value: h.oxygenAvailable, tone: "vital" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl">হাসপাতাল ড্যাশবোর্ড</h1>
      <p className="text-ink/60 mt-1">{h.name} — স্টাফ প্যানেল, বেডের তথ্য হালনাগাদ করুন</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {fields.map((f) => (
          <div key={f.label} className="rounded-xl border border-line bg-white p-4">
            <label className="text-xs font-semibold text-ink/50">{f.label}</label>
            <input
              type="number"
              defaultValue={f.value}
              className={`w-full font-mono font-bold text-2xl mt-1 outline-none bg-transparent ${
                f.tone === "vital" ? "text-vital-dark" : "text-ink"
              }`}
            />
          </div>
        ))}
      </div>

      <button className="focus-ring mt-6 bg-clinical-900 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-clinical-700 transition-colors">
        তথ্য হালনাগাদ করুন
      </button>

      <section className="mt-10">
        <h2 className="font-display font-bold text-lg mb-3">সাম্প্রতিক বেড রিকোয়েস্ট</h2>
        <div className="rounded-2xl border border-line bg-white divide-y divide-line">
          {["রোগী: করিম উদ্দিন — সাধারণ বেড", "রোগী: রহিমা বেগম — আইসিইউ"].map((r) => (
            <div key={r} className="flex items-center justify-between px-5 py-3 text-sm">
              <span>{r}</span>
              <div className="flex gap-2">
                <button className="text-xs font-semibold text-vital-dark bg-vital-light px-3 py-1.5 rounded-full">
                  গ্রহণ করুন
                </button>
                <button className="text-xs font-semibold text-critical bg-critical-light px-3 py-1.5 rounded-full">
                  বাতিল
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
