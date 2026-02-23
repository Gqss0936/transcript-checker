import { useState } from "react";

// ── Types ───────────────────────────────────────────────────────
interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  category: string;
}

interface CategoryStats {
  name: string;
  completed: number;
  required: number;
  status: "complete" | "in-progress" | "not-started";
}

interface MissingGroup {
  groupName: string;
  items: string[];
}

interface TranscriptResult {
  totalCredits: number;
  requiredCredits: number;
  gpa: number;
  categories: CategoryStats[];
  completedCourses: Course[];
  recommendations: string[];
  missingRequirements?: MissingGroup[];
}

// ── Mock Data ───────────────────────────────────────────────────
const mockResult: TranscriptResult = {
  totalCredits: 85,
  requiredCredits: 133,
  gpa: 3.25,
  categories: [
    { name: "General Education", completed: 30, required: 30, status: "complete" },
    { name: "Major Core", completed: 45, required: 54, status: "in-progress" },
    { name: "Major Elective", completed: 10, required: 49, status: "not-started" },
  ],
  completedCourses: [
    { code: "388-100", name: "HEALTH FOR ALL", credits: 1, grade: "G", category: "General Education" },
    { code: "950-102", name: "HAPPY AND PEACEFUL LIFE", credits: 3, grade: "A", category: "General Education" },
    { code: "315-100", name: "THE ART OF COMPUTING", credits: 2, grade: "A", category: "General Education" },
    { code: "315-104", name: "DIGITAL TECHNOLOGY LITERACY", credits: 2, grade: "A", category: "General Education" },
    { code: "890-102", name: "EVERYDAY ENGLISH", credits: 2, grade: "B", category: "General Education" },
    { code: "895-001", name: "GOOD CITIZENS", credits: 2, grade: "A", category: "General Education" },
    { code: "193-031", name: "NATURAL THERAPY", credits: 2, grade: "A", category: "General Education" },
    { code: "315-201", name: "LIFE IN THE FUTURE", credits: 2, grade: "A", category: "General Education" },
    { code: "315-202", name: "THINKING AND REASONING", credits: 2, grade: "A", category: "General Education" },
    { code: "890-103", name: "ENGLISH ON THE GO", credits: 2, grade: "A", category: "General Education" },
    { code: "322-101", name: "CALCULUS I", credits: 3, grade: "D", category: "Major Core" },
    { code: "324-101", name: "GENERAL CHEMISTRY I", credits: 3, grade: "C+", category: "Major Core" },
    { code: "325-101", name: "GENERAL CHEMISTRY LAB I", credits: 1, grade: "A", category: "Major Core" },
    { code: "330-101", name: "PRINCIPLES OF BIOLOGY I", credits: 3, grade: "C", category: "Major Core" },
    { code: "331-101", name: "PRINCIPLES OF BIOLOGY LAB I", credits: 1, grade: "C+", category: "Major Core" },
    { code: "332-101", name: "FUNDAMENTAL PHYSICS", credits: 3, grade: "D", category: "Major Core" },
    { code: "333-101", name: "FUNDAMENTAL PHYSICS LABORATORY", credits: 1, grade: "B", category: "Major Core" },
    { code: "344-111", name: "MO:PROGRAM CON & ALGORITHMS", credits: 6, grade: "C", category: "Major Core" },
    { code: "344-181", name: "COMMU SKILL IN TECHNOLOGY", credits: 1, grade: "A", category: "Major Core" },
    { code: "322-102", name: "CALCULUS II", credits: 3, grade: "C+", category: "Major Core" },
    { code: "344-201", name: "MODULE: COMP FOR COMP SCIENCE", credits: 6, grade: "C+", category: "Major Core" },
    { code: "344-221", name: "COMPUTER ARCHITEC & ORGANIZ", credits: 2, grade: "C", category: "Major Core" },
    { code: "344-222", name: "OPERATING SYSTEMS", credits: 2, grade: "D+", category: "Major Core" },
    { code: "344-496", name: "SP(CYBER FORENSICS) (Topic 1)", credits: 3, grade: "A", category: "Major Core" },
    { code: "145-101", name: "COMPANION ANIMALS", credits: 3, grade: "A", category: "Major Elective" },
    { code: "322-102", name: "CALCULUS II", credits: 3, grade: "W", category: "Major Elective" },
    { code: "895-012", name: "POSITIVE THINKING", credits: 2, grade: "B", category: "Major Elective" },
    { code: "315-205", name: "SCI ENTREPRENEUR PITCHING", credits: 2, grade: "B", category: "Major Elective" },
    { code: "473-001", name: "FINANCE LITE FOR A BETTER LIFE", credits: 2, grade: "A", category: "Major Elective" },
  ],
  recommendations: [],
  missingRequirements: [
    {
      groupName: "General Education",
      items: [
        "003-001 - Volunteer Leader for Sustainable Community Development",
        "460-001 - Idea to Entrepreneurship",
        "315-102 - The Aesthetic in Photography",
        "895-881 - Fat to Fit",
      ],
    },
    {
      groupName: "Core Courses",
      items: [
        "344-233 - MODULE: Information Systems Analysis and Design and Principles of Database Systems",
        "344-211 - Introduction to Object-Oriented Programming",
        "344-243 - Software Interactive Design",
        "344-223 - Fundamentals of Computer Security",
        "344-281 - Public Speaking in Computer Science",
        "344-341 - Software Engineering",
        "344-351 - Data Communications and Networking",
        "344-361 - Principles of Artificial Intelligence",
        "344-381 - Thinking and Creativity for Innovation Design",
        "344-382 - Ethics for Digital Technology",
        "344-491 - Seminar in Computer Science",
      ],
    },
    {
      groupName: "Capstone",
      items: [
        "Choose 1: 344-492 (Projects in Computer Science) OR 344-495 (Cooperative Education)",
      ],
    },
    {
      groupName: "Major Electives",
      items: [
        "Required: 2 Clusters, Completed: 0. Please complete all courses within at least 2 clusters.",
      ],
    },
  ],
};

