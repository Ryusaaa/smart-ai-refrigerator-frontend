// client/src/utils/iconApi.js
// On-demand Iconify API fetcher with memory + localStorage caching (per update_v3.md Section 2.1)

const ICON_CACHE = new Map();

export async function fetchIcon(iconSet, iconName) {
  const key = `${iconSet}:${iconName}`;
  if (ICON_CACHE.has(key)) return ICON_CACHE.get(key);

  try {
    const localSaved = localStorage.getItem(`icon:${key}`);
    if (localSaved) {
      ICON_CACHE.set(key, localSaved);
      return localSaved;
    }
  } catch (e) {
    // localStorage might fail in private browsing mode
  }

  const url = `https://api.iconify.design/${iconSet}/${iconName}.svg`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const svgText = await response.text();
    ICON_CACHE.set(key, svgText);
    try {
      localStorage.setItem(`icon:${key}`, svgText);
    } catch (e) {
      // quota or access limit, ignore
    }
    return svgText;
  } catch (err) {
    console.warn(`Failed to fetch icon: ${key}`, err);
    return null;
  }
}
