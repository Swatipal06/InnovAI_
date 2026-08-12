'use client';

import React from 'react';

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blob 1: warm golden-amber (top left) */}
      <div className="blob-amber" />
      {/* Blob 2: deep violet (center) */}
      <div className="blob-violet" />
      {/* Blob 3: rose-pink (bottom right) */}
      <div className="blob-rose" />
    </div>
  );
}
