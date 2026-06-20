import { useState } from "react";

// ======= Mock Data =======
const requests = [
  {
    id: "REQ001",
    type: "تعديل رحلة",
    status: "معلق",
    statusColor: "bg-amber-100 text-amber-600",
    tripId: 35,
    from: "جامعة الملك سعود",
    to: "جدة",
    submittedBy: "سارة أحمد",
    submittedFrom: "خدمة العملاء",
    date: "19-6-2025",
    time: "10:30 ص",
    reviews: 2,
    changes: [
      { label: "سعر الرحلة", from: "1300 ريال", to: "1500 ريال" },
      { label: "عدد الأيام", from: "1 يوم", to: "2 يوم" },
    ],
  },
  {
    id: "REQ001",
    type: "تعديل سائق",
    status: "معلق",
    statusColor: "bg-amber-100 text-amber-600",
    driverName: "محمد أحمد السعيد",
    submittedBy: "محمد أحمد",
    submittedFrom: "سائق",
    date: "19-6-2025",
    time: "10:30 ص",
    reviews: 2,
    changes: [
      { label: "رقم الهاتف", from: "05482356712", to: "05328605212" },
      { label: "المسار", from: "الرياض إلى الطائف", to: "الرياض إلى المنطقة" },
    ],
  },
  {
    id: "REQ001",
    type: "طلب استرداد",
    status: "موافق",
    statusColor: "bg-green-100 text-green-600",
    tripId: 23,
    from: "مكة",
    to: "المدينة",
    submittedBy: "سارة أحمد",
    submittedFrom: "خدمة العملاء",
    date: "19-6-2025",
    time: "10:30 ص",
    reviews: 2,
    changes: [
      { label: "المبلغ المسترد", from: "0 ريال", to: "500 ريال" },
      { label: "سبب الاسترداد", from: "—", to: "إلغاء من الفصل" },
    ],
  },
  {
    id: "REQ001",
    type: "تعديل مالي",
    status: "مرفوض",
    statusColor: "bg-red-100 text-red-500",
    tripId: 23,
    from: "مكة",
    to: "المدينة",
    submittedBy: "سارة أحمد",
    submittedFrom: "خدمة العملاء",
    date: "19-6-2025",
    time: "10:30 ص",
    reviews: 2,
    changes: [
      { label: "المبلغ", from: "1400 ريال", to: "500 ريال" },
    ],
  },
  {
    id: "REQ001",
    type: "تقرير حالة",
    status: "معلق",
    statusColor: "bg-amber-100 text-amber-600",
    tripId: 23,
    from: "مكة",
    to: "المدينة",
    submittedBy: "سارة أحمد",
    submittedFrom: "خدمة العملاء",
    date: "19-6-2025",
    time: "10:30 ص",
    reviews: 2,
    changes: [
      { label: "حالة الرحلة", from: "حالية", to: "منتهية" },
      { label: "سبب الإنهاء", from: "—", to: "شروط طارئة للسائق" },
    ],
  },
];

const statusOptions = ["الكل", "معلق", "موافق", "مرفوض"];
const typeOptions = ["الكل", "تعديل رحلة", "تعديل سائق", "طلب استرداد", "تعديل مالي", "تقرير حالة"];

const typeConfig = {
  "تعديل رحلة": { bg: "bg-purple-50", icon: "text-purple-500", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  "تعديل سائق": { bg: "bg-blue-50",   icon: "text-blue-500",   d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  "طلب استرداد":{ bg: "bg-green-50",  icon: "text-green-500",  d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" },
  "تعديل مالي": { bg: "bg-amber-50",  icon: "text-amber-500",  d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  "تقرير حالة": { bg: "bg-gray-100",  icon: "text-gray-500",   d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
};

export default function ApprovalsPage() {
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = requests.filter((r) => {
    const matchStatus = statusFilter === "الكل" || r.status === statusFilter;
    const matchType   = typeFilter === "الكل"   || r.type === typeFilter;
    const matchSearch = search === "" || r.submittedBy.includes(search) || r.id.includes(search);
    return matchStatus && matchType && matchSearch;
  });

  return (
    <div className="w-full space-y-5" dir="rtl">

      {/* Page Title — white background like other components */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
        <h1 className="text-2xl font-semibold text-[#c9a84c] text-right">مركز الموافقات</h1>
        <p className="text-xs text-gray-400 mt-0.5 text-right">مراجعة وموافقة على طلبات التغيير المقدمة من المستخدمين</p>
      </div>

      {/* Filters + Cards */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 text-right">فلتر حسب الحالة</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-600 text-right"
            >
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 text-right">فلتر حسب النوع</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-600 text-right"
            >
              {typeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2: Search */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 text-right">بحث</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم الموظف أو رقم الطلب ..."
              className="bg-transparent text-sm outline-none w-full placeholder-gray-300 text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4 pt-1">
          {filtered.map((req, idx) => {
            const config = typeConfig[req.type] || typeConfig["تقرير حالة"];
            return (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3 hover:bg-gray-50/40 transition-colors">

                {/* Header: type icon + name + status badge + id — all right-aligned */}
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs text-gray-400 font-mono">{req.id}#</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${req.statusColor}`}>
                    {req.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">{req.type}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                    <svg className={`w-4 h-4 ${config.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.d} />
                    </svg>
                  </div>
                </div>

                {/* Trip / Driver info — right-aligned */}
                <div className="text-right">
                  {req.tripId && (
                    <p className="text-sm font-bold text-gray-800">
                      #{req.tripId} {req.from} <span className="text-gray-400 mx-1">→</span> {req.to}
                    </p>
                  )}
                  {req.driverName && (
                    <p className="text-sm font-bold text-gray-800">سائق: {req.driverName}</p>
                  )}

                  {/* Meta row — right-aligned */}
                  <div className="flex items-center justify-end gap-2 mt-1 text-xs text-gray-400 flex-wrap">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>مقدم من: {req.submittedFrom} ({req.submittedBy})</span>
                    <span className="text-gray-300">•</span>
                    <span>{req.date} • {req.time}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-blue-400 underline cursor-pointer">{req.reviews} مراجعة</span>
                  </div>
                </div>

                {/* Changes box */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-gray-500 text-right mb-2">التغييرات المطلوبة</p>
                  {req.changes.map((ch, ci) => (
                    <div key={ci} className="flex items-center justify-end gap-2 text-xs">
                      <span className="text-green-600 font-medium">{ch.to}</span>
                      <span className="text-gray-300">←</span>
                      <span className="text-red-400 line-through">{ch.from}</span>
                      <span className="text-gray-500 font-medium">{ch.label}:</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                {req.status === "معلق" && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      رفض الطلب
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      الموافقة على الطلب
                    </button>
                  </div>
                )}

                {req.status !== "معلق" && (
                  <div className={`text-center text-xs font-medium py-2 rounded-xl ${
                    req.status === "موافق" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                  }`}>
                    {req.status === "موافق" ? "✓ تمت الموافقة على هذا الطلب" : "✕ تم رفض هذا الطلب"}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">لا توجد طلبات</p>
          )}
        </div>
      </div>
    </div>
  );
}
