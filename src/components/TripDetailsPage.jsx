import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, PauseCircle, X, Upload } from "lucide-react";

// ======= Icons =======
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TransferArrowIcon = () => (
  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

// ======= Notes data =======
const notes = [
  { id: 1, text: "السائق ملتزم بالمواعيد", author: "سارة احمد", date: "1-2-2026" },
  { id: 2, text: "العميل غير راضٍ عن الخدمة", author: "سارة احمد", date: "1-2-2026" },
];

// ======= Modals (Pop-ups) =======
function AddNoteModal({ isOpen, onClose, onSave }) {
  const [text, setText] = useState("");
  if (!isOpen) return null;
  const handleSave = () => { if (!text.trim()) return; onSave(text.trim()); setText(""); onClose(); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800">إضافة ملاحظة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب الملاحظة هنا..." rows={4} className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-700 resize-none outline-none focus:border-[#c9a84c] transition-colors" dir="rtl" />
        <div className="flex items-center gap-2 mt-4 justify-start">
          <button onClick={handleSave} className="bg-[#4a4746] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#b8943f] transition-colors">حفظ</button>
          <button onClick={onClose} className="border border-gray-200 text-gray-500 text-xs px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">إلغاء</button>
        </div>
      </div>
    </div>
  );
}

// ----------------- تحديث مودال معالجة طلب استرداد -----------------
function RefundModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ 
    amount: "", method: "", accountName: "", iban: "", bankTo: "", bankName: "", reason: "" 
  });
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" dir="rtl" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[440px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-y-auto text-right space-y-4 animate-in fade-in zoom-in-95 duration-200 hide-scrollbar">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">معالجة طلب استرداد</h3>
            <p className="text-[10px] text-gray-400 mt-1 leading-tight">أدخل تفاصيل المبلغ المراد استرداد<br/>الحالة الجديدة</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Box */}
        <div className="bg-[#fffcf5] border border-amber-200 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[#c9a84c] font-bold text-xs">ملاحظة مهمة</span>
            <div className="w-4 h-4 rounded-full border border-amber-500 text-amber-600 flex items-center justify-center text-[10px] font-bold">!</div>
          </div>
          <div className="text-gray-600 text-[11px]">
            المبلغ الإجمالي المدفوع : <strong className="text-[#c9a84c] font-bold">800 ريال</strong>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">المبلغ المسترد (ريال)</label>
            <input type="number" placeholder="ادخل المبلغ" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">طريقة الاسترداد</label>
            <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-400 focus:border-[#c9a84c] focus:outline-none bg-white transition-colors appearance-none outline-none">
              <option value="" disabled>اختر طريقة الاسترداد</option>
              <option value="bank">تحويل بنكي</option>
              <option value="cash">نقدي</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">بيانات التحويل البنكي</label>
            <input type="text" placeholder="اسم صاحب الحساب" value={formData.accountName} onChange={(e) => setFormData({...formData, accountName: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>

          {/* Sub Bank Info Fields */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-[11px] font-bold text-[#c9a84c]">إضافة حساب بنكي</label>
            <input type="text" placeholder="رقم الايبان" value={formData.iban} onChange={(e) => setFormData({...formData, iban: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors text-right" dir="rtl" />
            <input type="text" placeholder="البنك المحول له" value={formData.bankTo} onChange={(e) => setFormData({...formData, bankTo: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors text-right" />
            <input type="text" placeholder="اسم البنك" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors text-right" />
          </div>

          <div className="flex flex-col gap-1.5 mt-1">
            <label className="text-[11px] font-bold text-gray-600">سبب الاسترداد</label>
            <textarea rows="3" placeholder="ادخل اي ملاحظات اضافية" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors resize-none" />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={onClose} className="w-full rounded-xl bg-[#595959] py-3 text-sm font-bold text-white hover:bg-[#404040] transition-colors shadow-sm">
            معالجة الاسترداد
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangeStatusModal({ isOpen, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState("progress");
  const [reason, setReason] = useState("");
  
  if (!isOpen) return null;
  
  const statuses = [
    { id: "progress", label: "قيد التنفيذ", icon: <Clock className="w-5 h-5 text-blue-600" /> },
    { id: "completed", label: "مكتملة", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
    { id: "cancelled", label: "ملغية", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { id: "suspended", label: "معلقة", icon: <PauseCircle className="w-5 h-5 text-amber-600" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" dir="rtl" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-2xl p-6 flex flex-col text-right relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-800">تغيير حالة الرحلة</h3>
          <p className="text-[13px] text-gray-500 mt-1">اختر الحالة الجديدة وأدخل سبب التغيير</p>
        </div>
        
        <label className="text-sm font-bold text-gray-700 mb-3 block">الحالة الجديدة</label>
        
        <div className="space-y-3 mb-5">
          {statuses.map((status) => {
            const isSelected = selectedStatus === status.id;
            return (
              <div 
                key={status.id} 
                onClick={() => setSelectedStatus(status.id)} 
                className={`flex items-center justify-between border rounded-xl p-3.5 cursor-pointer transition-all ${isSelected ? "border-gray-400 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
              >
                 <div className="flex items-center gap-3">
                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-gray-800" : "border-gray-300"}`}>
                       {isSelected && <div className="w-2 h-2 bg-gray-800 rounded-full"></div>}
                     </div>
                     {status.icon}
                     <span className="text-sm font-medium text-gray-700">{status.label}</span>
                 </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-bold text-gray-700">سبب التغيير</label>
          <textarea rows="3" placeholder="ادخل اي ملاحظات اضافية" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-700 focus:border-gray-400 focus:outline-none resize-none transition-colors" />
        </div>
        
        <button onClick={onClose} className="w-full rounded-xl bg-[#595959] py-3.5 text-sm font-bold text-white hover:bg-[#404040] transition-colors shadow-md">
          تأكيد التغيير
        </button>
      </div>
    </div>
  );
}

// ----------------- تحديث مودال إضافة دفعة جديدة -----------------
function AddPaymentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ 
    amount: "", date: "", accountFrom: "", accountTo: "", method: "", notes: "", proof: null 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" dir="rtl" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[420px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-y-auto text-right space-y-4 animate-in fade-in zoom-in-95 duration-200 hide-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-800">إضافة دفعة جديدة</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">المبلغ</label>
            <input type="number" placeholder="ادخل المبلغ" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">التاريخ</label>
            <input type="text" placeholder="mm/dd/yy" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors text-right" dir="rtl" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">الحساب المحول منه</label>
            <input type="text" placeholder="ادخل اسم الحساب" value={formData.accountFrom} onChange={(e) => setFormData({...formData, accountFrom: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">الحساب المحول إليه</label>
            <input type="text" placeholder="ادخل اسم الحساب" value={formData.accountTo} onChange={(e) => setFormData({...formData, accountTo: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">طريقة التحويل</label>
            <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-400 focus:border-[#c9a84c] focus:outline-none bg-white transition-colors appearance-none outline-none">
              <option value="" disabled>البنك</option>
              <option value="bank">تحويل بنكي</option>
              <option value="cash">نقدي</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">إثبات التحويل</label>
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors bg-white font-bold">
              <Upload className="w-3.5 h-3.5" />
              <span>اختر الملف</span>
              <input type="file" className="hidden" onChange={(e) => setFormData({ ...formData, proof: e.target.files[0] })} />
            </label>
            {formData.proof && <span className="text-[10px] text-emerald-600 truncate px-1">{formData.proof.name}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-600">ملاحظة</label>
            <textarea rows="3" placeholder="أضف ملاحظة (اختياري)" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors resize-none" />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={onClose} className="w-full rounded-xl bg-[#595959] py-3 text-sm font-bold text-white hover:bg-[#404040] transition-colors shadow-sm">
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}

function EditTripDataModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ 
    price: "1200", 
    city: "الرياض", 
    from: "حي الملقا", 
    to: "جامعة الملك سعود", 
    driver: "احمد علي", 
    customerName: "سارة احمد", 
    phone: "0544222333" 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" dir="rtl" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[500px] rounded-3xl bg-white shadow-2xl p-6 flex flex-col max-h-[92vh] overflow-y-auto text-right space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">تعديل بيانات الرحلة</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">نقطة الانطلاق</label>
            <input type="text" value={formData.from} onChange={(e) => setFormData({...formData, from: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">نقطة الوصول</label>
            <input type="text" value={formData.to} onChange={(e) => setFormData({...formData, to: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">المدينة</label>
            <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">السعر</label>
            <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">اسم السائق</label>
            <input type="text" value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600">اسم العميل</label>
            <input type="text" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
            <input type="text" dir="ltr" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#c9a84c] outline-none text-right transition-colors" />
          </div>
        </div>
        
        <button onClick={onClose} className="w-full rounded-xl bg-[#c9a84c] py-3.5 text-sm font-bold text-white hover:bg-[#b8943f] mt-4 transition-colors shadow-sm">
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
}

// ======= Main Component =======
export default function TripDetailsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  
  const tabs = [
    { id: "trip", label: "بيانات الرحلة" },
    { id: "financial", label: "التفاصيل الماليه" },
    { id: "notes", label: "الملاحظات" },
  ];
  
  const [activeTab, setActiveTab] = useState("financial");
  const [noteList, setNoteList] = useState(notes);
  
  // Modals States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditTripModal, setShowEditTripModal] = useState(false);

  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      author: "سارة احمد",
      date: new Date().toLocaleDateString("ar-EG"),
    };
    setNoteList((prev) => [newNote, ...prev]);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] font-sans flex flex-col gap-4 p-4 md:p-6" dir="rtl">
      
      {/* 1. الكارت العلوي الأول (بيانات الرحلة الأساسية والأزرار) */}
      <div className="w-full bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          
          {/* الجانب الأيمن: العنوان والـ Tags */}
          <div>
            <div className="flex items-center gap-2 text-[#4a4746] font-bold text-lg mb-4 w-fit">
              <ArrowRightIcon />
              <span>تفاصيل الرحلة #{tripId || "35"}</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#4a4746] text-white text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                فردي
              </span>
              <span className="border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                مسار واحد
              </span>
              <span className="border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-lg shadow-sm">اشتراك</span>
              <span className="border border-[#c9a84c] text-[#c9a84c] bg-[#fffcf5] text-xs px-4 py-1.5 rounded-lg shadow-sm">معلقة</span>
            </div>
          </div>

          {/* الجانب الأيسر: الأزرار */}
          <div className="flex gap-2">
            <button 
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-1.5 bg-white border border-gray-300 text-gray-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshIcon /> تغيير الحالة
            </button>
            <button 
              onClick={() => setShowEditTripModal(true)}
              className="flex items-center gap-1.5 bg-[#4a4746] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#383534] transition-colors shadow-sm"
            >
              <EditIcon /> تعديل الرحلة
            </button>
          </div>

        </div>
      </div>

      {/* 2. الكارت السفلي الثاني (التابات والمحتوى) */}
      <div className="w-full bg-white rounded-[1.5rem] shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* التابات */}
        <div className="mx-6 mt-6 mb-2 bg-[#f4efe8] p-1.5 rounded-full flex gap-1 shadow-inner border border-gray-100 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 whitespace-nowrap text-[13px] font-bold rounded-full transition-all duration-300
                ${activeTab === tab.id
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/40"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* محتوى التابات */}
        <div className="p-6 bg-[#faf9f6] flex-1 rounded-b-[1.5rem]">

          {/* ===== Notes Tab ===== */}
          {activeTab === "notes" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-800 text-sm">الملاحظات الإدارية</h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <PlusIcon /> اضافة ملاحظة
                </button>
              </div>

              <div className="space-y-3">
                {noteList.map((note) => (
                  <div key={note.id} className="bg-white border border-gray-200 rounded-[1.2rem] p-5 shadow-sm text-right flex flex-col hover:border-[#c9a84c] transition-colors">
                    <p className="text-gray-800 font-bold text-sm mb-3">{note.text}</p>
                    <p className="text-gray-400 text-xs text-left w-full mt-auto">
                      {note.date} . <span className="font-medium text-gray-500">{note.author}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== Trip Data Tab ===== */}
          {activeTab === "trip" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                  <span className="text-[#c9a84c]">📍</span> <span>مسار الرحلة</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                  <div><span className="text-gray-400 block mb-1">نقطة الانطلاق:</span><span className="font-medium">حي الملقا</span></div>
                  <div><span className="text-gray-400 block mb-1">نقطة الوصول:</span><span className="font-medium">جامعة الملك سعود</span></div>
                  <div><span className="text-gray-400 block mb-1">المدينة:</span><span className="font-medium">الرياض</span></div>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div>
                <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                  <span className="text-[#c9a84c]">📅</span><span>مواعيد الرحلة</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                  <div><span className="text-gray-400 block mb-1">تاريخ البداية:</span><span className="font-medium">10-3-2020</span></div>
                  <div><span className="text-gray-400 block mb-1">تاريخ النهاية:</span><span className="font-medium">10-3-2020</span></div>
                  <div><span className="text-gray-400 block mb-1">ايام التشغيل:</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {["السبت", "الاحد", "الاثنين", "الثلاثاء", "الاربعاء"].map((day, idx) => (
                        <span key={idx} className="border border-gray-200 text-gray-500 text-[10px] px-2 py-0.5 rounded-md bg-white shadow-sm">{day}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-white border border-gray-200 rounded-[1.2rem] p-5 shadow-sm text-right">
                  <h4 className="font-bold text-gray-800 text-sm mb-4 border-b border-gray-100 pb-2">معلومات السائق</h4>
                  <div className="space-y-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1"><span className="text-gray-400">👤 الاسم:</span><span className="font-medium">احمد علي</span></div>
                    <div className="flex items-center gap-1"><span className="text-gray-400">📞 الهاتف:</span><span className="font-medium" dir="ltr">0544222333</span></div>
                  </div>
                  <button className="w-full border border-gray-200 text-gray-500 rounded-xl py-2 text-xs font-semibold hover:bg-gray-50 transition-colors">عرض الملف الشخصي</button>
                </div>
                <div className="bg-white border border-gray-200 rounded-[1.2rem] p-5 shadow-sm text-right">
                  <h4 className="font-bold text-gray-800 text-sm mb-4 border-b border-gray-100 pb-2">معلومات العميل</h4>
                  <div className="space-y-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1"><span className="text-gray-400">👤 الاسم:</span><span className="font-medium">احمد علي</span></div>
                    <div className="flex items-center gap-1"><span className="text-gray-400">📞 الهاتف:</span><span className="font-medium" dir="ltr">0544222333</span></div>
                  </div>
                  <button className="w-full border border-gray-200 text-gray-500 rounded-xl py-2 text-xs font-semibold hover:bg-gray-50 transition-colors">عرض الملف الشخصي</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== Financial Tab ===== */}
          {activeTab === "financial" && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between flex-wrap gap-4 pb-2">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                  <span className="text-[#c9a84c] text-lg font-serif">$</span> التفاصيل المالية
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowRefundModal(true)} className="flex items-center gap-1.5 bg-white border border-gray-300 text-gray-600 text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-gray-50 shadow-sm">
                    <RefreshIcon /> معالجة إسترداد
                  </button>
                  <button onClick={() => setShowPaymentModal(true)} className="flex items-center gap-1.5 bg-[#4a4746] text-white text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-[#383534] shadow-sm">
                    <PlusIcon /> اضافة دفعه
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#eef4ff] border border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-blue-500 text-xs font-bold mb-2">إجمالي سعر الرحلة</span>
                  <span className="text-blue-600 text-xl font-bold">1200 ريال</span>
                </div>
                <div className="bg-[#ecfdf5] border border-green-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-green-500 text-xs font-bold mb-2">المبلغ المدفوع</span>
                  <span className="text-green-600 text-xl font-bold">800 ريال</span>
                </div>
                <div className="bg-[#fef2f2] border border-red-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-red-500 text-xs font-bold mb-2">الرصيد المستحق</span>
                  <span className="text-red-600 text-xl font-bold">400 ريال</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                
                {/* Payment Card 1 */}
                <div className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-bold text-gray-800 text-sm">1500 ر.س</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">2025-2-1</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
                       <ImageIcon /> عرض الإثبات
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                      <span className="text-[11px] text-gray-500 w-16">الدافع:</span>
                      <span className="border border-gray-200 text-gray-600 bg-white text-[10px] px-4 py-1 rounded-md shadow-sm">السائق</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                      <TransferArrowIcon />
                      <span className="text-[11px] text-gray-600 font-medium">حساب السائق - البنك الاهلي  ←  حساب الشركة الراجحي</span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                      <span className="text-[11px] text-gray-500">طريقة التحويل:</span>
                      <span className="text-[11px] font-bold text-gray-700">تحويل بنكي</span>
                    </div>

                    <div className="bg-[#fffcf5] border border-amber-200 rounded-xl p-3.5">
                      <div className="text-[11px] font-bold text-amber-700 mb-1">ملاحظة:</div>
                      <div className="text-[11px] text-amber-600 font-medium">دفعة مقدمة للرحلة</div>
                    </div>
                  </div>
                </div>

                {/* Payment Card 2 */}
                <div className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-bold text-gray-800 text-sm">500 ر.س</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">2025-2-23</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
                       <ImageIcon /> عرض الإثبات
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                      <span className="text-[11px] text-gray-500 w-16">الدافع:</span>
                      <span className="border border-gray-200 text-gray-600 bg-white text-[10px] px-4 py-1 rounded-md shadow-sm">السائق</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                      <TransferArrowIcon />
                      <span className="text-[11px] text-gray-600 font-medium">حساب السائق - البنك الاهلي  ←  حساب الشركة الراجحي</span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                      <span className="text-[11px] text-gray-500">طريقة التحويل:</span>
                      <span className="text-[11px] font-bold text-gray-700">تحويل بنكي</span>
                    </div>

                    <div className="bg-[#fffcf5] border border-amber-200 rounded-xl p-3.5">
                      <div className="text-[11px] text-amber-600 font-medium leading-relaxed">
                        استخدمت العمولة لرحلة اخري<br/>
                        رحلة #54 :رحلة جماعية _حي الملقي الي مطار الملك خالد
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* ===== استدعاء البوب أبز (Modals) ===== */}
      <AddNoteModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleAddNote} />
      <RefundModal isOpen={showRefundModal} onClose={() => setShowRefundModal(false)} />
      <ChangeStatusModal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} />
      <AddPaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
      <EditTripDataModal isOpen={showEditTripModal} onClose={() => setShowEditTripModal(false)} />
    </div>
  );
}