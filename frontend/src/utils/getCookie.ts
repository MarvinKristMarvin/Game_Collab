// Utility function to get a cookie value by name (used for csrfToken)
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  // If the cookie is not found, return null
  if (parts.length < 2) {
    return null;
  }
  // Return the cookie value
  return parts.pop()?.split(";").shift() || null;
};

export default getCookie;
