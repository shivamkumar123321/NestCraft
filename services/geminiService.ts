import { GoogleGenAI } from "@google/genai";
import type { HomeSpecifications } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface GenerateLayoutParams {
  vision: string;
  specifications: HomeSpecifications;
  otherFeatures: string;
}

export const generateLayout = async ({ vision, specifications, otherFeatures }: GenerateLayoutParams): Promise<string> => {
  if (!process.env.API_KEY) {
    console.log("Using mock response as API_KEY is not set.");
    return mockLayoutResponse;
  }

  const features = [];
  if (specifications.kitchen === 'Yes') features.push('kitchen');
  if (specifications.livingRoom === 'Yes') features.push('living room');
  if (specifications.studyRoom === 'Yes') features.push('study room');
  if (parseInt(specifications.balconies) > 0) features.push(`${specifications.balconies} balcony/balconies`);
  if (specifications.garden === 'Yes') features.push('garden');
  if (otherFeatures) features.push(otherFeatures);

  const prompt = `Generate a high-contrast, minimalistic black and white 2D architectural floor plan. The style must be a professional architectural drawing with clean lines and clear labels, on a plain white background.
Strictly follow these user-provided specifications and do not add any extra elements:
- Total Area: ${specifications.totalArea} sq ft.
- Bedrooms: ${specifications.bedrooms}.
- Bathrooms: ${specifications.bathrooms}.
- Floors: ${specifications.floors}.
- Ceiling Height: ${specifications.ceilingHeight} ft.
- Other required features: ${features.join(', ') || 'None'}.
- General architectural style/vision: "${vision}".

The final layout must be clean and properly labeled with room names (e.g., "BEDROOM", "LIVING ROOM", "BATH") and their corresponding dimensions (e.g., "Living Room: 15'x20'", "Bedroom: 12'x12'"). Clearly mark all walls, doors, and windows. Include overall measurements and individual room dimensions directly on the plan.
The entire image output must be just the black and white floor plan on a plain white background. Do not include any colors, shadows, 3D elements, or watermarks.`;

  try {
      const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
          },
      });
      
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;

  } catch (error) {
      console.error("Error generating layout with Gemini:", error); // For developer debugging
      if (error instanceof Error) {
          // Check for the specific rate limit error status
          if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('"code":429')) {
              throw new Error("API Rate Limit Exceeded. Please wait a moment and try again, or check your Google AI Studio plan and billing details.");
          }
          // Provide a generic but cleaner error for other API issues
          throw new Error("The AI model failed to generate a layout. This can happen due to high demand or complex requests. Please try again.");
      }
      // Fallback for non-Error objects
      throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};

const mockLayoutResponse = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmQAAAAAAAAAAAAAAAACAEkDAAASCQAAASwAAAAOAAAFqgAAAPgAAA5wY3VydgAAAAAAAAABAc0AAHVkY3J0AAAAHAwAAHhiVFhDAAAAWAAAABJYWVogAAAAAAAAAAAAYgAAAIRbWFlaIAAAAAAAAAAAAABiIAAQCFthZWogAAAAAAAAAAAAYgAAAf53dHB0AAAAHAAAABRjcHJ0AAABXAAAADZjaGFkAAAAZAAAACxkZXNjAAAAAAAAAQwAAAA0bWx1YwAAAAAAAAABAAAADGVuVVMAAAAUAAAAHABpAEsATwBOAFcAZQBiAFAAYgBvAG4AZABz/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCgICAgkKCgoKCgYDAwMDAwMDAwMD/2wBDAQECAwMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/wAARCALgAugDAREAAhEBAxEB/8QAGwABAQADAQEBAAAAAAAAAAAAAAECBQYDBAf/xABDEAABAwIDBQUGBQEIAgICAwEAAQIDBBEFEiEGMUFRYXETIoGRoQcyscHwI0JS0RQVIyUzYnKS4VOC8SVDRYOjssLi/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EAC0RAQEAAgEDAwMEAgEFAAAAAAABAhEDEiExBBNBURQicYEFMkKRI1JisfBC/9oADAMBAAIRAxEAPwD5p0tUuI6E6V7/AIt4X9f5I1nEw2X8lJm57p1m4+64e29Mv6/yRa1iYbD9V8y9l6Zf1/ki1rGwwX8k1m4+6dZuPup2Xp1/X+SNaxMdh+qdm5/l/NGs3H3TrcfdSNl6f1/ki2sTHYfojWbj7p1m4+6lbL0/r/ACRraxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f5I1rGwwX8kazuPukzuPuns2Xp/X+SNaxMdh+iNZuPunzL2Xpl/X+SNaxMdh+idy4+6dZuPunZejX9f---`;