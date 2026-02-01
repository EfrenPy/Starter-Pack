export async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return '';
  }
}
