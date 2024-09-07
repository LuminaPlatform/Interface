export const textTruncator = (text: string) => {
  const startText = text.substring(0, 4);
  const endText = text.substring(text.length - 4);

  if (text.length > 8) {
    return `${startText}...${endText}`;
  }
  return text;
};

export const getCookie = (cookie: string, name: string): string =>
  cookie
    ?.split(";")
    .find((row) => row.trim().startsWith(name))
    ?.split("=")[1]
    .trim();

export const getBrowserCookie = (name: string): string => {
  if (typeof document === "undefined" || !document.cookie) return undefined;
  return getCookie(document.cookie, name);
};

export const generateImageSrc = (id: string | number) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_FILE_URL
      : process.env.NEXT_PUBLIC_DEV_BASE_FILE_URL;
  return `${baseUrl}/${id}`;
};
