import DOMPurify from "isomorphic-dompurify";

export const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html);
};
