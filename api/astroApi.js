// api/astroApi.js
export const fetchCompatibilityMessage = async (signName) => {
  // TODO: Replace with a real API endpoint or mocked backend.
  // Example:
  // const res = await fetch(`https://example.com/compatibility?sign=${signName}`);
  // return res.json();
  return {
    sign: signName,
    message: `This is a placeholder compatibility message for ${signName}.`,
  };
};
