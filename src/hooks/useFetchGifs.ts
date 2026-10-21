import { useEffect, useState } from "react";
import { Gif, getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category: string) => {
  const [images, setImages] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getGifs(category)
      .then((gifs) => {
        if (!ignore) setImages(gifs);
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category]);

  return { images, isLoading, error };
};
