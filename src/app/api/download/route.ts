import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const videoUrl = searchParams.get('url');
        const quality = searchParams.get('quality'); // e.g., '18' (360p), '137' (1080p), 'highest', 'lowest', or 'audioonly' 
        const isAudio = searchParams.get('type') === 'audio';

        if (!videoUrl) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        if (ytdl.validateURL(videoUrl)) {
            // YouTube Logic
            // Set headers for download
            const headers = new Headers();
            headers.set('Content-Disposition', `attachment; filename="download.${isAudio ? 'mp3' : 'mp4'}"`);
            headers.set('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4');

            // Create stream
            const formatOptions = isAudio ? { quality: 'highestaudio' } : { quality: quality || 'highest' };

            // We need to use Node.js streams, but Next.js App Router uses Web Streams. 
            // ytdl returns a Node stream. We can iterate it.
            const stream = ytdl(videoUrl, formatOptions);

            // @ts-ignore - ReadableStream from node is compatible enough for this iterator approach or we use a wrapper
            const iterator = stream[Symbol.asyncIterator]();

            const readable = new ReadableStream({
                async pull(controller) {
                    const { value, done } = await iterator.next();
                    if (done) controller.close();
                    else controller.enqueue(value);
                }
            });
            return new NextResponse(readable, { headers });

        } else {
            // Generic / Instagram Logic (Direct URL)
            // Just proxy the content
            const response = await fetch(videoUrl);

            if (!response.ok || !response.body) {
                return NextResponse.json({ error: 'Failed to fetch external resource' }, { status: 502 });
            }

            const headers = new Headers(response.headers);
            const ext = isAudio ? 'mp3' : 'mp4';
            const mime = isAudio ? 'audio/mpeg' : (headers.get('Content-Type') || 'video/mp4');

            headers.set('Content-Disposition', `attachment; filename="download.${ext}"`);
            headers.set('Content-Type', mime);

            // @ts-ignore
            return new NextResponse(response.body, { headers });
        }

    } catch (error) {
        console.error('Download Error:', error);
        return NextResponse.json({ error: 'Download Failed' }, { status: 500 });
    }
}
