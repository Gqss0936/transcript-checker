// src/types/index.ts
export interface Course {
  code: string;        // รหัสวิชา เช่น "261207"
  name: string;        // ชื่อวิชา
  credits: number;     // หน่วยกิต
  grade: string;       // เกรด เช่น "A", "B+"
  category: string;    // หมวดหมู่ เช่น "วิชาเอกบังคับ"
}

export interface CreditSummary {
  totalCredits: number;
  requiredCredits: number;
  remaining: number;
  categories: {
    [key: string]: {
      earned: number;
      required: number;
    };
  };
}

export interface ParsedTranscript {
  studentId: string;
  studentName: string;
  courses: Course[];
  summary: CreditSummary;
}
