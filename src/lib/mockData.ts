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

export interface MissingGroup {
  groupName: string;
  items: string[];
}

export interface TranscriptResult {
  totalCredits: number;
  requiredCredits: number;
  gpa: number;
  categories: CategoryStats[];
  completedCourses: Course[];
  recommendations: string[];
  missingRequirements?: MissingGroup[];
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
      status: 'complete',
    },
    {
      name: 'Major Core',
      completed: 45,
      required: 54,
      status: 'in-progress',
    },
    {
      name: 'Major Elective',
      completed: 10,
      required: 49,
      status: 'not-started',
    },
  ],
  completedCourses: [
    // General Education
    { code: '388-100', name: 'HEALTH FOR ALL',                      credits: 1, grade: 'G',  category: 'General Education' },
    { code: '950-102', name: 'HAPPY AND PEACEFUL LIFE',             credits: 3, grade: 'A',  category: 'General Education' },
    { code: '315-100', name: 'THE ART OF COMPUTING',                credits: 2, grade: 'A',  category: 'General Education' },
    { code: '315-104', name: 'DIGITAL TECHNOLOGY LITERACY',         credits: 2, grade: 'A',  category: 'General Education' },
    { code: '890-102', name: 'EVERYDAY ENGLISH',                    credits: 2, grade: 'B',  category: 'General Education' },
    { code: '895-001', name: 'GOOD CITIZENS',                       credits: 2, grade: 'A',  category: 'General Education' },
    { code: '193-031', name: 'NATURAL THERAPY',                     credits: 2, grade: 'A',  category: 'General Education' },
    { code: '315-201', name: 'LIFE IN THE FUTURE',                  credits: 2, grade: 'A',  category: 'General Education' },
    { code: '315-202', name: 'THINKING AND REASONING',              credits: 2, grade: 'A',  category: 'General Education' },
    { code: '890-103', name: 'ENGLISH ON THE GO',                   credits: 2, grade: 'A',  category: 'General Education' },
    // Major Core
    { code: '322-101', name: 'CALCULUS I',                          credits: 3, grade: 'D',  category: 'Major Core' },
    { code: '324-101', name: 'GENERAL CHEMISTRY I',                 credits: 3, grade: 'C+', category: 'Major Core' },
    { code: '325-101', name: 'GENERAL CHEMISTRY LAB I',             credits: 1, grade: 'A',  category: 'Major Core' },
    { code: '330-101', name: 'PRINCIPLES OF BIOLOGY I',             credits: 3, grade: 'C',  category: 'Major Core' },
    { code: '331-101', name: 'PRINCIPLES OF BIOLOGY LAB I',         credits: 1, grade: 'C+', category: 'Major Core' },
    { code: '332-101', name: 'FUNDAMENTAL PHYSICS',                 credits: 3, grade: 'D',  category: 'Major Core' },
    { code: '333-101', name: 'FUNDAMENTAL PHYSICS LABORATORY',      credits: 1, grade: 'B',  category: 'Major Core' },
    { code: '344-111', name: 'MO:PROGRAM CON & ALGORITHMS',         credits: 6, grade: 'C',  category: 'Major Core' },
    { code: '344-181', name: 'COMMU SKILL IN TECHNOLOGY',           credits: 1, grade: 'A',  category: 'Major Core' },
    { code: '322-102', name: 'CALCULUS II',                         credits: 3, grade: 'C+', category: 'Major Core' },
    { code: '344-201', name: 'MODULE: COMP FOR COMP SCIENCE',       credits: 6, grade: 'C+', category: 'Major Core' },
    { code: '344-221', name: 'COMPUTER ARCHITEC & ORGANIZ',         credits: 2, grade: 'C',  category: 'Major Core' },
    { code: '344-222', name: 'OPERATING SYSTEMS',                   credits: 2, grade: 'D+', category: 'Major Core' },
    { code: '344-496', name: 'SP(CYBER FORENSICS) (Topic 1)',       credits: 3, grade: 'A',  category: 'Major Core' },
    // Major Elective
    { code: '145-101', name: 'COMPANION ANIMALS',                   credits: 3, grade: 'A',  category: 'Major Elective' },
    { code: '322-102', name: 'CALCULUS II',                         credits: 3, grade: 'W',  category: 'Major Elective' },
    { code: '895-012', name: 'POSITIVE THINKING',                   credits: 2, grade: 'B',  category: 'Major Elective' },
    { code: '315-205', name: 'SCI ENTREPRENEUR PITCHING',           credits: 2, grade: 'B',  category: 'Major Elective' },
    { code: '473-001', name: 'FINANCE LITE FOR A BETTER LIFE',      credits: 2, grade: 'A',  category: 'Major Elective' },
  ],
  recommendations: [],
  missingRequirements: [
    {
      groupName: 'General Education',
      items: [
        '003-001 - Volunteer Leader for Sustainable Community Development',
        '460-001 - Idea to Entrepreneurship',
        '315-102 - The Aesthetic in Photography',
        '895-881 - Fat to Fit',
      ],
    },
    {
      groupName: 'Core Courses',
      items: [
        '344-233 - MODULE: Information Systems Analysis and Design and Principles of Database Systems',
        '344-211 - Introduction to Object-Oriented Programming',
        '344-243 - Software Interactive Design',
        '344-223 - Fundamentals of Computer Security',
        '344-281 - Public Speaking in Computer Science',
        '344-341 - Software Engineering',
        '344-351 - Data Communications and Networking',
        '344-361 - Principles of Artificial Intelligence',
        '344-381 - Thinking and Creativity for Innovation Design',
        '344-382 - Ethics for Digital Technology',
        '344-491 - Seminar in Computer Science',
      ],
    },
    {
      groupName: 'Capstone',
      items: [
        'Choose 1: 344-492 (Projects in Computer Science) OR 344-495 (Cooperative Education)',
      ],
    },
    {
      groupName: 'Major Electives',
      items: [
        'Required: 2 Clusters, Completed: 0. Please complete all courses within at least 2 clusters.',
      ],
    },
  ],
};
