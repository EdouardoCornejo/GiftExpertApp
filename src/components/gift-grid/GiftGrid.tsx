import { FC } from "react";
import { useFetchGifts } from "../../hooks/useFetchGifts";
import { GiftsResponse } from "../../types/giftTypes";
import { Gift } from "./";

interface GiftGridProps {
  categories: string;
}

export const GiftGrid: FC<GiftGridProps> = ({ categories }) => {
  const { giftsValue, isLoading } = useFetchGifts(categories);

  return (
    <>
      {isLoading ? <h2>Cargando....</h2> : <h3>{categories}</h3>}
      <div className="image-grid">
        {giftsValue?.map((gift: GiftsResponse) => (
          <Gift key={gift.id} id={gift.id} url={gift.url} title={gift.title} />
        ))}
      </div>
    </>
  );
};
