
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { GoogleAdSense } from '@/components/GoogleAdSense';

export const metadata: Metadata = {
    title: 'Downloader - Free 4K Video & Audio Downloader',
    description: 'Download high-quality videos and audio from YouTube, Instagram, TikTok, Twitter and more found online. Free, fast, and unlimited downloads.',
    keywords: 'video downloader, youtube to mp3, instagram saver, tiktok downloader, 4k video download, free video chat',
    openGraph: {
        title: 'Downloader - Premium Video & Audio Downloader',
        description: 'Download high-quality videos and audio from YouTube, Instagram, TikTok, Twitter and more.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Downloader',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Downloader',
        description: 'Download high-quality videos and audio from YouTube, Instagram, TikTok, Twitter and more.',
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* REPLACE "ca-pub-0000000000000000" WITH YOUR REAL ADSENSE ID WHEN APPROVED */}
                <GoogleAdSense pId="ca-pub-4513515062698703" />
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
                    {children}
                </main>
            </body>
        </html>
    );
}


