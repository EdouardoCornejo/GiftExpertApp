import { FC } from "react";
import "./styles.css";


interface GiftProps {
  id: string;
  url?: string;
  title: string;
}

export const Gift: FC<GiftProps> = ({id, url, title}) => {
  return (
    <div className="image-card" key={id}>
      <p className="title">{title}</p>
      <img className="image" src={url} alt="images" />
    </div>
  );
};