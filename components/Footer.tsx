'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-white/10 py-6 px-4 md:px-8 bg-[#0D0B1E]/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* Legal Disclaimer */}
        <p className="text-xs text-[#9A8EC0] max-w-3xl leading-relaxed">
          <span className="font-semibold text-rose-300">LEGAL DISCLAIMER:</span> InnovAI personas are AI-powered inspirational characters inspired by historical figures. They do not represent the actual views of these individuals or their estates.
        </p>

        {/* Copyright */}
        <div className="text-xs text-[#9A8EC0] whitespace-nowrap">
          &copy; {new Date().getFullYear()} InnovAI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
