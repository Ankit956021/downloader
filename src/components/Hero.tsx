"use client";

import React, { useState } from 'react';
import { ArrowRight, Link, Loader2 } from 'lucide-react';
import { AdUnit } from './AdUnit';

interface HeroProps {
    onProcessLink: (url: string) => void;
    isLoading: boolean;
}

export function Hero({ onProcessLink, isLoading }: HeroProps) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onProcessLink(url);
        }
    };

    return (
        <section style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative'
        }}>

            {/* Decorative Glows */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'var(--primary-glow)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                top: '20%',
                left: '20%',
                zIndex: -1,
                opacity: 0.5
            }} />
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'var(--secondary-glow)',
                filter: 'blur(120px)',
                borderRadius: '50%',
                bottom: '10%',
                right: '10%',
                zIndex: -1,
                opacity: 0.4
            }} />

            <h1 style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
                Download Anything.<br />
                <span style={{ fontSize: '0.6em', opacity: 0.8, fontWeight: 400 }}>Audio & Video from web links.</span>
            </h1>

            <p style={{
                maxWidth: '600px',
                marginBottom: '3rem',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6
            }}>
                Paste a link from YouTube, Instagram, TikTok or Twitter to get high-quality video and audio files instantly.
            </p>

            <div className="glass-panel" style={{
                padding: '0.75rem',
                borderRadius: '16px',
                display: 'flex',
                width: '100%',
                maxWidth: '700px',
                gap: '0.75rem',
                transition: 'transform 0.3s ease',
            }}>
                <div style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Link size={20} style={{ position: 'absolute', left: '16px', color: 'rgba(255,255,255,0.4)' }} />
                    <input
                        type="text"
                        placeholder="Paste your link here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            width: '100%',
                            height: '56px',
                            background: 'rgba(0,0,0,0.2)',
                            border: 'none',
                            borderRadius: '12px',
                            paddingLeft: '48px',
                            paddingRight: '16px',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !url}
                    className="glass-button"
                    style={{
                        height: '56px',
                        padding: '0 2rem',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: isLoading ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: (!url && !isLoading) ? 0.7 : 1
                    }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                            Processing...
                        </>
                    ) : (
                        <>
                            Start
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </div>

            <div style={{ marginTop: '4rem', width: '100%' }}>
                <AdUnit format="banner" />
            </div>
        </section>
    );
}
