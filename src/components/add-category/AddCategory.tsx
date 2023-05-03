import { ChangeEvent, FC, useState } from "react";

interface AddCategoryProps {
  onNewCategory: (value: string) => void;
}

export const AddCategory: FC<AddCategoryProps> = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitEvent = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length < 1) return;
    onNewCategory(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={submitEvent}>
      <input
        type="text"
        placeholder="Search Gifts"
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};
