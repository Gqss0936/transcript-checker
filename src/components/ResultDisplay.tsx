// src/components/ResultDisplay.tsx
'use client';

import { TranscriptResult } from '@/lib/mockData';

interface ResultDisplayProps {
  result: TranscriptResult;
  onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const progressPercentage = (result.totalCredits / result.requiredCredits) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* ───────────────────────────────────────────────────────
          Header Section
      ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Transcript Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Credit summary and graduation requirements
          </p>
        </div>
        <button
          onClick={onReset}
          className="
            px-4 py-2 text-sm font-medium
            text-slate-700 bg-white
            border border-slate-300 rounded-lg
            hover:bg-slate-50 hover:border-slate-400
            transition-colors duration-150
          "
        >
          Upload New
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────
          Summary Cards
      ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Credits */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Total Credits
          </div>
          <div className="text-3xl font-semibold text-slate-900">
            {result.totalCredits}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            of {result.requiredCredits} required
          </div>
        </div>

        {/* GPA */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Cumulative GPA
          </div>
          <div className="text-3xl font-semibold text-slate-900">
            {result.gpa.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            out of 4.00
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Progress
          </div>
          <div className="text-3xl font-semibold text-slate-900">
            {progressPercentage.toFixed(0)}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {result.requiredCredits - result.totalCredits} credits remaining
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          Progress Bar
      ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-slate-900">
            Overall Progress
          </div>
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

      {/* ───────────────────────────────────────────────────────
          Category Breakdown
      ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Credit Distribution by Category
        </h2>
        
        <div className="space-y-4">
          {result.categories.map((category, index) => {
            const percentage = (category.completed / category.required) * 100;
            const remaining = category.required - category.completed;
            
            return (
              <div key={index} className="pb-4 last:pb-0 last:border-0 border-b border-slate-100">
                
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    <div className={`
                      w-2 h-2 rounded-full
                      ${category.status === 'complete' ? 'bg-slate-900' : 
                        category.status === 'in-progress' ? 'bg-slate-400' : 
                        'bg-slate-200'}
                    `} />
                    
                    <div>
                      <div className="font-medium text-slate-900">
                        {category.name}
                      </div>
                      {category.status === 'complete' ? (
                        <div className="text-xs text-slate-500 mt-0.5">
                          Completed
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 mt-0.5">
                          {remaining} credit{remaining !== 1 ? 's' : ''} remaining
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">
                      {category.completed} / {category.required}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ease-out ${
                      category.status === 'complete' ? 'bg-slate-900' :
                      category.status === 'in-progress' ? 'bg-slate-400' :
                      'bg-slate-200'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          Completed Courses Table
      ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Completed Courses
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {result.completedCourses.length} course{result.completedCourses.length !== 1 ? 's' : ''} completed
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {result.completedCourses.map((course, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-center">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                      {course.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          Recommendations
      ─────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recommendations
        </h2>
        
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
              <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
