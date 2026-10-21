import { FC, useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";

interface GiftExpertAppProps {}

export const GiftExpertApp: FC<GiftExpertAppProps> = () => {
  const [categories, setCategories] = useState<string[]>(["One Punch"]);

  const onAddCategory = (newCategory: string) => {
    const exists = categories.some(
      (c) => c.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) return;

    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      {/* Title */}
      <h1>GiftExpertApp</h1>

      {/* Input */}
      <AddCategory onNewCategory={onAddCategory} />

      {/* Item List */}
      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  );
};
