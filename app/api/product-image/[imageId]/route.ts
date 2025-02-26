import { NextRequest, NextResponse } from "next/server";

// Define the headers for EFO API requests
const efoHeaders = {
  Authorization: `Basic ${process.env.EFO_AUTH_ENCODED!}`,
};

/**
 * API route to proxy product image requests
 * This allows us to include the authentication headers when fetching images
 * from the EFO API, which we can't do directly from the client
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  const { imageId } = params;

  if (!imageId) {
    return new NextResponse("Image ID is required", { status: 400 });
  }

  // Validate imageId format to prevent injection attacks
  if (!/^[a-zA-Z0-9_-]+$/.test(imageId)) {
    return new NextResponse("Invalid image ID format", { status: 400 });
  }

  try {
    // Construct the URL to the EFO thumbnail API
    const thumbnailUrl = `${process.env.NEXT_PUBLIC_EFO_BASE_URL}/${process.env.THUMBNAIL_ENDPOINT}?id=${imageId}`;

    // Fetch the image from the EFO API with authentication
    const response = await fetch(thumbnailUrl, {
      headers: efoHeaders,
      cache: "force-cache", // Use Next.js cache to avoid refetching the same image repeatedly
      next: { revalidate: 86400 }, // Revalidate cache every 24 hours
    });

    if (!response.ok) {
      // Log the error but don't expose detailed error messages to clients
      console.error(`Failed to fetch image ${imageId}: ${response.statusText}`);
      return new NextResponse("Failed to fetch image", {
        status: response.status,
      });
    }

    // Get the image data and content type
    const imageData = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with the appropriate content type
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        "X-Content-Type-Options": "nosniff", // Prevent MIME type sniffing
        "Content-Security-Policy": "default-src 'self'", // Basic CSP
      },
    });
  } catch (error) {
    console.error("Error fetching product image:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
