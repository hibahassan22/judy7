import { useState } from "react";

// ======= Mock Data =======
const activities = [
  {
    id: 1, title: "إنشاء رحلة #35", employee: "عبدالله سعيد",
    description: "تم إنشاء رحلة جديدة من الرياض إلى جدة",
    type: "إنشاء", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 2, title: "دفعة جديدة", employee: "عبدالله سعيد",
    description: "تم استلام دفعة بمبلغ 1500 ريال",
    type: "دفعة", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 3, title: "تعديل رحلة #35", employee: "عبدالله سعيد",
    description: "تم تعديل تاريخ الرحلة من 15 فبراير إلى 18 فبراير",
    type: "تعديل", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 4, title: "شكوى", employee: "عبدالله سعيد",
    description: "تم تسجيل شكوى: تأخر السائق عن الموعد",
    type: "شكوى", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 5, title: "إنشاء رحلة #35", employee: "عبدالله سعيد",
    description: "تم إنشاء رحلة جديدة من الرياض إلى جدة",
    type: "إنشاء", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 6, title: "إنشاء رحلة #35", employee: "عبدالله سعيد",
    description: "تم إنشاء رحلة جديدة من الرياض إلى جدة",
    type: "إنشاء", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 7, title: "إنشاء رحلة #35", employee: "عبدالله سعيد",
    description: "تم إنشاء رحلة جديدة من الرياض إلى جدة",
    type: "إنشاء", date: "28-2-2026", time: "10:30 ص",
  },
  {
    id: 8, title: "إنشاء رحلة #35", employee: "عبدالله سعيد",
    description: "تم إنشاء رحلة جديدة من الرياض إلى جدة",
    type: "إنشاء", date: "28-2-2026", time: "10:30 ص",
  },
];

const roles = ["جميع الأدوار", "مدير النظام", "خدمة عملاء", "المشرف"];
const activityTypes = ["جميع الأنشطة", "إنشاء", "تعديل", "دفعة", "شكوى"];

// أيقونة ولون كل نوع نشاط
const typeConfig = {
  "إنشاء":  { bg: "bg-blue-50",   icon: "text-blue-500",   d: "M12 4v16m8-8H4" },
  "دفعة":   { bg: "bg-green-50",  icon: "text-green-500",  d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  "تعديل":  { bg: "bg-purple-50", icon: "text-purple-500", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  "شكوى":   { bg: "bg-red-50",    icon: "text-red-400",    d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
};

export default function ActivityLogPage() {
  const [roleFilter, setRoleFilter] = useState("جميع الأدوار");
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("جميع الأنشطة");

  const filtered = activities.filter((a) => {
    const matchType = typeFilter === "جميع الأنشطة" || a.type === typeFilter;
    const matchName = a.employee.includes(nameFilter);
    return matchType && matchName;
  });

  return (
    <div className="w-full space-y-5" dir="rtl">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[#c9a84c]">سجل النشاطات</h1>
        <p className="text-xs text-gray-400 mt-0.5">تتبع جميع العمليات والتغييرات التي تمت على النظام</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">

        {/* Row 1: فلتر الدور + فلتر الاسم */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">فلتر حسب الدور</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-500"
            >
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">فلتر حسب الاسم</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="ابحث هنا ...."
                className="bg-transparent text-sm outline-none w-full placeholder-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Row 2: فلتر نوع النشاط */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">نوع النشاط</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-500 w-full"
          >
            {activityTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Activity Cards */}
        <div className="space-y-3 pt-1">
          {filtered.map((activity) => {
            const config = typeConfig[activity.type] || typeConfig["إنشاء"];
            return (
              <div
                key={activity.id}
                className="border border-gray-100 rounded-xl p-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                  <svg className={`w-4 h-4 ${config.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.d} />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs text-gray-400 whitespace-nowrap">{activity.date}<br />{activity.time}</p>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">الموظف: {activity.employee}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-right mt-1">{activity.description}</p>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">لا توجد نشاطات</p>
          )}
        </div>
      </div>
    </div>
  );
}