// ── Helpers ─────────────────────────────────────────────────────
function statusLabel(status: CategoryStats["status"]) {
  if (status === "complete") return { text: "COMPLETE", cls: "bg-green-100 text-green-700" };
  if (status === "in-progress") return { text: "IN PROGRESS", cls: "bg-blue-100 text-blue-600" };
  return { text: "NOT STARTED", cls: "bg-slate-100 text-slate-500" };
}

function progressBarColor(status: CategoryStats["status"]) {
  if (status === "complete") return "bg-green-500";
  if (status === "in-progress") return "bg-blue-500";
  return "bg-slate-300";
}

function gradeCircleColor(grade: string) {
  const map: Record<string, string> = {
    A: "bg-blue-600 text-white",
    "B+": "bg-blue-500 text-white",
    B: "bg-blue-400 text-white",
    "C+": "bg-slate-500 text-white",
    C: "bg-slate-400 text-white",
    "D+": "bg-orange-400 text-white",
    D: "bg-orange-500 text-white",
    W: "bg-red-400 text-white",
    G: "bg-green-500 text-white",
  };
  return map[grade] ?? "bg-slate-300 text-slate-700";
}

// ── Main Component ──────────────────────────────────────────────
export default function ResultDisplay() {
  const result = mockResult;
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggle = (name: string) =>
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));

  const getCourses = (cat: string) =>
    result.completedCourses.filter((c) => c.category === cat);

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── TOTAL PROGRESS ── */}
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

          {/* 3 Category Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {result.categories.map((cat) => {
              const pct = Math.min((cat.completed / cat.required) * 100, 100);
              const { text, cls } = statusLabel(cat.status);
              return (
                <div
                  key={cat.name}
                  className={`rounded-lg border p-4 ${
                    cat.status === "complete"
                      ? "border-green-200"
                      : cat.status === "in-progress"
                      ? "border-blue-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
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

        {/* ── COURSE DETAILS ── */}
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
                  {/* Accordion Header */}
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
                        <div className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${progressBarColor(cat.status)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>

                  {/* Accordion Body */}
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
                                {/* Grade circle */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${gradeCircleColor(course.grade)}`}>
                                  {course.grade}
                                </div>
                                {/* Credits */}
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

        {/* ── MISSING REQUIREMENTS ── */}
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
    </div>
  );
}
