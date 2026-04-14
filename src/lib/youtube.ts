const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchByQuery(query: string, maxResults = 12): Promise<any[]> {
  if (!YOUTUBE_API_KEY) return [];

  const searchRes = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&relevanceLanguage=hi&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const searchData = await searchRes.json();
  if (!searchData.items?.length) return [];

  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
  const detailsRes = await fetch(
    `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const detailsData = await detailsRes.json();

  return detailsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description.slice(0, 200),
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || '',
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    duration: parseDuration(item.contentDetails.duration),
    viewCount: formatViews(item.statistics?.viewCount || '0'),
  }));
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, h, m, s] = match;
  return h ? `${h}:${(m || '0').padStart(2, '0')}:${(s || '0').padStart(2, '0')}`
           : `${m || '0'}:${(s || '0').padStart(2, '0')}`;
}

function formatViews(count: string): string {
  const n = parseInt(count);
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr views`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} L views`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
