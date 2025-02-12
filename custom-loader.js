export default function cloudfrontLoader({ src, width, quality }) {
  if (src.includes('/_next/static')) {
    return src;
  }
  const url = new URL(`${src}`);
  url.searchParams.set('format', 'auto');
  url.searchParams.set('width', width.toString());
  url.searchParams.set('quality', (quality || 75).toString());
  return `/api/proxy-img?url=${encodeURIComponent(url.href)}`;
}
