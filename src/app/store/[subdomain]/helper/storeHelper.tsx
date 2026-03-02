const Backend_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getStoreOwnerId(storeSubDomain: string): Promise<string> {
  try {
    const response = await fetch(
      `${Backend_URL}/store-owners/storeData/${storeSubDomain}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.storeOwnerId;
  } catch (error) {
    console.error('Error fetching store owner ID:', error);
    throw error;
  }
}