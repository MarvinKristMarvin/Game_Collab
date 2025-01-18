// Utility function to get a cookie value by name (used for csrfToken)
const getCookie = (name: string): string | null => {
  // Add this debug code to check the exact cookie string
  console.log("Full cookie string:", document.cookie);
  console.log(
    "Request cookies:",
    document.cookie.split(";").map((c) => c.trim())
  );
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
