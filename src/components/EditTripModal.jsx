import { useState } from "react";

export default function EditTripModal({ trip, onClose, onSave }) {
  const [form, setForm] = useState({
    from: trip?.from || "",
    to: trip?.to || "",
    city: trip?.city || "",
    driver: trip?.driver || "",
    customerName: trip?.customerName || "",
    phone: trip?.customerPhone || "",
    dateFrom: trip?.dateFrom || "",
    dateTo: trip?.dateTo || "",
    timeFrom: trip?.timeFrom || "",
    timeTo: trip?.timeTo || "",
    tripType: trip?.tripType || "",
    subscriptionType: trip?.subscriptionType || "",
    price: trip?.price || "",
    commission: trip?.commission || "",
    remaining: trip?.remaining || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden" dir="rtl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-amber-50">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-base font-bold text-gray-800">
            تعديل الرحلة {trip?.id ? `#${trip.id}` : ""}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* مسار الرحلة */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3">مسار الرحلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: "from", label: "من" },
                { name: "to", label: "إلى" },
                { name: "city", label: "المدينة" },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">{f.label}</label>
                  <input
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* التواريخ والأوقات */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3">المواعيد</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "dateFrom", label: "تاريخ البداية" },
                { name: "dateTo", label: "تاريخ النهاية" },
                { name: "timeFrom", label: "وقت الانطلاق" },
                { name: "timeTo", label: "وقت العودة" },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">{f.label}</label>
                  <input
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* السائق والعميل */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3">السائق والعميل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "driver", label: "السائق" },
                { name: "customerName", label: "اسم العميل" },
                { name: "phone", label: "رقم الجوال" },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">{f.label}</label>
                  <input
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    dir={f.name === "phone" ? "ltr" : "rtl"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* نوع الرحلة */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3">نوع الرحلة</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">نوع الرحلة</label>
                <select
                  name="tripType"
                  value={form.tripType}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="ذهاب وعودة">ذهاب وعودة</option>
                  <option value="ذهاب فقط">ذهاب فقط</option>
                  <option value="عودة فقط">عودة فقط</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">نوع الاشتراك</label>
                <select
                  name="subscriptionType"
                  value={form.subscriptionType}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="شهري">شهري</option>
                  <option value="أسبوعي">أسبوعي</option>
                  <option value="يومي">يومي</option>
                </select>
              </div>
            </div>
          </div>

          {/* المالية */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3">التفاصيل المالية</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "price", label: "السعر" },
                { name: "commission", label: "العمولة" },
                { name: "remaining", label: "المتبقي" },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">{f.label}</label>
                  <input
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* أزرار */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              حفظ التعديلات
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
