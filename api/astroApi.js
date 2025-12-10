// api/astroApi.js
export const fetchCompatibilityMessage = async (signName) => {
  // Attempt to fetch a live quote as a pseudo "cosmic insight", fall back to a mocked response.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('https://dummyjson.com/quotes/random', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return {
      sign: signName,
      message: data.quote,
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      sign: signName,
      message: `Stars whisper: ${signName} thrives with empathy and honest communication today.`,
    };
  }
};
