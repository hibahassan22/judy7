import { useState, useEffect, useCallback } from "react";

const BASE = "https://drivo1.elmoroj.com/api";

// ======= Mock Data =======
const EXPENSE_TYPES_INIT = ["رواتب", "مكافآت", "تشغيل", "صيانة"];

const TARGETS_INIT = [
  { id: 1, from: 0,     to: 5000,  pct: 0,  label: "ضعيف",  color: "red" },
  { id: 2, from: 5000,  to: 10000, pct: 5,  label: "موقوف", color: "orange" },
  { id: 3, from: 15000, to: 10000, pct: 10, label: "جيد",   color: "green" },
];

const COLOR_OPTIONS = [
  { value: "green",  label: "أخضر",   bg: "bg-green-500",  text: "text-white" },
  { value: "orange", label: "برتقالي", bg: "bg-orange-500", text: "text-white" },
  { value: "red",    label: "أحمر",   bg: "bg-red-500",    text: "text-white" },
  { value: "blue",   label: "أزرق",   bg: "bg-blue-500",   text: "text-white" },
];

const labelColorMap = {
  green:  { badge: "bg-green-500 text-white" },
  orange: { badge: "bg-orange-500 text-white" },
  red:    { badge: "bg-red-500 text-white" },
  blue:   { badge: "bg-blue-500 text-white" },
};

// ======= Modal wrapper =======
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="px-5 py-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

// ======= Shared delete button =======
function DeleteBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center shrink-0 hover:bg-red-600 transition-colors"
    >
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

// ======= Shared edit button =======
function EditBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center shrink-0 hover:bg-blue-600 transition-colors"
      title="تعديل"
    >
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  );
}

