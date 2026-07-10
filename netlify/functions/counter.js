import { getStore } from '@netlify/blobs';

export default async () => {
  const store = getStore('site-stats');
  const current = parseInt((await store.get('visits')) || '0', 10);
  const next = current + 1;
  await store.set('visits', String(next));

  return new Response(JSON.stringify({ visits: next }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
