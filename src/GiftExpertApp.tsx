import { FC, useState } from "react";
import { AddCategory, GiftGrid } from "./components";

interface GiftExpertAppProps {}

export const GiftExpertApp: FC<GiftExpertAppProps> = () => {
  const [categories, setCategories] = useState(["One Punch", "DragonBall"]);

  const onAddCategory = (onNewCategory: string) => {
    if (categories.includes(onNewCategory)) return;

    //categories.push(newCategory)
    setCategories([onNewCategory, ...categories]);
    // setCategories(cat =>[...cat, "Valorant"])
  };

  return (
    <>
      {/* Title */}
      <h1>GiftExpertApp</h1>

      {/* Input */}
      <AddCategory onNewCategory={onAddCategory} />

      {/* Categori list */}
        {categories.map((category) => (
          <GiftGrid key={category} categories={category} />
        ))}
    </>
  );
};
