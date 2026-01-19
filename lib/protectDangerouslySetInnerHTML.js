import DOMPurify from "isomorphic-dompurify";

export const sanitizeHtml = (html) => {
  if (!html) return "";
  return DOMPurify.sanitize(html);
};
