// Write sanitized text properly (rewrite special characters like < and >)
function decodeSanitized(str: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

export default decodeSanitized;
