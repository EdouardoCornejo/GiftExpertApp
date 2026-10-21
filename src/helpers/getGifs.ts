export interface Gif {
  id: string;
  title: string;
  url: string;
}

interface GiphyGif {
  id: string;
  title: string;
  images: {
    downsized_medium: { url: string };
  };
}

export const getGifs = async (category: string): Promise<Gif[]> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
    q: category,
    limit: "10",
  });

  const resp = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);
  if (!resp.ok) throw new Error(`GIPHY request failed: ${resp.status}`);

  const { data }: { data: GiphyGif[] } = await resp.json();

  return data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
};
