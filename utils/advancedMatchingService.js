// Lightweight compatibility helper blending birth chart, location, and engagement signals.

const SIGN_WEIGHT = 40;
const MOON_WEIGHT = 20;
const RISING_WEIGHT = 20;
const QUIZ_WEIGHT = 10;
const LOCATION_BONUS = 10;

const normalizeSign = (sign) => (sign || '').toLowerCase();

const signMatchScore = (a, b) => {
  if (!a || !b) return 0;
  if (normalizeSign(a) === normalizeSign(b)) return SIGN_WEIGHT;
  // Loose compatibility boost for shared element groups.
  const fire = ['aries', 'leo', 'sagittarius'];
  const earth = ['taurus', 'virgo', 'capricorn'];
  const air = ['gemini', 'libra', 'aquarius'];
  const water = ['cancer', 'scorpio', 'pisces'];
  const groups = [fire, earth, air, water];
  const sameElement = groups.some((g) => g.includes(normalizeSign(a)) && g.includes(normalizeSign(b)));
  return sameElement ? SIGN_WEIGHT * 0.6 : 0;
};

export const geoDistanceKm = (a, b) => {
  if (!a || !b || a.lat == null || b.lat == null) return null;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

export const computeMatchScore = (profile = {}, candidate = {}, quizBest = 0) => {
  let score = 0;
  score += signMatchScore(profile.sunSign || profile.sign, candidate.sign || candidate.sunSign);
  score += (normalizeSign(profile.moonSign) && normalizeSign(candidate.moonSign) && normalizeSign(profile.moonSign) === normalizeSign(candidate.moonSign))
    ? MOON_WEIGHT
    : 0;
  score += (normalizeSign(profile.risingSign) && normalizeSign(candidate.risingSign) && normalizeSign(profile.risingSign) === normalizeSign(candidate.risingSign))
    ? RISING_WEIGHT
    : 0;
  score += Math.min(quizBest, 10); // small boost from quiz engagement

  const distance = geoDistanceKm(profile.locationCoords, candidate.locationCoords);
  if (distance != null && distance <= 50) {
    score += LOCATION_BONUS;
  }

  // Blend with existing compatibility if present
  const baseCompat = candidate.compatibility || 0;
  const blended = Math.min(100, Math.round((score + baseCompat) / 2));
  return { score: blended, distanceKm: distance };
};
