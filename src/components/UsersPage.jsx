import { useState } from "react";

const ROLES = ["مدير النظام", "خدمة عملاء", "المشرف", "محاسب"];

const initialUsers = [
  { id: 1, name: "عبدالله سالم",  role: "مدير النظام", status: "نشط",    created: "1-2-2026" },
  { id: 2, name: "ام سلمى",       role: "خدمة عملاء", status: "نشط",    created: "1-2-2026" },
  { id: 3, name: "محمد خالد",     role: "خدمة عملاء", status: "معطل",   created: "1-2-2026" },
  { id: 4, name: "محمود عبدو",    role: "خدمة عملاء", status: "نشط",    created: "1-2-2026" },
  { id: 5, name: "ساره علي",      role: "المشرف",     status: "معطل",   created: "1-2-2026" },
];

// ── Field helpers (defined outside to avoid remount) ─────────
const FormInput = ({ value, onChange, placeholder, type="text" }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder}
    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#c9a84c] focus:outline-none bg-white text-right placeholder-gray-300"/>
);

const FormSelect = ({ value, onChange, children }) => (
  <div className="relative">
    <select value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#c9a84c] focus:outline-none bg-white text-right appearance-none">
      {children}
    </select>
    <div className="absolute left-3 top-3 pointer-events-none text-gray-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
);

// ── Delete Confirm Modal ──────────────────────────────────────
const DeleteModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 text-center space-y-5">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">تأكيد الحذف</h3>
          <p className="text-sm text-gray-500">هل أنت متأكد من حذف المستخدم <span className="font-bold text-gray-800">{name}</span>؟</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm">إلغاء</button>
          <button onClick={onConfirm} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm">حذف</button>
        </div>
      </div>
    </div>
  );
};

