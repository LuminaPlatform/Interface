export const fileLimitation = {
  lessThan10MB: (files: File[]) => {
    return files?.length !== 0
      ? files?.[0]?.size <= 3000000 || "Max 3MB"
      : true;
  },
  acceptedFormats: (files: File[]) => {
    return files?.length !== 0
      ? ["image/jpeg", "image/png", "image/gif"].includes(files?.[0]?.type) ||
          "Only PNG, JPEG e GIF"
      : true;
  }
};
