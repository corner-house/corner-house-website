import { PROPERTIES, SERVICES, ARTICLES } from '../src/constants';

const SITE_URL = 'https://cornerhouse.co.in';
const KEY = '843e23ec010cf01b84a9f1068c9df883';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

const urls: string[] = [
  `${SITE_URL}/`,
  ...PROPERTIES.map((p) => `${SITE_URL}/properties/${p.id}`),
  ...SERVICES.map((s) => `${SITE_URL}/services/${s.id}`),
  ...ARTICLES.map((a) => `${SITE_URL}/journal/${a.id}`),
];

async function ping() {
  // Skip on local/dev where the key file won't be reachable.
  if (process.env.INDEXNOW_SKIP === '1') {
    console.log('IndexNow: skipped (INDEXNOW_SKIP=1).');
    return;
  }

  const body = {
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    // 200/202 = accepted. 400 = malformed. 403 = key not found (file not yet deployed).
    console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs submitted)`);
  } catch (error) {
    console.warn('IndexNow ping failed:', error instanceof Error ? error.message : error);
  }
}

ping();
