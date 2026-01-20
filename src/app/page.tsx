"use client";

import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ResultCard } from '@/components/ResultCard';
import { AdUnit } from '@/components/AdUnit';

// Mock data type same as in ResultCard
interface VideoInfo {
    title: string;
    thumbnail: string;
    duration: string;
    author: string;
    videoFormats: { quality: string; size?: string; url?: string }[];
    audioFormats: { quality: string; size?: string; url?: string }[];
}

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VideoInfo | null>(null);

    const handleProcess = async (url: string) => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/resolve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <Hero onProcessLink={handleProcess} isLoading={loading} />

            {result && (
                <div id="results">
                    <ResultCard info={result} />
                    <AdUnit format="rectangle" className="mt-8" />
                </div>
            )}

            {!result && (
                // SEO Content / Filler for landing page
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '2rem',
                    textAlign: 'center',
                    opacity: 0.5
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Supported Platforms</h3>
                    <p>YouTube • Instagram • TikTok • Twitter • Facebook</p>
                </div>
            )}
        </div>
    );
}
