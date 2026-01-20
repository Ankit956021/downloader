import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';
import { instagramGetUrl } from 'instagram-url-direct';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        // 1. Check if it is YouTube
        if (ytdl.validateURL(url)) {
            try {
                const info = await ytdl.getInfo(url);
                const title = info.videoDetails.title;
                const thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
                const author = info.videoDetails.author.name;
                const seconds = parseInt(info.videoDetails.lengthSeconds);
                const duration = new Date(seconds * 1000).toISOString().substr(11, 8).replace(/^00:/, '');

                const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
                const audioFormatsRaw = ytdl.filterFormats(info.formats, 'audioonly');

                const videoFormats = formats.map(f => ({
                    quality: f.qualityLabel || 'Unknown',
                    size: f.contentLength ? `${(parseInt(f.contentLength) / 1024 / 1024).toFixed(1)} MB` : 'Stream',
                    url: `/api/download?url=${encodeURIComponent(url)}&quality=${f.itag || 'highest'}&type=video`
                })).slice(0, 4);

                const audioFormats = audioFormatsRaw.map(f => ({
                    quality: f.audioBitrate ? `MP3 ${f.audioBitrate}kbps` : 'Audio',
                    size: f.contentLength ? `${(parseInt(f.contentLength) / 1024 / 1024).toFixed(1)} MB` : 'Stream',
                    url: `/api/download?url=${encodeURIComponent(url)}&type=audio`
                })).slice(0, 2);

                return NextResponse.json({ title, thumbnail, author, duration, videoFormats, audioFormats });

            } catch (err: any) {
                console.error("YouTube Error fetching info:", err);
                console.error(err.stack);
                return NextResponse.json({
                    error: `Failed to fetch YouTube info: ${err.message}`,
                    details: err.toString()
                }, { status: 500 });
            }
        }

        // 2. Check for Instagram
        if (url.includes('instagram.com')) {
            try {
                const result = await instagramGetUrl(url);

                // result.url_list is string[]
                if (!result || !result.url_list || result.url_list.length === 0) {
                    throw new Error("No media found");
                }

                // Debug logging
                console.log("Insta Result:", JSON.stringify(result, null, 2));

                // Try to get thumbnail from media_details if available, else fallback
                let thumb = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png";
                if (result.media_details && result.media_details.length > 0 && result.media_details[0].thumbnail) {
                    thumb = result.media_details[0].thumbnail;
                }

                return NextResponse.json({
                    title: "Instagram Reel/Video", // result.post_info.caption could be used but might be long
                    thumbnail: thumb,
                    author: result.post_info?.owner_username || "Instagram User",
                    duration: "Unknown",
                    videoFormats: [
                        {
                            quality: "Highest",
                            size: "Video",
                            // Proxy the first URL
                            url: `/api/download?url=${encodeURIComponent(result.url_list[0])}&type=video`
                        }
                    ],
                    audioFormats: [
                        {
                            quality: "Audio (MP3)",
                            size: "Audio",
                            url: `/api/download?url=${encodeURIComponent(result.url_list[0])}&type=audio`
                        }
                    ]
                });

            } catch (err: any) {
                console.error("Instagram Error:", err);
                return NextResponse.json({ error: "Failed to fetch Instagram video. Account might be private." }, { status: 500 });
            }
        }

        // 3. Other platforms (TikTok Mock/Fallback)
        // Since we don't have a heavy scraper running, we will Mock this for the prototype
        // but validate the domain so it feels real.
        const domain = new URL(url).hostname;

        if (domain.includes('tiktok.com') || domain.includes('twitter.com') || domain.includes('x.com')) {
            // Return Mock Success for demonstration
            return NextResponse.json({
                title: `Video from ${domain}`,
                thumbnail: "https://via.placeholder.com/600x400?text=Preview+Unavailable", // More reliable placeholder
                author: "Social Media User",
                duration: "00:45",
                videoFormats: [
                    { quality: "HD 720p", size: "Unknown", url: "#" }
                ],
                audioFormats: []
            });
        }

        return NextResponse.json({ error: 'Unsupported URL' }, { status: 400 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