// ======= Tab: أنواع المصروفات =======
function ExpenseTypesTab() {
  const [items, setItems] = useState(EXPENSE_TYPES_INIT);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    setItems((p) => [...p, newName.trim()]);
    setNewName("");
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          إضافة
        </button>
        <h3 className="text-sm font-semibold text-gray-700">أنواع المصروفات</h3>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-[#faf7f0] border border-gray-100 rounded-xl px-4 py-3">
            <DeleteBtn onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))} />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="إضافة نوع مصروف جديد" onClose={() => { setShowModal(false); setNewName(""); }}>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 text-right block">الاسم: النوع</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="مثال: صيانة"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right placeholder-gray-300"
              dir="rtl"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={() => { setShowModal(false); setNewName(""); }}
              className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium rounded-xl hover:bg-amber-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleAdd}
              className="px-5 py-2 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-sm font-medium rounded-xl transition-colors"
            >
              إضافة
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ======= Tab: التارجت =======
function TargetsTab() {
  const [items, setItems] = useState(TARGETS_INIT);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ from: "", to: "", pct: "", label: "", color: "green" });
  const [colorOpen, setColorOpen] = useState(false);

  const handleAdd = () => {
    if (!form.from || !form.to || !form.label) return;
    setItems((p) => [
      ...p,
      { id: Date.now(), from: +form.from, to: +form.to, pct: +form.pct, label: form.label, color: form.color },
    ]);
    setForm({ from: "", to: "", pct: "", label: "", color: "green" });
    setShowModal(false);
  };

  const selectedColor = COLOR_OPTIONS.find((c) => c.value === form.color);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          إضافة
        </button>
        <h3 className="text-sm font-semibold text-gray-700">قواعد التارجت</h3>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const badgeCls = labelColorMap[item.color]?.badge || "bg-gray-200 text-gray-600";
          return (
            <div key={item.id} className="flex items-center justify-between bg-[#faf7f0] border border-gray-100 rounded-xl px-4 py-3">
              <DeleteBtn onClick={() => setItems((p) => p.filter((x) => x.id !== item.id))} />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    من {item.from.toLocaleString()} إلى {item.to.toLocaleString()}
                  </p>
                  <p className="text-sm font-bold text-gray-800">{item.pct}%</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${badgeCls}`}>
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title="إضافة قاعدة تارجت جديدة" onClose={() => { setShowModal(false); setColorOpen(false); }}>
          {/* من / إلى */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 text-right block">إلى (مبلغ)</label>
              <input
                type="number"
                value={form.to}
                onChange={(e) => setForm((p) => ({ ...p, to: e.target.value }))}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 text-right block">من (مبلغ)</label>
              <input
                type="number"
                value={form.from}
                onChange={(e) => setForm((p) => ({ ...p, from: e.target.value }))}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* اللون */}
          <div className="space-y-1 relative">
            <label className="text-xs text-gray-500 text-right block">اللون</label>
            <button
              type="button"
              onClick={() => setColorOpen((p) => !p)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <div className={`flex-1 h-3 rounded-full mx-3 ${selectedColor?.bg}`} />
            </button>
            {colorOpen && (
              <div className="absolute top-full mt-1 right-0 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => { setForm((p) => ({ ...p, color: c.value })); setColorOpen(false); }}
                    className="w-full flex items-center justify-end gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700">{c.label}</span>
                    <div className={`w-5 h-5 rounded-full ${c.bg}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* التسمية */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 text-right block">التسمية</label>
            <input
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              placeholder="مثال: جيد"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right"
              dir="rtl"
            />
          </div>

          {/* النسبة */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 text-right block">النسبة %</label>
            <input
              type="number"
              value={form.pct}
              onChange={(e) => setForm((p) => ({ ...p, pct: e.target.value }))}
              placeholder="10"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right"
              dir="rtl"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={() => { setShowModal(false); setColorOpen(false); }}
              className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium rounded-xl hover:bg-amber-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleAdd}
              className="px-5 py-2 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-sm font-medium rounded-xl transition-colors"
            >
              إضافة
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ======= Tab: المدن =======
function CitiesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [editingCity, setEditingCity] = useState(null);
  const [editCityName, setEditCityName] = useState("");
  const [deletingCity, setDeletingCity] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`${BASE}/cities`, {
        headers: { "Accept": "application/json" }
      });
      console.log("GET /cities status:", r.status);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      console.log("GET /cities data:", d);
      const list = Array.isArray(d) ? d : (Array.isArray(d?.data) ? d.data : []);
      setItems(list);
    } catch (err) {
      console.error("fetchCities error:", err);
      setError("حدث خطأ أثناء تحميل المدن. يرجى التحقق من اتصال الشبكة.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleAdd = async () => {
    if (!newCity.trim()) return;
    setActionLoading(true);
    try {
      const r = await fetch(`${BASE}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name: newCity.trim() }),
      });
      console.log("POST /cities status:", r.status);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await r.json();
      setNewCity("");
      setShowModal(false);
      fetchCities();
    } catch (err) {
      console.error("handleAdd error:", err);
      alert("حدث خطأ أثناء إضافة المدينة");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editingCity || !editCityName.trim()) return;
    setActionLoading(true);
    try {
      const r = await fetch(`${BASE}/cities/${editingCity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name: editCityName.trim() }),
      });
      console.log("PUT /cities status:", r.status);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await r.json();
      setEditingCity(null);
      setEditCityName("");
      fetchCities();
    } catch (err) {
      console.error("handleEdit error:", err);
      alert("حدث خطأ أثناء تعديل المدينة");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCity) return;
    setActionLoading(true);
    try {
      const r = await fetch(`${BASE}/cities/${deletingCity.id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" },
      });
      console.log("DELETE /cities status:", r.status);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await r.json();
      setDeletingCity(null);
      fetchCities();
    } catch (err) {
      console.error("handleDelete error:", err);
      alert("حدث خطأ أثناء حذف المدينة");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (city) => {
    setEditingCity(city);
    setEditCityName(city.name);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          إضافة
        </button>
        <h3 className="text-sm font-semibold text-gray-700">المدن</h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-10 space-y-3 bg-[#faf7f0] rounded-xl border border-gray-100">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={fetchCities}
            className="px-4 py-2 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-xs font-medium rounded-xl transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 bg-[#faf7f0] rounded-xl border border-gray-100">
          <p className="text-sm text-gray-400">لا توجد مدن مضافة حالياً.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((city) => (
            <div key={city.id} className="flex items-center justify-between bg-[#faf7f0] border border-gray-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <DeleteBtn onClick={() => setDeletingCity(city)} />
                <EditBtn onClick={() => handleEditClick(city)} />
              </div>
              <span className="text-sm text-gray-700 font-medium">{city.name}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="إضافة مدينة جديدة" onClose={() => { setShowModal(false); setNewCity(""); }}>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 text-right block">اسم المدينة</label>
            <input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="مثال: الرياض"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right placeholder-gray-300"
              dir="rtl"
              disabled={actionLoading}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              disabled={actionLoading}
              onClick={() => { setShowModal(false); setNewCity(""); }}
              className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium rounded-xl hover:bg-amber-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              disabled={actionLoading || !newCity.trim()}
              onClick={handleAdd}
              className="px-5 py-2 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {actionLoading ? "جارٍ الإضافة..." : "إضافة"}
            </button>
          </div>
        </Modal>
      )}

      {editingCity && (
        <Modal title="تعديل اسم المدينة" onClose={() => { setEditingCity(null); setEditCityName(""); }}>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 text-right block">اسم المدينة الجديد</label>
            <input
              value={editCityName}
              onChange={(e) => setEditCityName(e.target.value)}
              placeholder="مثال: الرياض"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-right placeholder-gray-300"
              dir="rtl"
              disabled={actionLoading}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              disabled={actionLoading}
              onClick={() => { setEditingCity(null); setEditCityName(""); }}
              className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium rounded-xl hover:bg-amber-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              disabled={actionLoading || !editCityName.trim()}
              onClick={handleEdit}
              className="px-5 py-2 bg-[#c9a84c] hover:bg-[#b8973d] text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {actionLoading ? "جارٍ التعديل..." : "تعديل"}
            </button>
          </div>
        </Modal>
      )}

      {deletingCity && (
        <Modal title="تأكيد الحذف" onClose={() => setDeletingCity(null)}>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              هل أنت متأكد أنك تريد حذف مدينة <span className="font-bold text-gray-800">{deletingCity.name}</span>؟
            </p>
            <div className="flex gap-3 pt-2">
              <button
                disabled={actionLoading}
                onClick={() => setDeletingCity(null)}
                className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-xl text-sm hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                disabled={actionLoading}
                onClick={handleDelete}
                className="w-full bg-red-500 text-white font-medium py-2 rounded-xl text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {actionLoading ? "جارٍ الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ======= Main Page =======
const TABS = ["التارجت", "انواع المصروفات", "المدن"];

export default function SystemManagementPage() {
  const [activeTab, setActiveTab] = useState("التارجت");

  return (
    <div className="w-full space-y-5" dir="rtl">

      {/* Page Title */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
        <div className="flex items-center gap-2 justify-end">
          <h1 className="text-xl font-semibold text-[#c9a84c]">إدارة النظام</h1>
          <div className="w-8 h-8 bg-[#c9a84c] rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 text-right">تحكم في خيارات النظام والبيانات الأساسية</p>
      </div>

      {/* Tabs + Content */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">

        {/* Tab bar */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "التارجت"          && <TargetsTab />}
        {activeTab === "انواع المصروفات" && <ExpenseTypesTab />}
        {activeTab === "المدن"            && <CitiesTab />}
      </div>
    </div>
  );
}
