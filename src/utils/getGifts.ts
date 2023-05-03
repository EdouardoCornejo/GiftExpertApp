import { GiftsResponse } from "../types/giftTypes";

export const getGifts = async (categories:string) => {
  try {
    const API_KEY = "UKtQtBi4iu4HCp46SJawm0V1IxDqfCpC";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${categories}`;

    const response = await fetch(url);
    const { data } = await response.json();
    const gift = data.map((img: GiftsResponse) => ({
      id: img.id,
      title: img.title,
      url: img.images.downsized_medium.url,
    }));
        return gift
  } catch (error) {
    console.log("🚀 ~ file: getGifts.ts:17 ~ getGifts ~ error:", error)
  }
  };
