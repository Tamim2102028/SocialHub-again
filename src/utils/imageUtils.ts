/**
 * Image optimization utilities for file uploads
 */

export interface ImageValidationOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
}

export const defaultImageOptions: ImageValidationOptions = {
  maxSizeMB: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  maxWidth: 1920,
  maxHeight: 1920,
};

/**
 * Validate image file
 */
export const validateImage = (
  file: File,
  options: ImageValidationOptions = defaultImageOptions
): { valid: boolean; error?: string } => {
  const { maxSizeMB = 5, allowedTypes } = options;

  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
};

/**
 * Compress and resize image
 */
export const compressImage = (
  file: File,
  options: ImageValidationOptions = defaultImageOptions
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const { maxWidth = 1920, maxHeight = 1920 } = options;
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          file.type,
          0.9
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Convert File/Blob to base64 string
 */
export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to convert file to base64"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Complete image processing pipeline
 */
export const processImage = async (
  file: File,
  options: ImageValidationOptions = defaultImageOptions
): Promise<{ valid: boolean; data?: string; error?: string }> => {
  // Validate
  const validation = validateImage(file, options);
  if (!validation.valid) {
    return { valid: false, error: validation.error };
  }

  try {
    // Compress
    const compressed = await compressImage(file, options);

    // Convert to base64
    const base64 = await fileToBase64(compressed);

    return { valid: true, data: base64 };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Failed to process image",
    };
  }
};
