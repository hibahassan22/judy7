import { useState } from "react";

// ======= Mock Data =======
const stats = [
  {
    label: "الإشعارات المرسلة",
    value: 25,
    color: "bg-[#c9a84c]",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    label: "الإشعارات المجدولة",
    value: 5,
    color: "bg-gray-200",
    icon: (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "إجمالي المستلمين",
    value: 5567,
    color: "bg-gray-200",
    icon: (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
];

const notifications = [
  { id: 1, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "عام", status: "مرسل", statusColor: "bg-green-100 text-green-700", recipients: 520, date: "16-12-2025" },
  { id: 2, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "ترويجي", status: "مرسل", statusColor: "bg-green-100 text-green-700", recipients: 520, date: "16-12-2025" },
  { id: 3, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "عام", status: "مجدول", statusColor: "bg-gray-100 text-gray-600", recipients: 520, date: "16-12-2025" },
  { id: 4, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "تنبيه", status: "مرسل", statusColor: "bg-green-100 text-green-700", recipients: 520, date: "16-12-2025" },
  { id: 5, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "عام", status: "مجدول", statusColor: "bg-gray-100 text-gray-600", recipients: 520, date: "16-12-2025" },
  { id: 6, title: "عيد مبارك", message: "كل عام وانت بخير بمناسبة عيد الفطر المبارك", type: "عام", status: "مرسل", statusColor: "bg-green-100 text-green-700", recipients: 520, date: "16-12-2025" },
];

const typeColor = {
  "عام": "bg-blue-50 text-blue-600",
  "ترويجي": "bg-purple-50 text-purple-600",
  "تنبيه": "bg-amber-50 text-amber-600",
};

// ======= Component =======
export default function NotificationsPanel() {
  // حالة التحكم في فتح وإغلاق النافذة المنبثقة
  const [isOpen, setIsOpen] = useState(false);
  
  // حالة تحديد نوع الإرسال (الآن أو جدولة)
  const [sendType, setSendType] = useState("now"); 

  return (
    <div className="w-full relative" dir="rtl">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setIsOpen(true)} // فتح النافذة عند الضغط
          className="flex items-center gap-2 bg-[#1a1a1a] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#333] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4v16m8-8H4" />
          </svg>
          إرسال إشعار جديد
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">إدارة الإشعارات</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              {s.icon}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{s.value.toLocaleString()}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["العنوان", "الرسالة", "النوع", "الحالة", "عدد المستلمين", "التاريخ"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">{n.title}</td>
                <td className="px-5 py-4 text-gray-500 max-w-[220px] truncate">{n.message}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[n.type] || "bg-gray-100 text-gray-600"}`}>
                    {n.type}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${n.statusColor}`}>
                    {n.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {n.recipients}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======= النافذة المنبثقة (Modal) ======= */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-fade-in">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h2 className="text-lg font-medium text-gray-800">إرسال إشعار جديد</h2>
              <button 
                onClick={() => setIsOpen(false)} // إغلاق عند الضغط على X
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              {/* عنوان الإشعار */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">عنوان الإشعار</label>
                <input 
                  type="text" 
                  placeholder="مثال: عيد مبارك" 
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right focus:outline-none focus:border-gray-400"
                />
              </div>

              {/* الرسالة */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">الرسالة</label>
                <textarea 
                  rows={3}
                  placeholder="اكتب رسالة الإشعار..." 
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right focus:outline-none focus:border-gray-400 resize-none"
                />
              </div>

              {/* التاريخ / النوع */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">النوع</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right bg-white focus:outline-none focus:border-gray-400 appearance-none">
                  <option value="عام">عام</option>
                  <option value="ترويجي">ترويجي</option>
                  <option value="تنبيه">تنبيه</option>
                </select>
              </div>

              {/* خيارات الإرسال (راديو بوتون) */}
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="send_option" 
                    checked={sendType === "now"}
                    onChange={() => setSendType("now")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  إرسال الآن
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="send_option" 
                    checked={sendType === "scheduled"}
                    onChange={() => setSendType("scheduled")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  جدولة
                </label>
              </div>

              {/* حقل التاريخ (يظهر فقط إذا تم اختيار جدولة) */}
              {sendType === "scheduled" && (
                <div className="animate-fade-in">
                  <input 
                    type="date" 
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right focus:outline-none focus:border-gray-400"
                  />
                </div>
              )}

              {/* التنبيه الأزرق */}
              <div className="bg-blue-50 text-blue-600 border border-blue-100 rounded-xl p-3 text-xs text-center font-medium">
                سيتم إرسال هذا الإشعار إلى جميع السائقين المسجلين في النظام
              </div>

              {/* زر الحفظ */}
              <button 
                type="submit" 
                className="w-full bg-[#4a4a4a] text-white text-base py-3 rounded-xl hover:bg-[#333] transition-colors font-medium shadow-sm"
              >
                حفظ
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}