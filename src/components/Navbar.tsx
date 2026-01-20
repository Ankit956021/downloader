import React from 'react';
import { Download } from 'lucide-react';

export function Navbar() {
    return (
        <nav style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
            < Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
                        D
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Downloader
                    </span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                    <a href="#" style={{ transition: 'color 0.2s' }}>How it works</a>
                    <a href="#" style={{ transition: 'color 0.2s' }}>Supported Sites</a>
                </div>
        </nav>
    );
}
