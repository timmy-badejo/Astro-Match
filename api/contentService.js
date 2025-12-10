import { weeklyHoroscopes, monthlyHoroscopes, zodiacArticles, relationshipAdvice } from '../data/content';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const toKey = (...parts) => parts.filter(Boolean).join(':').toLowerCase();

const fetchJson = async (url, apiKey) => {
  const res = await fetch(url, {
    headers: apiKey
      ? {
          'X-Api-Key': apiKey,
        }
      : {},
  });
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
};

export class HoroscopeAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.api-ninjas.com/v1';
  }

  async getDailyHoroscope(sign) {
    const data = await fetchJson(`${this.baseUrl}/horoscope?zodiac=${sign.toLowerCase()}`, this.apiKey);
    return {
      sign: data.zodiac,
      date: data.date,
      horoscope: data.horoscope,
      mood: data.mood || 'optimistic',
      luckyColor: data.lucky_color || this.getLuckyColor(sign),
      luckyNumber: data.lucky_number || Math.floor(Math.random() * 99) + 1,
    };
  }

  async getWeeklyHoroscope(sign) {
    // API Ninjas does not expose weekly; derive from daily with a simple wrapper
    const daily = await this.getDailyHoroscope(sign);
    return {
      ...daily,
      week: this.getCurrentWeek(),
      focus: this.getWeeklyFocus(),
      overview: `This week: ${daily.horoscope}`,
    };
  }

  async getMonthlyHoroscope(sign) {
    // API Ninjas does not expose monthly; derive from daily with a simple wrapper
    const daily = await this.getDailyHoroscope(sign);
    return {
      ...daily,
      month: new Date().toLocaleString('default', { month: 'long' }),
      overview: `Monthly outlook: ${daily.horoscope}`,
    };
  }

  getLuckyColor(sign) {
    const colors = {
      aries: 'Red',
      taurus: 'Green',
      gemini: 'Yellow',
      cancer: 'Silver',
      leo: 'Gold',
      virgo: 'Navy',
      libra: 'Pink',
      scorpio: 'Maroon',
      sagittarius: 'Purple',
      capricorn: 'Brown',
      aquarius: 'Blue',
      pisces: 'Sea Green',
    };
    return colors[sign.toLowerCase()] || 'White';
  }

  getWeeklyFocus() {
    const focuses = ['Career Growth', 'Relationships', 'Self-Care', 'Finances', 'Creativity', 'Health'];
    return focuses[Math.floor(Math.random() * focuses.length)];
  }

  getCurrentWeek() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }

  getFallbackHoroscope(sign) {
    return {
      sign,
      date: new Date().toISOString().slice(0, 10),
      horoscope: `Today brings new opportunities for ${sign}. Trust your instincts and embrace change.`,
      mood: 'optimistic',
      luckyColor: this.getLuckyColor(sign),
      luckyNumber: Math.floor(Math.random() * 100) + 1,
    };
  }
}

export class ContentService {
  constructor(apiKey = null) {
    this.api = apiKey ? new HoroscopeAPIService(apiKey) : null;
    this.cache = new Map();
  }

  async getCached(key, fetcher) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return cached.data;
    }
    const data = await fetcher();
    this.cache.set(key, { data, ts: Date.now() });
    return data;
  }

  async getDailyHoroscope(sign) {
    const key = toKey('daily', sign, new Date().toDateString());
    return this.getCached(key, async () => {
      if (this.api) {
        try {
          return await this.api.getDailyHoroscope(sign);
        } catch (e) {
          return this.api.getFallbackHoroscope(sign);
        }
      }
      return new HoroscopeAPIService().getFallbackHoroscope(sign);
    });
  }

  async getWeeklyHoroscope(sign) {
    const key = toKey('weekly', sign);
    return this.getCached(key, async () => {
      if (this.api) {
        try {
          return await this.api.getWeeklyHoroscope(sign);
        } catch (e) {
          /* fall back to mock below */
        }
      }
      return weeklyHoroscopes[sign] || weeklyHoroscopes[sign?.toLowerCase()] || null;
    });
  }

  async getMonthlyHoroscope(sign) {
    const key = toKey('monthly', sign);
    return this.getCached(key, async () => {
      if (this.api) {
        try {
          return await this.api.getMonthlyHoroscope(sign);
        } catch (e) {
          /* fall back to mock below */
        }
      }
      return monthlyHoroscopes[sign] || monthlyHoroscopes[sign?.toLowerCase()] || null;
    });
  }

  async getArticles(limit = 5) {
    return zodiacArticles.slice(0, limit);
  }

  async getRelationshipAdvice(limit = 4) {
    return relationshipAdvice.slice(0, limit);
  }

  searchArticles(query) {
    const q = query.toLowerCase();
    return zodiacArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.snippet.toLowerCase().includes(q) ||
        (a.tags || []).some((t) => t.toLowerCase().includes(q)),
    );
  }
}
