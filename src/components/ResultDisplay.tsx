// src/components/ResultDisplay.tsx
'use client';

import { useState } from 'react';
import { TranscriptResult, CategoryStats } from '@/lib/mockData';

interface ResultDisplayProps {
  result: TranscriptResult;
  onReset: () => void;
}

function statusLabel(status: CategoryStats['status']) {
  if (status === 'complete')    return { text: 'COMPLETE',    cls: 'bg-green-100 text-green-700' };
  if (status === 'in-progress') return { text: 'IN PROGRESS', cls: 'bg-blue-100 text-blue-600' };
  return                               { text: 'NOT STARTED', cls: 'bg-slate-100 text-slate-500' };
}

function progressBarColor(status: CategoryStats['status']) {
  if (status === 'complete')    return 'bg-green-500';
  if (status === 'in-progress') return 'bg-blue-500';
  return 'bg-slate-300';
}

function gradeCircleColor(grade: string) {
  const map: Record<string, string> = {
    'A':  'bg-blue-600 text-white',
    'B+': 'bg-blue-500 text-white',
    'B':  'bg-blue-400 text-white',
    'C+': 'bg-slate-500 text-white',
    'C':  'bg-slate-400 text-white',
    'D+': 'bg-orange-400 text-white',
    'D':  'bg-orange-500 text-white',
    'W':  'bg-red-400 text-white',
    'G':  'bg-green-500 text-white',
  };
  return map[grade] ?? 'bg-slate-300 text-slate-700';
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggle = (name: string) =>
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));

  const getCourses = (cat: string) =>
    result.completedCourses.filter((c) => c.category === cat);

  const progressPercentage = Math.min(
    (result.totalCredits / result.requiredCredits) * 100,
    100
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Transcript Analysis</h1>
          <p className="text-sm text-slate-500 mt-1">Credit summary and graduation requirements</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-150"
        >
          Upload New
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-2">
          Total Progress
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-7xl font-black text-slate-900 leading-none">
            {result.totalCredits}
          </span>
          <span className="text-xl text-slate-500 font-light">credits earned</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {result.categories.map((cat) => {
            const pct = Math.min((cat.completed / cat.required) * 100, 100);
            const { text, cls } = statusLabel(cat.status);
            return (
              <div
                key={cat.name}
                className={`rounded-lg border p-4 ${
                  cat.status === 'complete'    ? 'border-green-200' :
                  cat.status === 'in-progress' ? 'border-blue-200'  :
                  'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                  <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cls}`}>
                    {text}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-slate-900">{cat.completed}</span>
                  <span className="text-slate-400 text-sm">/ {cat.required}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${progressBarColor(cat.status)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-right text-xs text-slate-400 mt-1">{pct.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-slate-900">Overall Progress</div>
          <div className="text-sm text-slate-500">
            {result.totalCredits} / {result.requiredCredits} credits
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 flex items-center gap-2 border-b border-slate-100">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-base font-semibold text-slate-900">Course Details</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {result.categories.map((cat) => {
            const pct = Math.min((cat.completed / cat.required) * 100, 100);
            const isOpen = openCategories[cat.name] ?? false;
            const courses = getCourses(cat.name);

            return (
              <div key={cat.name}>
                <button
                  onClick={() => toggle(cat.name)}
                  className="w-full px-6 py-4 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-sm text-left">{cat.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">Credits</div>
                        <div className="text-sm font-semibold text-slate-700">
                          {cat.completed} / {cat.required}
                        </div>
                      </div>
                      <div className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${progressBarColor(cat.status)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100">
                    {courses.length === 0 ? (
                      <div className="px-6 py-4 text-sm text-slate-400 italic">
                        ยังไม่มีรายวิชาที่เรียนสำเร็จ
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {courses.map((course, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-slate-400 font-medium mb-0.5">{course.code}</div>
                              <div className="text-sm font-semibold text-slate-800 truncate">{course.name}</div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${gradeCircleColor(course.grade)}`}>
                                {course.grade}
                              </div>
                              <div className="text-sm text-slate-500 w-10 text-right font-medium">
                                {course.credits} CR
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {result.missingRequirements && result.missingRequirements.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-base font-semibold text-red-700">Missing Requirements</h2>
          </div>
          <div className="px-6 py-4 space-y-5">
            {result.missingRequirements.map((group, gi) => (
              <div key={gi}>
                <div className="text-sm font-semibold text-slate-700 mb-2">{group.groupName}</div>
                <div className="space-y-1">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-start gap-2 py-1.5 border-b border-red-100 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
