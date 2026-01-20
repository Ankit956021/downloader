import React from 'react';
import { Download, Music, Video, Clock } from 'lucide-react';

interface VideoInfo {
    title: string;
    thumbnail: string;
    duration: string;
    author: string;
    videoFormats: { quality: string; size?: string; url?: string }[];
    audioFormats: { quality: string; size?: string; url?: string }[];
}

interface ResultCardProps {
    info: VideoInfo;
}

export function ResultCard({ info }: ResultCardProps) {
    return (
        <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 4rem auto',
            borderRadius: '24px',
            overflow: 'hidden',
            animation: 'fadeIn 0.5s ease-out'
        }}>

            <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{
                        width: '180px',
                        aspectRatio: '16/9',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: '#000',
                        position: 'relative'
                    }}>
                        <img
                            src={info.thumbnail}
                            alt={info.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Clock size={12} />
                            {info.duration}
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{info.title}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{info.author}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>

                    {/* Video Options */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
                            <Video size={18} />
                            <span style={{ fontWeight: 600 }}>Video</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {info.videoFormats.map((fmt, i) => (
                                <a key={i} href={fmt.url} className="glass-button" style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.9rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    textDecoration: 'none'
                                }}>
                                    <span>{fmt.quality}</span>
                                    <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{fmt.size}</span>
                                    <Download size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Audio Options */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                            <Music size={18} />
                            <span style={{ fontWeight: 600 }}>Audio</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {info.audioFormats.map((fmt, i) => (
                                <a key={i} href={fmt.url} className="glass-button" style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.9rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    textDecoration: 'none'
                                }}>
                                    <span>{fmt.quality}</span>
                                    <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{fmt.size}</span>
                                    <Download size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
