import createDOMPurify from "dompurify";

export const sanitizeHtml = (dirty) => {
  // Jika berjalan di Sisi Server
  if (typeof window === "undefined") {
    const { JSDOM } = require("jsdom");
    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"], // Izinkan iframe untuk video YouTube/Maps
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  }

  // Jika berjalan di Sisi Client
  return createDOMPurify.sanitize(dirty, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
};
