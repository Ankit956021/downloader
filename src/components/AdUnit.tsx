"use client";

import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  format: 'banner' | 'rectangle';
  className?: string;
  // In real AdSense, you create "Ad Units" in the dashboard and get a "slot ID"
  // We will use placeholders here.
  slotId?: string;
}

export function AdUnit({ format, className = '', slotId = "1234567890" }: AdUnitProps) {
  const isBanner = format === 'banner';
  const width = isBanner ? '728px' : '300px';
  const height = isBanner ? '90px' : '250px';
  const adInit = useRef(false);

  useEffect(() => {
    // Prevent double init in React Strict Mode
    if (adInit.current) return;
    adInit.current = true;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error", err);
    }
  }, []);

  return (
    <div
      className={`ad-container ${className}`}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        overflow: 'hidden'
      }}
    >
      {/* Placeholder styling for logic ONLY if adblock is on or script fails, 
            normally AdSense fills this */}
      <div style={{ width, height, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ins className="adsbygoogle"
          style={{ display: 'block', width, height }}
          data-ad-client="ca-pub-0000000000000000" // REPLACE THIS too
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
}
