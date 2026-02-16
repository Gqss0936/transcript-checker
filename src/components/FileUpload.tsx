// src/components/FileUpload.tsx
'use client';

import { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import { mockResult } from '@/lib/mockData';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showResult, setShowResult] = useState(false); // 🆕 State สำหรับแสดงผล

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('กรุณาเลือกไฟล์ PDF เท่านั้น');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert('กรุณาเลือกไฟล์ PDF เท่านั้น');
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleContinue = () => {
    if (file) {
      console.log('Processing file:', file.name);
      // 🎯 แสดงผลลัพธ์ (ใช้ mock data ก่อน)
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setFile(null);
    setShowResult(false);
  };

  // 🎯 ถ้าแสดงผลแล้ว → แสดง ResultDisplay
  if (showResult) {
    return <ResultDisplay result={mockResult} onReset={handleReset} />;
  }

  // 🎯 ถ้าไม่แสดงผล → แสดง Upload UI
  return (
    <div>
      {!file ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl
            transition-all duration-200 cursor-pointer
            ${isDragging 
              ? 'border-slate-900 bg-slate-50 scale-[1.02]' 
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center py-16 px-6 cursor-pointer"
          >
            <div className="mb-4 text-slate-400 transition-colors group-hover:text-slate-500">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <div className="text-center space-y-2">
              <div className="text-slate-900 font-medium text-lg">
                Upload Transcript
              </div>
              <div className="text-sm text-slate-500">
                Click to browse or drag and drop your PDF here
              </div>
              <div className="text-xs text-slate-400 pt-2">
                Maximum file size: 10MB
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {file.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB · PDF Document
              </div>
            </div>

            <button
              onClick={handleCancel}
              className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Remove file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="
                flex-1 px-4 py-2.5
                border border-slate-300 rounded-lg
                text-slate-700 text-sm font-medium
                hover:bg-slate-50 hover:border-slate-400
                active:bg-slate-100
                transition-all duration-150
              "
            >
              Cancel
            </button>
            
            <button
              onClick={handleContinue}
              className="
                flex-1 px-4 py-2.5
                bg-slate-900 rounded-lg
                text-white text-sm font-medium
                hover:bg-slate-800
                active:bg-slate-950
                transition-all duration-150
                shadow-sm hover:shadow
              "
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
