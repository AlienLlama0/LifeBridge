import { hospitals, cityTotals } from "@/lib/mock-data";

export default function AdminDashboard() {
  const busiest = [...hospitals].sort(
    (a, b) => a.availableBeds / a.totalBeds - b.availableBeds / b.totalBeds
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl">অ্যাডমিন ড্যাশবোর্ড</h1>
      <p className="text-ink/60 mt-1">সারা শহরের হাসপাতাল ও বেডের সার্বিক চিত্র</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl bg-clinical-900 text-white p-5">
          <p className="text-xs opacity-70">মোট হাসপাতাল</p>
          <p className="font-mono font-bold text-3xl mt-1">{cityTotals.totalHospitals}</p>
        </div>
        <div className="rounded-2xl bg-white border border-line p-5">
          <p className="text-xs text-ink/50">মোট বেড</p>
          <p className="font-mono font-bold text-3xl mt-1">{cityTotals.totalBeds}</p>
        </div>
        <div className="rounded-2xl bg-vital-light p-5">
          <p className="text-xs text-vital-dark">খালি বেড</p>
          <p className="font-mono font-bold text-3xl mt-1 text-vital-dark">{cityTotals.availableBeds}</p>
        </div>
        <div className="rounded-2xl bg-critical-light p-5">
          <p className="text-xs text-critical-dark">খালি আইসিইউ</p>
          <p className="font-mono font-bold text-3xl mt-1 text-critical-dark">{cityTotals.icuAvailable}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display font-bold text-lg mb-4">বেড দখলের হার অনুযায়ী হাসপাতাল</h2>
        <div className="rounded-2xl border border-line bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-canvas text-ink/50 text-xs uppercase">
              <tr>
                <th className="text-right py-3 px-5 font-semibold">হাসপাতাল</th>
                <th className="text-right py-3 px-5 font-semibold">মোট বেড</th>
                <th className="text-right py-3 px-5 font-semibold">খালি</th>
                <th className="text-right py-3 px-5 font-semibold">দখলের হার</th>
              </tr>
            </thead>
            <tbody>
              {busiest.map((h) => {
                const occupied = Math.round(((h.totalBeds - h.availableBeds) / h.totalBeds) * 100);
                return (
                  <tr key={h.id} className="border-t border-line">
                    <td className="py-3 px-5 font-medium">{h.name}</td>
                    <td className="py-3 px-5 text-right font-mono">{h.totalBeds}</td>
                    <td className="py-3 px-5 text-right font-mono">{h.availableBeds}</td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 rounded-full bg-line overflow-hidden">
                          <div
                            className={`h-full ${occupied > 90 ? "bg-critical" : occupied > 70 ? "bg-caution" : "bg-vital"}`}
                            style={{ width: `${occupied}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs w-9">{occupied}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
