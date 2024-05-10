export const fileLimitation = {
  lessThan10MB: (files) => files[0]?.size <= 3000000 || "Max 3MB",
  acceptedFormats: (files) =>
    ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type) ||
    "Only PNG, JPEG e GIF",
};
