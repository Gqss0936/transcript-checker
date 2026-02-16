"use client";

import FileUpload from "@/components/FileUpload";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          {/* Header */}
          <header className="mb-16 pb-12 border-b border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-medium">
                  Prince of Songkla University
                </div>
                <h1 className="text-5xl font-serif text-slate-900 mb-4">
                  CS Credit Checker
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                  ระบบตรวจสอบหน่วยกิตวิชาเอกวิทยาการคอมพิวเตอร์
                  <br />
                  สำหรับนักศึกษาคณะวิทยาศาสตร์
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Course</div>
                <div className="text-2xl font-light text-slate-900">CS 499</div>
              </div>
            </div>
          </header>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Instructions */}
            <div className="lg:col-span-1">
              <h2 className="text-sm uppercase tracking-wider text-slate-400 font-medium mb-6">
                Instructions
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-medium">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">
                        Upload Document
                      </div>
                      <div className="text-sm text-slate-600">
                        Official transcript in PDF or Excel format
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-medium">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">
                        Automated Analysis
                      </div>
                      <div className="text-sm text-slate-600">
                        System verifies credit requirements
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-medium">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">
                        Review Results
                      </div>
                      <div className="text-sm text-slate-600">
                        Detailed breakdown and recommendations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Upload Area */}
            <div className="lg:col-span-2">
              <FileUpload />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
