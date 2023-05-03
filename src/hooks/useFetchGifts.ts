import { useEffect, useState } from "react";
import { getGifts } from "../utils/getGifts";

export const useFetchGifts = (categories:string) => {
  const [giftsValue, setGiftsValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getData = async () => {
    try {
      const gift = await getGifts(categories);
      setGiftsValue(gift);
      setIsLoading(false)
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(true)
    }
  };

  useEffect(() => {

    getData();
  }, [categories]);


    return {
        giftsValue,
        isLoading
    }
}

