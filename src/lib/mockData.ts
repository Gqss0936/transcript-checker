// src/lib/mockData.ts

export interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  category: string;
}

export interface CategoryStats {
  name: string;
  completed: number;
  required: number;
  status: 'complete' | 'in-progress' | 'not-started';
}

export interface TranscriptResult {
  totalCredits: number;
  requiredCredits: number;
  gpa: number;
  categories: CategoryStats[];
  completedCourses: Course[];
  recommendations: string[];
}

// 🎯 Mock Data สำหรับทดสอบ
export const mockResult: TranscriptResult = {
  totalCredits: 85,
  requiredCredits: 133,
  gpa: 3.25,
  categories: [
    {
      name: 'General Education',
      completed: 30,
      required: 30,
      status: 'complete'
    },
    {
      name: 'Major Core',
      completed: 45,
      required: 54,
      status: 'in-progress'
    },
    {
      name: 'Major Elective',
      completed: 10,
      required: 49,
      status: 'not-started'
    }
  ],
  completedCourses: [
    { code: 'CS101', name: 'Introduction to Computer Science', credits: 3, grade: 'A', category: 'Major Core' },
    { code: 'CS102', name: 'Programming I', credits: 3, grade: 'B+', category: 'Major Core' },
    { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A', category: 'Major Core' },
    { code: 'CS202', name: 'Algorithms', credits: 3, grade: 'B+', category: 'Major Core' },
    { code: 'MATH101', name: 'Calculus I', credits: 3, grade: 'B', category: 'General Education' },
    { code: 'MATH102', name: 'Calculus II', credits: 3, grade: 'B+', category: 'General Education' },
    { code: 'ENG101', name: 'English I', credits: 3, grade: 'A', category: 'General Education' },
    { code: 'PHY101', name: 'Physics I', credits: 3, grade: 'B', category: 'General Education' },
  ],
  recommendations: [
    'ต้องเรียนวิชาเอกบังคับอีก 9 หน่วยกิต (3 วิชา)',
    'ต้องเรียนวิชาเอกเลือกอีก 39 หน่วยกิต (13 วิชา)',
    'แนะนำให้เรียน: CS301 (Database Systems), CS302 (Web Programming)',
    'ควรเรียนวิชาเอกเลือกที่สนใจ เช่น AI, Mobile Development, Security'
  ]
};