// ── Permissions Modal ─────────────────────────────────────────
const PermissionsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;
  const perms = ["إدارة السائقين","إدارة العملاء","إدارة الرحلات","إدارة المكافآت","الدعم الفني","إدارة الإشعارات","سجل النشاطات","الإعدادات"];
  const [checked, setChecked] = useState(perms.slice(0,4));
  const toggle = (p) => setChecked(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <h3 className="text-base font-bold text-gray-800">صلاحيات {user.name}</h3>
        </div>
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {perms.map(p=>(
            <label key={p} className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
              <button onClick={()=>toggle(p)}
                className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${checked.includes(p)?"bg-[#c9a84c]":"bg-gray-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${checked.includes(p)?"translate-x-5":"translate-x-0"}`}/>
              </button>
              <span className="text-sm text-gray-700 font-medium">{p}</span>
            </label>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={onClose} className="w-full bg-[#4a4644] text-white font-bold py-3 rounded-xl text-sm hover:bg-black transition-colors">
            حفظ الصلاحيات
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Edit User Modal ───────────────────────────────────────────
const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName]     = useState("");
  const [role, setRole]     = useState(ROLES[0]);
  const [status, setStatus] = useState("نشط");

  useState(() => {
    if (user) { setName(user.name); setRole(user.role); setStatus(user.status); }
  }, [user]);

  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <h3 className="text-base font-bold text-gray-800">تعديل المستخدم</h3>
        </div>
        <div className="p-5 space-y-3">
          <div className="space-y-1.5"><label className="text-xs text-gray-500 block text-right">اسم المستخدم</label>
            <FormInput value={name} onChange={e=>setName(e.target.value)} placeholder="اسم المستخدم"/></div>
          <div className="space-y-1.5"><label className="text-xs text-gray-500 block text-right">الدور</label>
            <FormSelect value={role} onChange={e=>setRole(e.target.value)}>
              {ROLES.map(r=><option key={r}>{r}</option>)}
            </FormSelect></div>
          <div className="space-y-1.5"><label className="text-xs text-gray-500 block text-right">الحالة</label>
            <FormSelect value={status} onChange={e=>setStatus(e.target.value)}>
              <option>نشط</option><option>معطل</option>
            </FormSelect></div>
          <button onClick={()=>{ onSave({...user,name,role,status}); onClose(); }}
            className="w-full bg-[#4a4644] text-white font-bold py-3 rounded-xl text-sm hover:bg-black transition-colors mt-2">
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
export default function UsersPage() {
  const [users, setUsers]           = useState(initialUsers);
  const [newName, setNewName]       = useState("");
  const [newPass, setNewPass]       = useState("");
  const [newRole, setNewRole]       = useState(ROLES[0]);
  const [filterRole, setFilterRole] = useState("جميع الأدوار");
  const [filterName, setFilterName] = useState("");
  const [deleteModal, setDeleteModal]   = useState({ open:false, id:null, name:"" });
  const [permModal, setPermModal]       = useState({ open:false, user:null });
  const [editModal, setEditModal]       = useState({ open:false, user:null });

  const addUser = () => {
    if (!newName) return;
    setUsers(prev => [...prev, { id: Date.now(), name:newName, role:newRole, status:"نشط", created: new Date().toLocaleDateString("ar-EG") }]);
    setNewName(""); setNewPass(""); setNewRole(ROLES[0]);
  };

  const deleteUser = () => {
    setUsers(prev => prev.filter(u => u.id !== deleteModal.id));
    setDeleteModal({ open:false, id:null, name:"" });
  };

  const saveEdit = (updated) => {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const filtered = users.filter(u =>
    (filterRole === "جميع الأدوار" || u.role === filterRole) &&
    (u.name.includes(filterName) || filterName === "")
  );

  return (
    <div className="w-full space-y-4 p-4" dir="rtl">

      {/* Header */}
      <div className="bg-white rounded-xl px-5 py-3 border border-gray-200/60 shadow-sm text-right">
        <h1 className="text-xl font-bold text-[#c9a84c]">المستخدمين</h1>
        <p className="text-xs text-gray-400 mt-0.5">إدارة مستخدمي لوحة التحكم</p>
      </div>

      {/* Create user form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-end gap-2 mb-1">
          <h2 className="text-sm font-bold text-gray-800">إنشاء مستخدم جديد</h2>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#9C6402,#E6C76A)"}}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 block text-right">كلمة المرور</label>
            <FormInput value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="ادخل كلمة المرور" type="password"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 block text-right">اسم المستخدم</label>
            <FormInput value={newName} onChange={e=>setNewName(e.target.value)} placeholder="ادخل اسم المستخدم"/>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 block text-right">الدور</label>
          <FormSelect value={newRole} onChange={e=>setNewRole(e.target.value)}>
            {ROLES.map(r=><option key={r}>{r}</option>)}
          </FormSelect>
        </div>
        <div className="flex justify-end">
          <button onClick={addUser}
            className="flex items-center gap-1.5 bg-[#4a4644] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            حفظ
          </button>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2 w-64">
            <div className="relative flex-1">
              <input value={filterName} onChange={e=>setFilterName(e.target.value)}
                placeholder="ابحث هنا...."
                className="w-full border border-gray-200 rounded-xl pl-3 pr-9 py-2 text-xs focus:outline-none text-right placeholder-gray-300"/>
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div className="relative">
              <select value={filterRole} onChange={e=>setFilterRole(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none bg-white text-right appearance-none pr-7">
                <option>جميع الأدوار</option>
                {ROLES.map(r=><option key={r}>{r}</option>)}
              </select>
              <div className="absolute left-2 top-2.5 pointer-events-none text-gray-400"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <h3 className="text-sm font-bold text-gray-800">سجل المستخدمين</h3>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#9C6402,#E6C76A)"}}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-[#f9f6f0] border-b border-gray-100">
                {["الأسم","الدور","الحالة","تاريخ الإنشاء","إجراءات"].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{u.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{u.role}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${u.status==="نشط" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{u.created}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 justify-start">
                      {/* تعديل */}
                      <button onClick={()=>setEditModal({open:true,user:u})}
                        className="flex items-center gap-1 text-[11px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        تعديل
                      </button>
                      {/* حذف */}
                      <button onClick={()=>setDeleteModal({open:true,id:u.id,name:u.name})}
                        className="flex items-center gap-1 text-[11px] text-red-500 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        حذف
                      </button>
                      {/* استثناء صلاحيات */}
                      <button onClick={()=>setPermModal({open:true,user:u})}
                        className="flex items-center gap-1 text-[11px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        استثناء صلاحيات
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal isOpen={deleteModal.open} name={deleteModal.name}
        onClose={()=>setDeleteModal({open:false,id:null,name:""})} onConfirm={deleteUser}/>
      <PermissionsModal isOpen={permModal.open} user={permModal.user}
        onClose={()=>setPermModal({open:false,user:null})}/>
      <EditUserModal isOpen={editModal.open} user={editModal.user}
        onClose={()=>setEditModal({open:false,user:null})} onSave={saveEdit}/>
    </div>
  );
}
