const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads an image file to Cloudinary and returns the secure URL.
 * @param file - The image file to upload
 * @returns Promise resolving to the secure image URL
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Cloudinary configuration is missing. Please check your .env file.");
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        throw new Error("Invalid file type. Only image files are allowed.");
    }

    // Validate file size (Limit: 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        throw new Error("Image size is too large. Please upload an image under 5MB.");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary.");
        }

        const data = await response.json();

        // Always use secure_url so it loads correctly over HTTPS
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error; // Re-throw to handle it in the component (e.g., showing a toast error)
    }
};