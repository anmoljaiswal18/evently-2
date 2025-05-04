// uploadEvent.ts

export async function uploadEvent(eventData: any) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/event-upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to upload event");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error uploading event:", error);
    throw error;
  }
}
