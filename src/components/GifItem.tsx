import { FC } from "react";
import { Gif } from "../helpers/getGifs";

export const GifItem: FC<Gif> = ({ title, url }) => {
  return (
    <div className="card">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
};
