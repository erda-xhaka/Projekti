const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getCoverUrl(cover?: string): string {
  if (!cover) return '/images/book-placeholder.jpg'; // fallback image për frontend

  if (cover.startsWith('http')) return cover; // absolute URL nga cloud, s3, etj.

  if (cover.startsWith('/')) return `${API_URL}${cover}`; // nëse fillon me /uploads/... ose /images/...

  // Nëse është vetëm emër skedari: provo në /uploads/ si default
  return `${API_URL}/uploads/${cover}`;
}
